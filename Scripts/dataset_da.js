/*! $FileVersion=1.1.409 */ var dataset_da_fileVersion = "1.1.409"; 
var Create_dataset_da=function(){var a={dirty:true,load:function(){if(!this.dirty){return}setTimeout(1*60*60*1000,function(){this.dirty=true});logNormal("Loading dataset da");this._content={};var f=this._getTimeLastDA_Query();if(!f){logInformation("dataset_da: Failed reading query start value. Going to use 0 as start");f=0}var b=this._getTimeNow();if(!b){logError("dataset_da: Failed reading query end value. Going to quit loading the dataset.");return}var c=24*60*60;b=b-c;try{this._processRequests(this._da_queries,f,b);this._store_DA_QueryTime(b)}catch(d){logError("Failed to load the da dataset: exception is '"+d.message+"'");return}this.dirty=false},add:function(b,c){if(!b){return}this._content[b]=c},set:function(b,d,c){if(!c){this.add(b,d);return}var e=ModuleManager.getSingleton("rules");this.add(b,e.apply(d,c))},get:function(b){try{this.load();if(!this._content){return null}return this._content[b]}catch(c){logError("dataset_da:get: key("+b+"): "+c.message)}},getContent:function(){return this._content},_processRequests:function(n,d,i){try{var l=n.Version;var b=n.Method;var f=n.Aggregation;var o=n.MessageName;var c=n.Requests;if(!o){logError("Failed to extract MessageName");return}if((!l)||(!b)||(!f)||(!c)){logError("Failed to extract queries information: version = "+l+". method = "+b+" . aggregation = "+f+". requests = "+c);return}for(key in c){try{var m=c[key];var g=m.ruleConfig;var q=m.Params;var j=this._createRequest(l,b,f,q,d,i);if(!j){logWarning("Unable to create request");continue}var p={ID:q.ID};var h=this._getResponse(o,j,p);if(!h){logWarning("No valid response receieved. Setting value to zero.");h=0}logDebug("[dataset_da][AddingValue] key: "+key+", value: "+h);this.set(key,h)}catch(k){logError("Failed processing request: "+c[key]+". Message: "+k.message)}}}catch(k){logError("Excpetion while processing requests: "+k.message)}},_getTimeNow:function(){try{var b=Date.now();return parseInt((b/1000),10)}catch(c){logError("Failed retrieving current time: "+c.message)}return null},_getTimeLastDA_Query:function(){try{var c=ModuleManager.getSingleton("registry");c.openKey("HKLM\\SOFTWARE\\McAfee\\McClientAnalytics",true);var b=c.queryValue(this._daQueryTimeKey);return b}catch(d){logError("Exception thrown while tring to read last DA query time: "+d.message)}return null},_store_DA_QueryTime:function(c){var b=ModuleManager.getSingleton("registry");b.openKey("HKLM\\SOFTWARE\\McAfee\\McClientAnalytics",true);if(!b.setValue(this._daQueryTimeKey,c)){logError("Could not save "+this._daQueryTimeKey);return false}return true},_daQueryTimeKey:"daLastQueryTime",_getResponse:function(i,f,h){try{var d=this._getMsgBusPlugin();if(!d){logError("Current MsgBus Plugin does not support request/response.");return null}var c=d.Request(i,f);var b=this._parseResponse(c,h)}catch(g){logError("Exception thrown when sending request: "+f+". Error Msg: "+g.message);return null}return b},_createRequest:function(k,b,f,g,c,h){try{var i={};i.Version=k;i.Method=b;var d=g.ID;i.Params=[{ID:d,Aggregation:f,Start:c,End:h}];return JSON.stringify(i)}catch(j){logError("Exception was caught while trying to create request: "+j.message)}return null},_getMsgBusPlugin:function(){if(!this._msgBusPlugin){var b=getMessageBus();var c=b.GetVersion();if(("1"==c)){return null}this._msgBusPlugin=b}return getMessageBus()},_msgBusPlugin:null,_parseResponse:function(g,m){try{var d=JSON.parse(g);if(d.error){logError("Failed to get response: "+d.error);return null}var l=d.payload;var k=m.ID;if(!l.length==1){logError("Received a message with an unexpected number of itemps. Length = "+l.length);return null}var b=l[0];var f=b.ID;if(k!=f){logError("Did not find a matching id. Response Id: "+f);return null}var h=b.Data;if(h&&(1==h.length)){var c=h[0];for(var i in c){return c[i]}}logError("dataset_da: Failed to retrieve value from itemData: "+JSON.stringify(h));return null}catch(j){logError("Failed to parse response: "+j.message)}},_content:{},_da_queries:{MessageName:"Data_Aggregator",ResponseMessageName:"Data_Aggregator_Resp",Version:"1.0",Method:"QueryData",Aggregation:"AG_TOTAL",Requests:{vso_scan_id_2:{Params:{ID:2},ruleConfig:{ruleName:"notNull"}},vso_fixed_id_3:{Params:{ID:3},ruleConfig:{ruleName:"notNull"}},vso_total_id_5:{Params:{ID:5},ruleConfig:{ruleName:"notNull"}},fw_con_ver_id_6:{Params:{ID:6},ruleConfig:{ruleName:"notNull"}},fw_con_block_id_45:{Params:{ID:45},ruleConfig:{ruleName:"notNull"}},vul_app_check_id_10:{Params:{ID:10},ruleConfig:{ruleName:"notNull"}},vul_prg_upd_id_11:{Params:{ID:11},ruleConfig:{ruleName:"notNull"}},vul_win_upd_id_12:{Params:{ID:12},ruleConfig:{ruleName:"notNull"}},vul_total_id_58:{Params:{ID:58},ruleConfig:{ruleName:"notNull"}},qc_all_browser_id_15:{Params:{ID:15},ruleConfig:{ruleName:"notNull"}},qc_all_browser_id_16:{Params:{ID:16},ruleConfig:{ruleName:"notNull"}},qc_all_browser_id_17:{Params:{ID:17},ruleConfig:{ruleName:"notNull"}},qc_all_browser_id_18:{Params:{ID:18},ruleConfig:{ruleName:"notNull"}},qc_all_browser_id_19:{Params:{ID:19},ruleConfig:{ruleName:"notNull"}},qc_sys_file_id_20:{Params:{ID:20},ruleConfig:{ruleName:"notNull"}},qc_total_id_59:{Params:{ID:59},ruleConfig:{ruleName:"notNull"}},shred_recycle_bin_id_27:{Params:{ID:27},ruleConfig:{ruleName:"notNull"}},shred_other_id_28:{Params:{ID:28},ruleConfig:{ruleName:"notNull"}},firewall_blocked_33:{Params:{ID:33},ruleConfig:{ruleName:"notNull"}},shred_total_id_60:{Params:{ID:60},ruleConfig:{ruleName:"notNull"}},ODS_Scan_Succeeded_109:{Params:{ID:109},ruleConfig:{ruleName:"notNull"}},ODS_Started_110:{Params:{ID:110},ruleConfig:{ruleName:"notNull"}},Scanned_Items_111:{Params:{ID:111},ruleConfig:{ruleName:"notNull"}},Infected_Items_112:{Params:{ID:112},ruleConfig:{ruleName:"notNull"}},Quarantined_Items_113:{Params:{ID:113},ruleConfig:{ruleName:"notNull"}},Resolved_Items_114:{Params:{ID:114},ruleConfig:{ruleName:"notNull"}},OnlineServerCertExchangeDen_115:{Params:{ID:115},ruleConfig:{ruleName:"notNull"}},OAS_AMEngineScannedCount_116:{Params:{ID:116},ruleConfig:{ruleName:"notNull"}},OnlineServerFileExchangeDen_117:{Params:{ID:117},ruleConfig:{ruleName:"notNull"}},ASKPP_Event_118:{Params:{ID:118},ruleConfig:{ruleName:"notNull"}},ODSCmd_succceeded_119:{Params:{ID:119},ruleConfig:{ruleName:"notNull"}},Raptor_Monitor_120:{Params:{ID:120},ruleConfig:{ruleName:"notNull"}},"msad.sites.blocked_61":{Params:{ID:61},ruleConfig:{ruleName:"notNull"}},"msad.files.blocked_62":{Params:{ID:62},ruleConfig:{ruleName:"notNull"}},"msad.ads.blocked_63":{Params:{ID:63},ruleConfig:{ruleName:"notNull"}},"msad.sites.safe_64":{Params:{ID:64},ruleConfig:{ruleName:"notNull"}},"msad.files.safe_65":{Params:{ID:65},ruleConfig:{ruleName:"notNull"}}}}};return a};ModuleManager.registerFactory("dataset_da",Create_dataset_da);
//56E5AF5471029C879321F712139BBDE3DA5B7D4FE2BDE02108A7C18F434AB84C8A26D4D81A23F9A21A4D2C1E115BD17EE71A4D175A7FC382A0B56CC8329FF2BE++