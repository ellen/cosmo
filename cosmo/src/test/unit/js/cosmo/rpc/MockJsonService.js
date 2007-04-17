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

dojo.provide("cosmoTest.rpc.MockJsonService");
dojo.require("cosmo.rpc.JsonService");
dojo.require("dojo.lang.*");

dojo.declare("cosmoTest.rpc.MockJsonService", [cosmo.rpc.JsonService],
{
    bindResponse :
    
    /*
   {'name':'saveEvent', 'parameters': [{'name': 'event'}]},
   {'name':'removeEvent', 'parameters': [{'name': 'calendarName'}, {'name': 'id'}]},
   {'name':'getEvent', 'parameters': [{'name': 'calendarName'}, {'name': 'id'}]},
   {'name':'moveEvent', 'parameters': [{'name': 'sourceCalendar'}, {'name': 'id'}, {'name': 'destinationCalendar'}]},
   {'name':'createCalendar', 'parameters': [{'name': 'calendarName'}, {'name': 'calendarPath'}]},
   {'name':'setPreference', 'parameters': [{'name': 'preferenceName'}, {'name': 'value'}]},
   {'name':'removePreference', 'parameters': [{'name': 'preferenceName'}]},
   {'name':'setPreferences', 'parameters': []},
   {'name':'setMultiplePreferences', 'parameters': [{'name': 'preferences'}]},
   {'name':'getRecurrenceRules', 'parameters': [{'name': 'calendarPath'}, {'name': 'eventIds'}]},
   {'name':'saveRecurrenceRule', 'parameters': [{'name': 'calendarPath'}, {'name': 'eventId'}, {'name': 'recurrenceRule'}]},
   {'name':'expandEvents', 'parameters': [{'name': 'calendarPath'}, {'name': 'eventIds'}, {'name': 'utcStartTime'}, {'name': 'utcEndTime'}]},
   {'name':'saveNewEventBreakRecurrence', 'parameters': [{'name': 'calendarPath'}, {'name': 'event'},
                   {'name': 'originalEventId'}, 
                   {'name': 'originalEventEndDate'}]},
   {'name':'deleteSubscription', 'parameters': [{'name': 'collectionId'}, {'name': 'ticketKey'}]},
   {'name':'saveSubscription', 'parameters': [{'name': 'cid'}, {'name': 'ticketKey'}, {'name': 'displayName'}]},
   {'name':'getVersion', 'parameters': []},
   {'name':'saveDisplayName', 'parameters': [{'name': 'cid'}, {'name': 'displayName'}]}  
*/
    {
         saveEvent: function(name, event){},
         removeEvent: function(calendarName, id){},
         getEvent: function(calendarName, id){},
         moveEvent: function(sourceCalendar, id, destinationCalendar){},
         createCalendar: function(calendarName, calendarPath){},
         setPreference: function(preferenceName, value){},
         removePreference: function(preferenceName){},
         setPreferences: function(preferences){},
         setMultiplePreferences: function(preferences){},
         getRecurrenceRules: function(calendarPath, eventIds){},
         saveRecurrenceRule: function(calendarPath, eventId, recurrenceRule){},
         expandEvents: function(calendarPath, eventIds, utcStartTime, utcEndTime){},
         saveNewEventBreakRecurrence: function(calendarPath, event, originalEventId, originalEventEndDate){},
         deleteSubscription: function(collectionId, ticketKey){},
         saveSubscription: function(cid, ticketKey, displayName){},
         getVersion: function(){},
         saveDisplayName: function(cid, displayName){},


        getCalendars: function(){
            return eval('({"result":[{"javaClass":"org.osaf.cosmo.rpc.model.Calendar",' +
                    '"uid":"b6c2ac54-38b0-42c1-a874-d77b66b16d6b","name":"Travis\'s Cal",' +
                    '"protocolUrls":{"javaClass":"java.util.HashMap","map":{"webcal":"http:' +
                    '\/\/localhost:8080\/cosmo\/webcal\/collection\/b6c2ac54-38b0-42c1-a874-' +
                    'd77b66b16d6b","mc":"http:\/\/localhost:8080\/cosmo\/mc\/collection\/b6c' +
                    '2ac54-38b0-42c1-a874-d77b66b16d6b","atom":"http:\/\/localhost:8080\/cos' +
                    'mo\/atom\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b","pim":"http:' +
                    '\/\/localhost:8080\/cosmo\/pim\/collection\/b6c2ac54-38b0-42c1-a874-d77b' +
                    '66b16d6b","dav":"http:\/\/localhost:8080\/cosmo\/dav\/collection\/b6c2ac' +
                    '54-38b0-42c1-a874-d77b66b16d6b"}}}],"id":2})');
        },
        
        getSubscriptions: function(){
            return eval('({"result":[{"calendar":{"javaClass":"org.osaf.cosmo.rpc.model.Ca' +
                    'lendar","uid":"010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff","name":"Ellen\'s' +
                    ' Cal","protocolUrls":{"javaClass":"java.util.HashMap","map":{"webcal":' +
                    '"http:\/\/localhost:8080\/cosmo\/webcal\/collection\/010dcd9a-178d-4e0' +
                    'c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","mc":"http:\/\/localhost:8080\/' +
                    'cosmo\/mc\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0' +
                    'iag3380","atom":"http:\/\/localhost:8080\/cosmo\/atom\/collection\/010' +
                    'dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","pim":"http:\/\/' +
                    'localhost:8080\/cosmo\/pim\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec4' +
                    '3fe9ff?ticket=ps0iag3380","dav":"http:\/\/localhost:8080\/cosmo\/dav\/' +
                    'collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380"}}}' +
                    ',"ticket":{"javaClass":"org.osaf.cosmo.rpc.model.Ticket","ticketKey":"p' +
                    's0iag3380","privileges":{"javaClass":"java.util.HashSet","set":{"read":"' +
                    'read"}}},"javaClass":"org.osaf.cosmo.rpc.model.Subscription","displayNam' +
                    'e":"Ellen\'s Cal"}],"id":3})');
        },
        
        getPreferences: function(){
            return eval('("result":{"javaClass":"java.util.HashMap","map":{"UI.Show.AccountBro' +
                    'wserLink":"true"}},"id":5})');
        },
        
        getEvents: function(collectionUid, startTime, endTime){
            if (collectionUid == "b6c2ac54-38b0-42c1-a874-d77b66b16d6b"
                && 1174114800000
                && 1174892399000){
                
            return eval(
'({"result":[{"pointInTime":false,"javaClass":"org.osaf.cosmo.rpc.model.Event",' +
'"anyTime":false,"instanceDate":{"month":2,"utc":false,"javaClass":"org.osaf.c' +
'osmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"tzId":nul' +
'l,"date":21,"hours":13,"minutes":30},"start":{"month":2,"utc":false,"javaClas' +
's":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds' +
'":0,"tzId":null,"date":21,"hours":13,"minutes":30},"title":"Monthly Event","e' +
'nd":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","' +
'milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date":21,"hours":14,"min' +
'utes":30},"status":"CONFIRMED","id":"d8174518-6e56-4bcd-be93-866ed6c5ed0e","a' +
'llDay":false,"instance":false,"description":"","location":"","recurrenceRule"' +
':{"exceptionDates":null,"javaClass":"org.osaf.cosmo.rpc.model.RecurrenceRule"' +
',"customRule":null,"frequency":"monthly","endDate":null,"modifications":[]},"' +
'masterEvent":true},{"pointInTime":false,"javaClass":"org.osaf.cosmo.rpc.model' +
'.Event","anyTime":false,"instanceDate":{"month":2,"utc":false,"javaClass":"or' +
'g.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"t' +
'zId":null,"date":21,"hours":12,"minutes":0},"start":{"month":2,"utc":false,"j' +
'avaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"' +
'seconds":0,"tzId":null,"date":21,"hours":12,"minutes":0},"title":"Weekly Even' +
't","end":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDa' +
'te","milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date":21,"hours":13' +
',"minutes":0},"status":"CONFIRMED","id":"a09e2a86-d366-4a02-afed-acc6d919f79d' +
'","allDay":false,"instance":false,"description":"","location":"","recurrenceR' +
'ule":{"exceptionDates":null,"javaClass":"org.osaf.cosmo.rpc.model.RecurrenceR' +
'ule","customRule":null,"frequency":"weekly","endDate":null,"modifications":[]' +
'},"masterEvent":true},{"pointInTime":false,"javaClass":"org.osaf.cosmo.rpc.mo' +
'del.Event","anyTime":false,"instanceDate":null,"start":{"month":2,"utc":false' +
',"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":200' +
'7,"seconds":0,"tzId":null,"date":22,"hours":0,"minutes":0},"title":"All day",' +
'"end":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate"' +
',"milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date":22,"hours":0,"mi' +
'nutes":0},"status":"CONFIRMED","id":"96e7f215-ea0e-4ffd-8143-938a36f700b8","a' +
'llDay":true,"instance":false,"description":"","location":"","recurrenceRule":' +
'null,"masterEvent":false},{"pointInTime":false,"javaClass":"org.osaf.cosmo.rp' +
'c.model.Event","anyTime":true,"instanceDate":null,"start":{"month":2,"utc":fa' +
'lse,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":' +
'2007,"seconds":0,"tzId":null,"date":23,"hours":0,"minutes":0},"title":"Any ti' +
'me","end":null,"status":"CONFIRMED","id":"170c34ad-52f5-4d5c-89b0-d332c20f6ce' +
'7","allDay":false,"instance":false,"description":"","location":"","recurrence' +
'Rule":null,"masterEvent":false},{"pointInTime":false,"javaClass":"org.osaf.co' +
'smo.rpc.model.Event","anyTime":false,"instanceDate":{"month":2,"utc":false,"j' +
'avaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"' +
'seconds":0,"tzId":null,"date":21,"hours":10,"minutes":30},"start":{"month":2,' +
'"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0' +
',"year":2007,"seconds":0,"tzId":null,"date":21,"hours":10,"minutes":30},"titl' +
'e":"Daily Event","end":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc' +
'.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date"' +
':21,"hours":11,"minutes":30},"status":"CONFIRMED","id":"9b5ec40b-6347-42c0-8a' +
'8f-63ab155b1311","allDay":false,"instance":false,"description":"","location":' +
'"","recurrenceRule":{"exceptionDates":null,"javaClass":"org.osaf.cosmo.rpc.mo' +
'del.RecurrenceRule","customRule":null,"frequency":"daily","endDate":null,"mod' +
'ifications":[]},"masterEvent":true},{"pointInTime":false,"javaClass":"org.osa' +
'f.cosmo.rpc.model.Event","anyTime":false,"instanceDate":{"month":2,"utc":fals' +
'e,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":20' +
'07,"seconds":0,"tzId":null,"date":22,"hours":10,"minutes":30},"start":{"month' +
'":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","millisecond' +
's":0,"year":2007,"seconds":0,"tzId":null,"date":22,"hours":10,"minutes":30},"' +
'title":"Daily Event","end":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo' +
'.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"tzId":null,"d' +
'ate":22,"hours":11,"minutes":30},"status":"CONFIRMED","id":"9b5ec40b-6347-42c' +
'0-8a8f-63ab155b1311","allDay":false,"instance":true,"description":"","locatio' +
'n":"","recurrenceRule":{"exceptionDates":null,"javaClass":"org.osaf.cosmo.rpc' +
'.model.RecurrenceRule","customRule":null,"frequency":"daily","endDate":null,"' +
'modifications":[]},"masterEvent":false},{"pointInTime":false,"javaClass":"org' +
'.osaf.cosmo.rpc.model.Event","anyTime":false,"instanceDate":{"month":2,"utc":' +
'false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year' +
'":2007,"seconds":0,"tzId":null,"date":23,"hours":10,"minutes":30},"start":{"m' +
'onth":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","millise' +
'conds":0,"year":2007,"seconds":0,"tzId":null,"date":23,"hours":10,"minutes":3' +
'0},"title":"Daily Event","end":{"month":2,"utc":false,"javaClass":"org.osaf.c' +
'osmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"tzId":nul' +
'l,"date":23,"hours":11,"minutes":30},"status":"CONFIRMED","id":"9b5ec40b-6347' +
'-42c0-8a8f-63ab155b1311","allDay":false,"instance":true,"description":"","loc' +
'ation":"","recurrenceRule":{"exceptionDates":null,"javaClass":"org.osaf.cosmo' +
'.rpc.model.RecurrenceRule","customRule":null,"frequency":"daily","endDate":nu' +
'll,"modifications":[]},"masterEvent":false},{"pointInTime":false,"javaClass":' +
'"org.osaf.cosmo.rpc.model.Event","anyTime":false,"instanceDate":{"month":2,"u' +
'tc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"' +
'year":2007,"seconds":0,"tzId":null,"date":24,"hours":10,"minutes":30},"start"' +
':{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","mil' +
'liseconds":0,"year":2007,"seconds":0,"tzId":null,"date":24,"hours":10,"minute' +
's":30},"title":"Daily Event","end":{"month":2,"utc":false,"javaClass":"org.os' +
'af.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"tzId"' +
':null,"date":24,"hours":11,"minutes":30},"status":"CONFIRMED","id":"9b5ec40b-' +
'6347-42c0-8a8f-63ab155b1311","allDay":false,"instance":true,"description":"",' +
'"location":"","recurrenceRule":{"exceptionDates":null,"javaClass":"org.osaf.c' +
'osmo.rpc.model.RecurrenceRule","customRule":null,"frequency":"daily","endDate' +
'":null,"modifications":[]},"masterEvent":false},{"pointInTime":false,"javaCla' +
'ss":"org.osaf.cosmo.rpc.model.Event","anyTime":false,"instanceDate":{"month":' +
'2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds"' +
':0,"year":2007,"seconds":0,"tzId":null,"date":25,"hours":10,"minutes":30},"st' +
'art":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDate",' +
'"milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date":25,"hours":10,"mi' +
'nutes":30},"title":"Daily Event","end":{"month":2,"utc":false,"javaClass":"or' +
'g.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":0,"t' +
'zId":null,"date":25,"hours":11,"minutes":30},"status":"CONFIRMED","id":"9b5ec' +
'40b-6347-42c0-8a8f-63ab155b1311","allDay":false,"instance":true,"description"' +
':"","location":"","recurrenceRule":{"exceptionDates":null,"javaClass":"org.os' +
'af.cosmo.rpc.model.RecurrenceRule","customRule":null,"frequency":"daily","end' +
'Date":null,"modifications":[]},"masterEvent":false},{"pointInTime":false,"jav' +
'aClass":"org.osaf.cosmo.rpc.model.Event","anyTime":false,"instanceDate":null,' +
'"start":{"month":2,"utc":false,"javaClass":"org.osaf.cosmo.rpc.model.CosmoDat' +
'e","milliseconds":0,"year":2007,"seconds":0,"tzId":null,"date":21,"hours":9,"' +
'minutes":0},"title":"One time event","end":{"month":2,"utc":false,"javaClass"' +
':"org.osaf.cosmo.rpc.model.CosmoDate","milliseconds":0,"year":2007,"seconds":' +
'0,"tzId":null,"date":21,"hours":10,"minutes":0},"status":"CONFIRMED","id":"23' +
'8c6c5f-8223-4eb0-923e-29bbbbe9eb83","allDay":false,"instance":false,"descript' +
'ion":"Welcome to Cosmo","location":"","recurrenceRule":null,"masterEvent":fal' +
'se}],"id":6})'
            );
            }
            
        },
        
        getTicket: function(ticketId, collectionUid){
            if (ticketId == 'ps0iag3380' && collectionUid == '010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff'){
                return eval('({"result":{"javaClass":"org.osaf.cosmo.rpc.model.Ticket","ticketKey":"ps0iag3380","privileges":{"javaClass":"java.util.HashSet","set":{"read":"read"}}},"id":2})')
            }
        },
        
        getCalendar: function(collectionUid){
            if (collectionUid == 'b6c2ac54-38b0-42c1-a874-d77b66b16d6b'){
                return eval('({"result":{"javaClass":"org.osaf.cosmo.rpc.model.Calendar","uid":"b6c2ac54-38b0-42c1-a874-d77b66b16d6b","name":"Travis\'s Cal","protocolUrls":{"javaClass":"java.util.HashMap","map":{"webcal":"http:\/\/localhost:8080\/cosmo\/webcal\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b","mc":"http:\/\/localhost:8080\/cosmo\/mc\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b","atom":"http:\/\/localhost:8080\/cosmo\/atom\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b","pim":"http:\/\/localhost:8080\/cosmo\/pim\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b","dav":"http:\/\/localhost:8080\/cosmo\/dav\/collection\/b6c2ac54-38b0-42c1-a874-d77b66b16d6b"}}},"id":5})')
            }
        },
        getPreference: function(key){
            if (key == "UI.Show.AccountBrowserLink"){
                return eval('({"result":"true","id":1})');
            }
        },
        getSubscription: function(collectionUid, ticketKey){
            if (collectionUid == "010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff" && ticketKey == "ps0iag3380"){
               return eval('({"result":{"calendar":{"javaClass":"org.osaf.cosmo.rpc.model.Calendar","uid":"010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff","name":"Ellen\'s Cal","protocolUrls":{"javaClass":"java.util.HashMap","map":{"webcal":"http:\/\/localhost:8080\/cosmo\/webcal\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","mc":"http:\/\/localhost:8080\/cosmo\/mc\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","atom":"http:\/\/localhost:8080\/cosmo\/atom\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","pim":"http:\/\/localhost:8080\/cosmo\/pim\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380","dav":"http:\/\/localhost:8080\/cosmo\/dav\/collection\/010dcd9a-178d-4e0c-8d66-8e0ec43fe9ff?ticket=ps0iag3380"}}},"ticket":{"javaClass":"org.osaf.cosmo.rpc.model.Ticket","ticketKey":"ps0iag3380","privileges":{"javaClass":"java.util.HashSet","set":{"read":"read"}}},"javaClass":"org.osaf.cosmo.rpc.model.Subscription","displayName":"Ellen\'s Cal"},"id":2})');
            }
        }
                    
                    
    },
    
	bind: function(method, parameters, deferredRequestHandler, url, kwArgs){
		//summary
		//JSON-RPC bind method. Takes remote method, parameters, deferred,
		//and a url, calls createRequest to make a JSON-RPC envelope and
		//passes that off with bind.
		
		var result = this.bindResponse[method].apply(parameters);
        
        kwArgs.sync? 
    		this.resultCallback(deferredRequestHandler)('load', result, {}):
    		dojo.lang.setTimeout(this, this.resultCallback(deferredRequestHandler), 47, 'load', result, {});
		
	}
}

);
