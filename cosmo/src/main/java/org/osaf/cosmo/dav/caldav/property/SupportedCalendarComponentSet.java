/*
 * Copyright 2005-2007 Open Source Applications Foundation
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
package org.osaf.cosmo.dav.caldav.property;

import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;

import org.apache.jackrabbit.webdav.property.AbstractDavProperty;
import org.apache.jackrabbit.webdav.xml.DomUtil;
import org.apache.jackrabbit.webdav.xml.XmlSerializable;

import org.osaf.cosmo.calendar.util.CalendarUtils;
import org.osaf.cosmo.dav.caldav.CaldavConstants;
import org.osaf.cosmo.icalendar.ICalendarConstants;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.Document;

/**
 * Represents the CalDAV supported-calendar-component-set
 * property. Valid component types are defined by
 * {@link ComponentTypes}.
 */
public class SupportedCalendarComponentSet extends AbstractDavProperty
    implements CaldavConstants, ICalendarConstants {

    private String[] componentTypes;

    public SupportedCalendarComponentSet() {
        this(SUPPORTED_COMPONENT_TYPES);
    }

	public SupportedCalendarComponentSet(Set<String> componentTypes) {
		this((String[]) componentTypes.toArray(new String[0]));
	}

    public SupportedCalendarComponentSet(String[] componentTypes) {
        super(SUPPORTEDCALENDARCOMPONENTSET, true);
        for (String type :componentTypes) {
            if (! CalendarUtils.isSupportedComponent(type)) {
                throw new IllegalArgumentException("Invalid component type '" +
                                                   type + "'.");
            }
        }
        this.componentTypes = componentTypes;
    }

    /**
     * (Returns a <code>Set</code> of
     * <code>SupportedCalendarComponentSet.CalendarComponentInfo</code>s
     * for this property.
     */
    public Object getValue() {
        Set infos = new HashSet();
		for (String type : componentTypes)
            infos.add(new CalendarComponentInfo(type));
        return infos;
    }

    /**
     * Returns the component types for this property.
     */
    public String[] getComponentTypes() {
        return componentTypes;
    }

    /**
     */
    public class CalendarComponentInfo implements XmlSerializable {
        private String type;

        /**
         */
        public CalendarComponentInfo(String type) {
            this.type = type;
        }

        public String toString() {
            return type;
        }

        /**
         */
        public Element toXml(Document document) {
            Element elem =
                DomUtil.createElement(document, ELEMENT_CALDAV_COMP,
                                      NAMESPACE_CALDAV);
            DomUtil.setAttribute(elem, ATTR_CALDAV_NAME,  NAMESPACE_CALDAV,
                                 type);
            return elem;
        }
    }
}
