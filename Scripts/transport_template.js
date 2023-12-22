/*! $FileVersion=1.1.409 */ var transport_template_fileVersion = "1.1.409"; 
function TransportPlugin_Template(){}if(typeof TransportPlugin_Template.prototype.GetName!=="function"){TransportPlugin_Template.prototype={GetName:function(){return this._name},GetVersion:function(){if(transport_template_fileVersion){return transport_template_fileVersion}return"0.0.0"},Initialize:function(b,d,a){try{if(!a||!b||!d){logError("TransportPlugin_Template: Failed to initialize (name). Config: "+a+". Name: "+b+".Dictionary: "+d);return false}this._dictionary=JSON.parse(d);this._config=JSON.parse(a);this._name=b;if(!this._config||!this._name){logError("TransportPlugin_Template: Failed to initialize (name). Config: "+a+". Name: "+b);return false}return this._setup()}catch(c){logError("TransportPlugin_Template::Initialize Exception caught with message: "+c.message)}},Send:function(a){logError("TransportPlugin_Template::Send: Did not overwrite function. Send will return false");return false},Uninitialize:function(){this._dictionary=null;this._config=null;this._name=null},_setup:function(){logError("TransportPlugin_Template::_setup: Did not overwrite function. _setup will return false");return false},_dictionary:{},_config:{},_name:null,_verb:null}}ModuleManager.registerFactory("transport_template",TransportPlugin_Template);
//FF374CA6E44CA201F2A250A4C3AE8A776DD78767CEEA02AFB1BC3645F984F055656B314FD2DE0090EC09FC8A15C58844392E60918544175FDED4F383FAB8DB2F++