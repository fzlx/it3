$(function(){
	var fileUploader;
	var dictFormSvc = {
			url: {
				savedict : rootPath + "/sys/dict/save?t="+new Date().getTime()
			},
			fnCommit: function(){
				var dictJson = Svc.formToJson($("#dictForm"));
	        	Svc.AjaxForm.post(dictFormSvc.url.savedict,dictJson,function(response){
	        		if(response == true){
	        			layer.alert('保存成功！',function(index){
	        				$('#datatables_dict').dataTable().fnDraw();
	        				layer.close(index);
	        				API.fnHideForm('dictLayerForm');
	        			});
	        		}
	        	});
			},
			fnRegisterEvent: function(){
				// 头像
				var options = {btns:["picker","ctlBtn"],attachment:{fromId:$("#id").val(),type:"dictHead"},isMul:false}
				fileUploader = new FileUploader("#uploader",options);
				// 取消按钮
				$('#formCancelBtn').click(function(){
					API.fnHideForm('dictLayerForm');
				});
			    // 表单验证
			    $("form[name='dictForm']").Validform({
			        tiptype: function (msg, o, cssctl) {
			            var objtip = $(o.obj).closest(".form-group").children(".valid-msg");
			            cssctl(objtip, o.type);
			            objtip.text(msg);
			        },
			        beforeSubmit: function (curform) {
			        	dictFormSvc.fnCommit();
			            return false;
			        }
			    });
			}
	}
	dictFormSvc.fnRegisterEvent();
})