$(function() {
	var uploader = [];
	var configSvc = {
			url: {
				findByConfigType : rootPath + "/sys/config/findByConfigType?t="+new Date().getTime(),
				updateValue : rootPath + "/sys/config/updateValue?t="+new Date().getTime()
			},
			fnUpdate: function(configType){
				var params = Svc.formToJson($("#"+configType+"_form"));
				/*if(uploader!=null && uploader.length>0) {
					var configKeyValues = [];
					$.each(uploader, function(i, upObj){
						var configKeyValue = {};
						console.log(upObj);
						var files = upObj.getUploadFiles();
						configKeyValue.oldFileNames= files.oldFileNames;
						configKeyValue.newFileNames=files.newFileNames;
						configKeyValue.fileType = files.fileType;
						configKeyValues.push(configKeyValue);
					});
					params.configKeyValues = configKeyValues;
				}*/
				console.log(params)
				Svc.AjaxJson.post(configSvc.url.updateValue,{params:JSON.stringify(params)},function(data){
					layer.alert("修改成功，重新登录系统后生效！");
				});
			},
			addSysSetStr: function(configType){
				Svc.AjaxJson.post(configSvc.url.findByConfigType,{configType:configType},function(data){
					$("#"+configType+"_form").html("");
					$("#"+configType+"_form").append('<input name="configType" value="'+configType+'" type="hidden"/>');
					$.each(data,function(i,v){
						if(v.inputType!='hidden'){
							var labelStr = configSvc.labelStrFun(v);
							var inputStr = configSvc.inputStrFun(v)
							$("#"+configType+"_form").append(['<div class="form-group normal-form">',
							                               ' <label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">',
							                               		labelStr,
							                               ' </label>',
							                               ' <div class="col-xs-12 col-sm-3 pl-0">',
				                               					inputStr,
				                               			   ' </div>',
							                               ' <div class="col-xs-12 col-sm-3 valid-msg"></div>',
							                               '</div>'].join(""));
							if("file"==v.inputType) {
								var options = {attachment:{fromId:v.configKey,type:v.configKey},isMul:false}
								var fileUploader = new FileUploader("#"+v.configKey+'-Uploader',options);
								uploader.push(fileUploader);
							}
							if("images"==v.inputType) {
								var options = {attachment:{fromId:v.configKey,type:v.configKey},isMul:true}
								var fileUploader = new FileUploader("#"+v.configKey+'-Uploader',options);
								uploader.push(fileUploader);
							}
						}
						
					});
				});
			},
			labelStrFun: function(info){//lablel字符串
				var returnStr = "";
				//非必填
				if("1"==info.isRequired){
					returnStr =['<span class="muted">*</span>',info.configKeyName,"："].join("");
				}else{
					returnStr =info.configKeyName+"："
				}
				return returnStr;
			},
			inputStrFun: function(info){//文本框字符串
				var isRequired = "";
				if(info.regex)
					isRequired = 'tip="'+info.prompt+'" reg="'+info.regex+'"';
				var returnStr = "";
				//单选框和复选框 
				if("radio"==info.inputType||"checkbox"==info.inputType){
					var inputTextArray = info["inputText"].split(",");
					var inputValueArray = info["inputValue"].split(",");
					var checkFlag = "";//是否选中
					var remarks = info.remarks?info.remarks:"";
					for(var i=0;i<inputTextArray.length;i++){
						//单选框是==,复选框是包含
						if(("radio"==info.inputType&&info.configKeyValue==inputValueArray[i])||("checkbox"==info.inputType&&info['configKeyValue'].indexOf(inputValueArray[i])!=-1)){
							checkFlag = 'checked="checked"';
						}else{
							checkFlag = '';
						}
						returnStr += ['<label class="',info.inputType,'">',
						             '	<input type="',info.inputType,'" name="',info.configKey,'" ',checkFlag,' value="',inputValueArray[i],'" />',
						             ' 		',inputTextArray[i],
						             '</label>'].join("");
					}
					returnStr +="&nbsp;&nbsp;"+remarks;
				}else if("input"==info.inputType){
					var remarks = info.remarks?info.remarks:"";
					returnStr ='<input type="text" class="form-control input-text ' +(info.isRequired=="1"? "required" : "")+ '" ' +isRequired+'  value="'+info.configKeyValue+'" name="'+info.configKey+'" />'+'<span class="help-block m-b-none" style="color:red">&nbsp;'+remarks+'</span>';
				}else if("select"==info.inputType){
					returnStr = '<select class="form-control" name="'+info.configKey+'" '+isRequired+' >'
					var inputTextArray = info["inputText"].split(",");
					var inputValueArray = info["inputValue"].split(",");
					var checkFlag = "";//是否选中
					for(var i=0;i<inputTextArray.length;i++){
						if(info.configKeyValue==inputValueArray[i]){
							selectFlag = 'selected="selected"';
						}else{
							selectFlag = '';
						}
						returnStr +='<option value="'+inputValueArray[i]+'" '+selectFlag+' >'+inputTextArray[i]+'</option>'
					}
					returnStr +='</select>'
				}else if("textarea"==info.inputType){
					returnStr = '<textarea class="form-control" '+isRequired+' name="'+info.configKey+'" style="height:100px;">'+info.configKeyValue+'</textarea>';
				}else if("datetime"==info.inputType){
					returnStr = '<input type="text" class="m-wrap Wdate" '+isRequired+'  value="'+info.configKeyValue+'" name="'+info.configKey+'" onclick="WdatePicker({dateFmt:\'HH\',})"/>'+info.remarks;
				}else if("file"==info.inputType || "images"==info.inputType){
					returnStr = '<div id="'+info.configKey+'-Uploader" style="position:relative" class="col-xs-12 col-sm-7 pl-0"></div><div class="col-xs-12 col-sm-3 valid-msg"></div>';
				}
				return returnStr;
			},
			fnRegisterEvent: function(){
				//提交按钮
				$(".btn").click(function(){
					configSvc.fnUpdate($("#configType").val());
				});
				$(".nav").find("li").click(function(){
					uploader = [];
					var setType = $(this).attr("data-type");
					$("#configType").val(setType);
					configSvc.addSysSetStr(setType);
				});
			}
	}

	//---------------------------------------界面初始化------------------------------------------------
	configSvc.fnRegisterEvent();
	$(".nav").find(".active").trigger("click");
});