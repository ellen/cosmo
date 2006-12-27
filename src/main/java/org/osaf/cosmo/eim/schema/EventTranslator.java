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

import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.osaf.cosmo.eim.ClobField;
import org.osaf.cosmo.eim.TextField;
import org.osaf.cosmo.eim.EimRecord;
import org.osaf.cosmo.eim.EimRecordField;
import org.osaf.cosmo.model.EventStamp;
import org.osaf.cosmo.model.Item;
import org.osaf.cosmo.model.Stamp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Translates item records to <code>EventStamp</code>s.
 * <p>
 * Implements the following schema:
 * <p>
 * TBD
 */
public class EventTranslator extends BaseStampTranslator {
    private static final Log log = LogFactory.getLog(EventTranslator.class);

    /** */
    public static final String FIELD_DTSTART = "dtstart";
    /** */
    public static final int MAXLEN_DTSTART = 20;
    /** */
    public static final String FIELD_DTEND = "dtend";
    /** */
    public static final int MAXLEN_DTEND = 20;
    /** */
    public static final String FIELD_LOCATION = "location";
    /** */
    public static final int MAXLEN_LOCATION = 256;
    /** */
    public static final String FIELD_RRULE = "rrule";
    /** */
    public static final int MAXLEN_RRULE = 1024;
    /** */
    public static final String FIELD_EXRULE = "exrule";
    /** */
    public static final int MAXLEN_EXRULE = 1024;
    /** */
    public static final String FIELD_RDATE = "rdate";
    /** */
    public static final int MAXLEN_RDATE = 1024;
    /** */
    public static final String FIELD_EXDATE = "exdate";
    /** */
    public static final int MAXLEN_EXDATE = 1024;
    /** */
    public static final String FIELD_RECURRENCE_ID = "recurrenceId";
    /** */
    public static final int MAXLEN_RECURRENCE_ID = 20;
    /** */
    public static final String FIELD_STATUS = "status";
    /** */
    public static final int MAXLEN_STATUS = 256;
    /** */
    public static final String FIELD_TRIGGER = "trigger";

    /** */
    public EventTranslator() {
        super(PREFIX_EVENT, NS_EVENT);
    }

    /**
     * Removes the event stamp.
     */
    protected void applyDeletion(EimRecord record,
                                 Item item)
        throws EimSchemaException {
        EventStamp stamp = EventStamp.getStamp(item);
        if (stamp == null)
            throw new IllegalArgumentException("Item does not have an event stamp");

        item.removeStamp(stamp);
    }

    /**
     * Copies the data from the given record field into the event
     * stamp.
     *
     * @throws IllegalArgumentException if the item does not have an
     * event stamp
     * @throws EimSchemaException if the field is improperly
     * constructed or cannot otherwise be applied to the item 
     */
    protected void applyField(EimRecordField field,
                              Item item)
        throws EimSchemaException {
        EventStamp stamp = EventStamp.getStamp(item);
        if (stamp == null)
            throw new IllegalArgumentException("Item does not have an event stamp");

        if (field.getName().equals(FIELD_DTSTART)) {
            String value = validateText(field, MAXLEN_DTSTART);
            stamp.setStartDate(EimValueConverter.toICalDate(value));
        } else if (field.getName().equals(FIELD_DTEND)) {
            String value = validateText(field, MAXLEN_DTEND);
            stamp.setEndDate(EimValueConverter.toICalDate(value));
        } else if (field.getName().equals(FIELD_LOCATION)) {
            String value = validateText(field, MAXLEN_LOCATION);
            stamp.setLocation(value);
        } else if (field.getName().equals(FIELD_RRULE)) {
            String value = validateText(field, MAXLEN_RRULE);
            stamp.setRecurrenceRules(EimValueConverter.toICalRecurs(value));
        } else if (field.getName().equals(FIELD_EXRULE)) {
            String value = validateText(field, MAXLEN_EXRULE);
            stamp.setExceptionRules(EimValueConverter.toICalRecurs(value));
        } else if (field.getName().equals(FIELD_RDATE)) {
            String value = validateText(field, MAXLEN_RDATE);
            stamp.setRecurrenceDates(EimValueConverter.toICalDates(value));
        } else if (field.getName().equals(FIELD_EXDATE)) {
            String value = validateText(field, MAXLEN_EXDATE);
            stamp.setExceptionDates(EimValueConverter.toICalDates(value));
        } else if (field.getName().equals(FIELD_RECURRENCE_ID)) {
            String value = validateText(field, MAXLEN_RECURRENCE_ID);
            stamp.setRecurrenceId(EimValueConverter.toICalDate(value));
        } else if (field.getName().equals(FIELD_STATUS)) {
            String value = validateText(field, MAXLEN_STATUS);
            stamp.setStatus(value);
        } else if (field.getName().equals(FIELD_TRIGGER)) {
            Integer value = validateInteger(field);
            // XXX convert to alarm
        } else {
            applyUnknownField(field, stamp.getItem());
        }
    }

    /**
     * Copies event properties into event records, one for the master
     * instance and one for each exception instance.
     * <p>
     * All unknown fields in the event namespace are copied into the
     * master record.
     *
     * @throws IllegalArgumentException if the stamp is not an event
     * stamp
     */
    public List<EimRecord> toRecords(Stamp stamp) {
        if (! (stamp instanceof EventStamp))
            throw new IllegalArgumentException("Stamp is not an event stamp");
        EventStamp es = (EventStamp) stamp;
        String value = null;

        ArrayList<EimRecord> records = new ArrayList<EimRecord>();

        // master event record

        EimRecord master = createRecord(stamp);

        master.addKeyField(new TextField(FIELD_UUID,
                                         stamp.getItem().getUid()));

        value = EimValueConverter.fromICalDate(es.getStartDate());
        master.addField(new TextField(FIELD_DTSTART, value));
                                      
        value = EimValueConverter.fromICalDate(es.getEndDate());
        master.addField(new TextField(FIELD_DTEND, value));

        master.addField(new TextField(FIELD_LOCATION, es.getLocation()));

        value = EimValueConverter.fromICalRecurs(es.getRecurrenceRules());
        master.addField(new TextField(FIELD_RRULE, value));

        value = EimValueConverter.fromICalRecurs(es.getExceptionRules());
        master.addField(new TextField(FIELD_EXRULE, value));

        value = EimValueConverter.fromICalDates(es.getRecurrenceDates());
        master.addField(new TextField(FIELD_RDATE, value));

        value = EimValueConverter.fromICalDates(es.getExceptionDates());
        master.addField(new TextField(FIELD_EXDATE, value));

        value = EimValueConverter.fromICalDate(es.getRecurrenceId());
        master.addField(new TextField(FIELD_RECURRENCE_ID, value));

        master.addField(new TextField(FIELD_STATUS, es.getStatus()));

        // XXX: convert alarm to trigger
        // master.addField(new IntegerField(FIELD_TRIGGER, es.getTrigger()));

        addUnknownFields(master, stamp.getItem());

        records.add(master);

        // XXX: exception instance records

        return records;
    }
}
