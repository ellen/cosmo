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

dojo.provide("cosmo.app.pim.layout");

dojo.require("cosmo.app");
dojo.require("cosmo.app.pim");
dojo.require('cosmo.ui.resize')
dojo.require("cosmo.ui.ContentBox");
dojo.require("dojo.html.common");

// -- Create global vars, do not remove despite lack of refs in code
dojo.require("cosmo.ui.conf");
dojo.require("cosmo.util.i18n");
dojo.require("cosmo.util.html");
dojo.require('cosmo.convenience');
// --

dojo.require('cosmo.view.cal');
dojo.require('cosmo.view.cal.canvas');

// -- Widget includes, may not always find proper namespaced refs
// -- ie, cosmo:CollectionSelector
dojo.require("cosmo.ui.widget.CollectionSelector");
// --
dojo.require("cosmo.ui.minical");
dojo.require("cosmo.ui.menu");


cosmo.app.pim.layout = new function () {
    this.baseLayout = null;
    this.initBaseLayout = function (node) {
        this.baseLayout = new cosmo.app.pim.layout.BaseLayout(node);
        this.baseLayout.render();
        this.populateBaseLayout();
        return this.baseLayout;
    };
};

cosmo.app.pim.layout.BaseLayout = function (p) {
    var params = p || {}
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.domNode = params.domNode;
    this.menuBar = new cosmo.app.pim.layout.MenuBar({ parent: this });
    this.mainApp = new cosmo.app.pim.layout.MainApp({ parent: this });
    this.children = [this.menuBar, this.mainApp];
    this.renderSelf = function () {
        var viewport = dojo.html.getViewport();
        var w = viewport.width;
        var h = viewport.height;
        // Pare width and height down to avoid
        // stupid scrollbars showing up
        w -= 2;
        h -= 2;
        this.width = w;
        this.height = h;
        this.menuBar.update({
            top: 0, left: 0,
            width: this.width, height: (TOP_MENU_HEIGHT - 1) });
        this.mainApp.update({
            top: TOP_MENU_HEIGHT, left: 0,
            width: this.width, height: (this.height - TOP_MENU_HEIGHT) });
        this.setPosition();
        this.setSize();
        cosmo.ui.resize.Viewports.resize();
    }
};
cosmo.app.pim.layout.BaseLayout.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.MenuBar = function (p) {
    var params = p || {}
    for (var n in params) { this[n] = params[n]; }

    var d = _createElem('div');
    d.id = 'menuBar';
    this.parent.domNode.appendChild(d);

    this.domNode = d;
    this.children = [];
    this.renderSelf = function () {
        this.setPosition();
        this.setSize();
        if (!this.hasBeenRendered) {
            this.parent.domNode.appendChild(this.domNode);
            this.hasBeenRendered = true;
        }
    }
};
cosmo.app.pim.layout.MenuBar.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.MainApp = function (p) {

    var params = p || {}
    for (var n in params) { this[n] = params[n]; }

    var d = _createElem('div');
    d.id = 'mainApp';

    this.domNode = d;
    this.centerColumn = new cosmo.app.pim.layout.CenterColumn({ parent: this });
    this.leftSidebar = new cosmo.app.pim.layout.LeftSidebar({ parent: this });
    this.rightSidebar = new cosmo.app.pim.layout.RightSidebar({ parent: this });
    this.children = [this.leftSidebar, this.centerColumn, this.rightSidebar];
    this.renderSelf = function () {
        this.setPosition();
        this.setSize();
        this.leftSidebar.update({ height: this.height });
        this.centerColumn.update({ width:
            (this.width - LEFT_SIDEBAR_WIDTH - RIGHT_SIDEBAR_WIDTH),
            height: this.height });
        if (!this.hasBeenRendered) {
            this.parent.domNode.appendChild(this.domNode);
            this.hasBeenRendered = true;
        }
    }
};
cosmo.app.pim.layout.MainApp.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.LeftSidebar = function (p) {
    var params = p || {}
    for (var n in params) { this[n] = params[n]; }

    // create domNodes
    var d = _createElem('div');
    d.id = 'leftSidebar';
    d.className = "viewport"
    this.parent.domNode.appendChild(d);
    /*
    d.style.paddingRight = "4px";
    var handle = _createElem('a');
    handle.className = "l-rHandle leftSideHandle";
    d.appendChild(handle);
    */
    this.domNode = d;
    this.children = [];
    this.renderSelf = function () {
    }
    var vp = new cosmo.ui.resize.Viewport(d)
    // add scaling
    // (screenwidth, screenheight, left,top,right,botton)
    vp.setMinSize([300,300,0,0,172,300]);
    vp.setMaxSize([1600,1200,0,0,172,1200]);
    vp.addResize("renderSelf",this.renderSelf);
    /*
    var h = new cosmo.ui.resize.Handle(handle);
    h.addViewport(d.id,"right");
    h.addViewport('centerColumn','left');
    h.addCollapse(d.id,"left");
    */
};
cosmo.app.pim.layout.LeftSidebar.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.CenterColumn = function (p) {
    var params = p || {}
    for (var n in params) { this[n] = params[n]; }
    this.children = [];
    var d = _createElem('div');
    d.id = 'centerColumn';
    d.className = "viewport"
    this.parent.domNode.appendChild(d);

    this.domNode = d;
    this.children = [];
    this.renderSelf = function () {
        //add any special child rendering
    }
    //viewport fun
    var vp = new cosmo.ui.resize.Viewport(d)
    // add scaling
    vp.setMinSize([500,300,173,0,300,300]);
    vp.setMaxSize([1600,1200,173,0,1600,1200]);
    vp.addResize("renderSelf",this.renderSelf)    ;
};
cosmo.app.pim.layout.CenterColumn.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.RightSidebar = function (p) {
    var params = p || {}
    for (var n in params) { this[n] = params[n]; }

    var d = _createElem('div');
    d.id = 'rightSidebar';
    d.className = "viewport";
    this.parent.domNode.appendChild(d);
    /*
    var handle = _createElem('a');
    handle.className = "l-rHandle";
    with (handle.style) {
        left = "0px";
        height = "100%";
        width = "4px";
        backgroundColor = "rgb(216,216,216)";
    }
    d.appendChild(handle);
    */
    this.domNode = d;
    this.children = [];
    this.renderSelf = function () {
        // add special rendering
    }
    this.children = [];
    //viewport fun
    var vp = new cosmo.ui.resize.Viewport(d);
    vp.setMinSize([300,300,43,0,300,300]);
    vp.setMaxSize([1600,1200,1343,0,1600,1200]);
    vp.addResize("renderSelf",this.renderSelf);
    /*
    var h = new cosmo.ui.resize.Handle(handle);
    h.addViewport(d.id,"left");
    h.addViewport('centerColumn','right');
    h.addCollapse(d.id,"right");
    */
};
cosmo.app.pim.layout.RightSidebar.prototype =
    new cosmo.ui.ContentBox();

