/*! $FileVersion=1.1.409 */ var config_manager_fileVersion = "1.1.409"; 
function CreateEventConfig(){var a={getEvents:function(){var b=JSONManager.getSingleton("events");return b.data},getProfileNames:function(b){try{return this.getEvents()[b].profileNames}catch(c){return null}},getAttributeRules:function(b){try{return this.getEvents()[b].attributeRules}catch(c){return null}},getPriority:function(c){try{var b=this.getEvents()[c].priority;return b.toLowerCase()}catch(d){return""}},getDataSetNames:function(b){try{return this.getEvents()[b].datasets}catch(c){return[]}},_setEvent:function(d,b){try{return this.getEvents()[d]=b}catch(c){return[]}},getThrottleRule:function(b){try{return this.getEvents()[b].throttleRule}catch(c){logWarning("getThrottleRule: failed, cannot find throttle rule attached to "+b);return null}},_events:null};return a}ModuleManager.registerFactory("config_manager",CreateEventConfig);
//E121F457C3FAC4019466B1392372B678726FE1A9C5C7F3DB8E8E95A6E5249878188A16B5E3F65027FE85752604C6E2A8D2D82FB591F9D7C90F3BFA863E2FBD4D++