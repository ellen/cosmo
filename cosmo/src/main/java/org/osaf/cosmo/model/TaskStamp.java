/*
 * Copyright 2007 Open Source Applications Foundation
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
package org.osaf.cosmo.model;

import net.fortuna.ical4j.model.Calendar;

import org.osaf.cosmo.hibernate.validator.Task;

/**
 * Represents a Task Stamp.  When added to a NoteItem, the note
 * becomes a task. Also represents VTODO.
 */
public interface TaskStamp extends Stamp{

    /**
     * Return the Calendar object containing a VTODO component.
     * @return calendar
     */
    @Task
    public Calendar getTaskCalendar();

    /**
     * Set the Calendar object containing a VOTODO component.
     * This allows non-standard icalendar properties to be stored 
     * with the task.
     * @param calendar
     */
    public void setTaskCalendar(Calendar calendar);

    /**
     * Return icalendar representation of task.  A task is serialized
     * as a VOTODO.
     * @return Calendar representation of task
     */
    public Calendar getCalendar();

}