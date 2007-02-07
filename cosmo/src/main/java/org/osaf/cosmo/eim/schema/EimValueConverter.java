/*
 * Copyright 2006 Open Source Applications Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.osaf.cosmo.eim.schema;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.DateList;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.Dur;
import net.fortuna.ical4j.model.Parameter;
import net.fortuna.ical4j.model.Recur;
import net.fortuna.ical4j.model.parameter.Related;
import net.fortuna.ical4j.model.parameter.Value;
import net.fortuna.ical4j.model.property.Trigger;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Converts between EIM field values and model values (mainly
 * iCalendar values used for events and tasks).
 */
public class EimValueConverter implements EimSchemaConstants {
    private static final Log log =
        LogFactory.getLog(EimValueConverter.class);

    private EimValueConverter() {}

    private static final Pattern DURATION_PATTERN = Pattern
            .compile("[+-]?P((\\d+W)|((\\d+D)?(T(\\d+H)?(\\d+M)?(\\d+S)?)?))");

    /**
     * Parses a serialized text value and returns the contained
     * recurrence rules.
     * <p>
     * Recurrence rules in the text value must be colon-separated.
     *
     * @return <code>List<Recur></code>
     * @throws EimConversionException
     */
    public static List<Recur> toICalRecurs(String text)
        throws EimConversionException {
        ArrayList<Recur> recurs = new ArrayList<Recur>();
        for (String s : text.split(":")) {
            try {
                recurs.add(new Recur(s));
            } catch (ParseException e) {
                throw new EimConversionException("Invalid iCalendar recurrence rule " + s);
            }
        }
        return recurs;
    }

    /**
     * Serializes a list of recurrence rules.
     * <p>
     * Recurrence rules in the returned value are colon-separated.
     *
     * @return <code>String</code>
     * @throws EimConversionException
     */
    public static String fromICalRecurs(List<Recur> recurs) {
        if (! recurs.iterator().hasNext())
            return null;
        return StringUtils.join(recurs.iterator(), ":");
    }

    /**
     * Parses a serialized text value and returns the contained
     * date or date-time.
     *
     * @return <code>ICalDate</code>
     * @throws EimConversionException
     */
    public static ICalDate toICalDate(String text)
        throws EimConversionException {
        return new ICalDate(text);
    }

    /**
     * Returns the text representation of an iCalendar date or
     * date-time.
     *
     * @return <code>String</code>
     * @throws EimConversionException
     */
    public static String fromICalDate(Date date) {
        return fromICalDate(date, false);
    }

    /**
     * Returns the text representation of an iCalendar date or
     * date-time.
     *
     * @param anytime a flag determining whether or not this
     * represents an anytime date
     * @return <code>String</code>
     * @throws EimConversionException
     */
    public static String fromICalDate(Date date,
                                      boolean anytime) {
        if (date == null)
            return null;
        return new ICalDate(date, anytime).toString();
    }

    /**
     * Serializes a list of iCalendar dates or date-times.
     * <p>
     * Dates or date-times in the returned value are separated with
     * commas.
     *
     * @return <code>String</code>
     * @throws EimConversionException
     */
    public static String fromICalDates(DateList dates) {
        if (dates == null || dates.isEmpty())
            return null;
        return new ICalDate(dates).toString();
    }

    public static String fromIcalTrigger(Trigger trigger) {
        
        if(trigger.getDateTime()!=null)
            return ";VALUE=DATE-TIME:" + trigger.getDateTime().toString();
        
        Related related = (Related) trigger.getParameters().getParameter(Parameter.RELATED);
        if(related != null)
            return ";" + related.toString() + ":" + trigger.getDuration().toString();
        else
            return trigger.getDuration().toString();
    }

    /**
     * Parses a serialized text value and returns a trigger object.
     * <p>
     * The text value must be in the format:
     * <ul>
     * <li><code>-PT15M</code> trigger will execute 15 minutes
     * before the start date </li>
     * <li><code>PT15M</code> trigger will execute 15 minutes
     * after the start date </li>
     * <li><code>RELATIVE=END;-PT15M</code> trigger will execute
     * 15 minutes before the end date</li>
     * <li><code>RELATIVE=END;PT15M</code> trigger will execute
     * 15 minutes after the end date</li>
     * <li><code>VALUE=DATE-TIME;20070101100000Z</code> represents
     * an a trigger that will execute at an absolute time</li>
     * </ul>
     *
     * @return <code>DateList</code>
     * @throws EimConversionException
     */
    public static Trigger toIcalTrigger(String text)
            throws EimConversionException {
        Value value = null;
        Related related = null;
        String propVal = null;

        if (text.startsWith(";VALUE=DATE-TIME:")) {
            value = Value.DATE_TIME;
            propVal = text.substring(17);
        } else if (text.startsWith(";RELATED=END:")){
           related = Related.END;
           propVal = text.substring(13);
        } else {
            propVal = text;
        }
        
        Trigger trigger;
        try {
            trigger = new Trigger();
            if(Related.END.equals(related)) {
                trigger.getParameters().add(Related.END);
                if(validateDuration(propVal)==false)
                    throw new EimConversionException("invalid trigger: " + text);
                trigger.setDuration(new Dur(propVal));
            } else if(Value.DATE_TIME.equals(value)) {
                trigger.getParameters().add(Value.DATE_TIME);
                trigger.setDateTime(new DateTime(propVal));
            } else {
                if(validateDuration(propVal)==false)
                    throw new EimConversionException("invalid trigger: " + text);
                trigger.setDuration(new Dur(propVal));
            }
            trigger.validate();
            return trigger;
        } catch (Exception e) {
            throw new EimConversionException("invalid trigger: " + text);
        }
        
    }
    
    /**
     * Parse duration text.
     * @param value string representation of duration
     * @return ical4j Dur object
     * @throws EimConversionException
     */
    public static Dur toICalDur(String value) throws EimConversionException {
        if(validateDuration(value)==false)
            throw new EimConversionException("invalid duration " + value);
        
        return new Dur(value);
    }
    
    private static boolean validateDuration(String text) {
        return DURATION_PATTERN.matcher(text).matches();
    }
}