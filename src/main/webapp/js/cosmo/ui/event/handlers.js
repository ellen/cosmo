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

/**
 * @fileoverview Event handlers for Cosmo. Most all UI input is handled here.
 * @author Matthew Eernisse mailto:mde@osafoundation.org
 * @license Apache License 2.0
 *
 * Rather than putting event listeners directly on the DOM elements
 * themselves, Cosmo uses meaningful IDs for all clickable elements.
 * All UI input goes through these global listeners and dispatches 
 * events to the appropriate handler based on the ID of the element 
 * being manipulated.
 * 
 * It can become a little tricky identifying exactly what element 
 * got clicked (i.e., requiring irritating regex filtering), but 
 * allows more more centralized control of the event flow.
 */

dojo.provide('cosmo.ui.event.handlers');
 
/**
 * Generic function to get the source elem of a UI event
 * that has the desired attribute (e.g., id or some custom
 * attribute). If the actual source elem does not have the
 * specificed property, it looks up the doc tree until it
 * finds one that does
 * @param e A DOM event
 * @return Object, a DOM element
 */
cosmo.ui.event.handlers.getSrcElemByProp = function (e, prop) {
    var ret = null;
    if (e.srcElement) ret = e.srcElement;
    else if (e.target) ret = e.target;
    
    // Disabled form elements in IE return a bogus object
    if (typeof ret[prop] == 'undefined') {
        return document.body;
    }
    // Look up the designated prop of the elem or its parent
    else {
        // Look for something with an the prop in question -- 
        // not a text node
        while (!ret[prop] || ret.nodeType == 3) {
            ret = ret.parentNode;
        }
    }
    return ret;
};

/**
 * Double clicks -- currently nothing app-wide 
 */
cosmo.ui.event.handlers.dblClickHandler = function (e) {
    // Do nothing right now
}

/**
 * Check for client-side timeout if user clicks 
 */
cosmo.ui.event.handlers.mouseDownHandler = function (e) {
    // =================
    // Check for client-side timeout on all mouse clicks
    // =================
    Cal.checkTimeout();
}

/**
 * Moving the mouse -- Used for dragging event blocks, 
 * or for resizing the all-day event area.
 */
cosmo.ui.event.handlers.mouseMoveHandler = function (e) {
    var d = cosmo.app.dragItem;
    // Set global x-y coords
    xPos = e ? e.pageX : window.event.x;
    yPos = e ? e.pageY : (window.event.y + document.body.scrollTop);
    // Drag the app's draggable if there is one
    if (d) {
       d.doDrag(); 
    }
}

/**
 * Releasing the mouse -- clicking on nav arrows, or dropping
 * after a drag
 */
cosmo.ui.event.handlers.mouseUpHandler = function (e) {
    // Drop anything the user is dragging
    if (cosmo.app.dragItem) {
        cosmo.app.dragItem.drop();
        // Clear out the app draggable
        cosmo.app.dragItem = null;
    }
}

/**
 * All keyboard input -- includes fu for modal dialog box
 * Also had to do some hacky stuff to suppress Enter and Delete key
 * input when user is typing event detail form fields
 */
cosmo.ui.event.handlers.keyUpHandler = function (e) {

    // =================
    // Check for client-side timeout on all keyboard input
    // =================
    // Have to return false to keep event from continuing to bubble
    // otherwise it actually ends up refreshing the session before
    // we have a chance to time out
    if (Cal.checkTimeout()) {
        return false;
    }

    e = !e ? window.event : e;
    
    // UI input is disabled, check for modal dialog box
    if (cosmo.app.getInputDisabled()) {
        // Execute dialog's default action if user hits Enter key
        if (cosmo.app.modalDialog.isDisplayed && cosmo.app.modalDialog.defaultAction && 
            e.keyCode == 13) {
            cosmo.app.modalDialog.defaultAction();
        }
    }
    // Normal UI input -- Saving changes and removing events
    // (1) Needs an event to be selected
    // (2) Selected event can't be in 'procssing' state
    // (3) Don't trigger Save/Remove when typing in form fields
    // ---------------
    // TO-DO: Move redundant conditionals up a level
    else {
        var selEv = cosmo.view.cal.canvas.getSelectedEvent();
        switch (e.keyCode) {
            // Enter key
            case 13:
                if (selEv && 
                    !selEv.getInputDisabled() && 
                    Cal.calForm.detailTextInputHasFocus) {
                    //Cal.calForm.saveCalEvent();
                    dojo.event.topic.publish('/calEvent', { 'action': 'saveFromForm' });
                }
                else if (Cal.calForm.jumpToTextInputHasFocus) {
                    Cal.calForm.goJumpToDate();
                }
                break;
            // Delete key
            case 46:
                if (selEv && 
                    !selEv.getInputDisabled() && 
                    !Cal.calForm.detailTextInputHasFocus) {
                    dojo.event.topic.publish('/calEvent', { 'action': 'removeConfirm', 'data': selEv });
                    //Cal.showDialog(
                    //    cosmo.view.cal.dialog.getProps('removeConfirm'));
                }
                break;
        }
    }
}

/**
 * Do cleanup of DOM-element refs to avoid memleak in IE
 */
function cleanup() {
    Cal.cleanup();
    Cal = null;
}

