/*! $FileVersion=1.1.409 */ var emitter_fileVersion = "1.1.409"; 
function createEmitter(b,a){function c(g,i){var h=getScriptVariableStore().Get(g);if(h){return h}try{h=getPluginFactory().Create(i)}catch(j){logError("Failed to create plugin: '"+i+"'")}try{getScriptVariableStore().Set(g,h)}catch(j){logError("Failed to set plugin '"+i+"' in store as '"+g+"'")}return h}try{var d={configure:function(g,e){this.profileName=g;this.profile=e;this.transportName=e.transport;this.transportConfiguration=e.transport_config;this.dataSetNames=e.datasets;this.enableRules=e.enableRules;this.throttleRule=e.throttleRule;this.throttleMultiplier=e.throttleMultiplier;this.maxDimensionLength=e.maxDimensionLength},send:function(h){try{if(!this._isEnabled()){logInformation("_isEnabled() returned false. Will not send data to "+this.transportName);return false}h=this._sanitize(h);if("csp"==this.transportName&&"1"==this._getPlugin(this.transportName).GetVersion()){return false}if(!this.initialized){var g=ModuleManager.getSingleton("mappings").getProfileTableStr(this.profile.dictionary);this._getPlugin(this.transportName).Initialize(this.transportName,g,JSON.stringify(this.transportConfiguration));this.initialized=true}logDebug("Emit outbound data: "+JSON.stringify(h));return this._getPlugin().Send(JSON.stringify(h))}catch(i){logError("Failed to Emit data: exception = '"+i.message+"'")}},_isEnabled:function(){try{if(null==this.enableRules){return true}if("data_collector"==this.enableRules.sourceType){var i=ModuleManager.getSingleton("data_collector");var g=i.get(this.enableRules.name);var j=ModuleManager.getSingleton("rules");return j.evaluate(g,this.enableRules.rule)}logWarning("_isEnabled: unexpected enableRules.sourceType. sourceType "+this.enableRules.sourceType);return false}catch(h){logError("_isEnabled: "+h.message);return false}},_pluginFactories:{da:{Create:function(e){var g=GetProperty("Analytics.SDK.Version","");logDebug("Tansport: "+e+" with SDK version: "+g);if(isFirstFileVersionGreater("2,5,9999,9999",g)){return c(e,"da")}return ModuleManager.getSingleton("transport_da")}},ai:{Create:function(e){return ModuleManager.create("transport_ai")}},eh:{Create:function(e){return ModuleManager.create("transport_event_hub")}},ga:getPluginFactory(),csp:getPluginFactory(),ga_rest:{Create:function(e){return ModuleManager.create("transport_ga")}},msgbus:{Create:function(e){return ModuleManager.create("transport_msgbus")}}},_getPlugin:function(h){try{if(!this._plugin){logDebug("Trying to create transport plugin with name: "+h);var g=this._pluginFactories[h];if(!g){logDebug("using plugin factory");g=getPluginFactory()}this._plugin=g.Create(h)}}catch(i){logError("_getPlugin: Exception caught with message "+i.message)}return this._plugin},_sanitize:function(i){var g=this.transportName.match("^ga");for(var h in i){if(g){try{i[h]=escape(unescape(i[h]))}catch(j){i[h]=String(i[h])}}else{i[h]=String(i[h])}if((this.maxDimensionLength!=null)&&!isNaN(this.maxDimensionLength)){if(i[h].length>this.maxDimensionLength){i[h]=i[h].substring(0,this.maxDimensionLength-3)+"..."}}}return i},_plugin:null,_initialized:false};return d}catch(f){logError("Failed to create the '"+transportName+"' emitter: "+f.message)}return null}ModuleManager.registerFactory("emitter",createEmitter);
//31A9BE346F83783DFFFBB8F06FA285E67CDC10B55C324FABABA2A3E888586145858A87EF4EED4DB1D7848C907008366ECEE02155261B42BA609C1B6E11A75AFB++