cosmo.app.pim.layout.populateBaseLayout = function () {
    // Cal canvas -- namespace singleton and Canvas ContentBox obj
    // are bolted together in an unpleasant way here
    var canvas = new cosmo.view.cal.canvas.Canvas({
        viewStart: cosmo.view.cal.viewStart,
        viewEnd: cosmo.view.cal.viewEnd,
        currDate: cosmo.app.pim.currDate
    });
    this.baseLayout.mainApp.centerColumn.addChild(canvas);
    this.baseLayout.mainApp.centerColumn.calCanvas = canvas;

    // Cal selector / single cal name -- the container is a
    // ContentBox, and the contents is a Dojo widget
    var d = _createElem('div');
    d.id = 'calSelectNav';
    var cB = new cosmo.ui.ContentBox({ domNode: d, id: d.id });
    this.baseLayout.mainApp.leftSidebar.addChild(cB);
    this.baseLayout.mainApp.leftSidebar.collectionSelector = cB;
    dojo.widget.createWidget('cosmo:CollectionSelector', {
        'collections': cosmo.app.pim.currentCollections,
        'currentCollection': cosmo.app.pim.currentCollection,
        'ticketKey': cosmo.app.pim.ticketKey }, d, 'last');

    // Minical -- subclassed ContentBox
    var d = _createElem('div');
    d.id = 'miniCal';
    cB = new cosmo.ui.minical.MiniCal({ domNode: d, currDate: cosmo.app.pim.currDate });
    this.baseLayout.mainApp.leftSidebar.addChild(cB);
    this.baseLayout.mainApp.leftSidebar.minical = cB;

    var d = _createElem('div');
    d.id = 'menuNavItems';
    var cB = new  cosmo.ui.menu.MainMenu({ domNode: d, id: d.id, top: (TOP_MENU_HEIGHT - 20) });
    this.baseLayout.menuBar.addChild(cB);
    this.baseLayout.menuBar.mainMenu = cB;
    cB.render();

    // Subscription selector thinger -- show only in anon view
    if (!cosmo.app.initParams.authAccess) {
        var s = _createElem('span');
        s.id = 'subscribeSelector';
        var form = _createElem('form');
        s.appendChild(form);
        var clientOpts = cosmo.ui.widget.CollectionDetailsDialog.getClientOptions();
        clientOpts.unshift({ text: 'Subscribe with ...', value: '' });
        var selOpts = { name: 'subscriptionSelect', id: 'subscriptionSelect',
           options: clientOpts, className: 'selectElem' };
        var subscrSel = cosmo.util.html.createSelect(selOpts);
        var f = function (e) {
            // Show the subcription dialog if the empty "Subscribe with ..."
            // option is not the one selected
            var sel = e.target;
            if (sel.selectedIndex != 0) {
            //XINT
            cosmo.app.showDialog(
                cosmo.ui.widget.CollectionDetailsDialog.getInitProperties(
                    self.currentCollection.collection,
                    sel.options[sel.selectedIndex].value));
            }
        };
        dojo.event.connect(subscrSel, 'onchange', f);
        form.appendChild(subscrSel);
        s.appendChild(cosmo.util.html.nbsp());
        // Add to the menu area in the first position
        d.insertBefore(s, d.firstChild);
    }

};