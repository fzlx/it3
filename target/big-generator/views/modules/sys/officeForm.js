$(function(){
	var officeFormSvc = {
			url: {
				saveOffice : rootPath + "/sys/office/save?t="+new Date().getTime()
			},
			fnCommit: function(){
				var officeJson = Svc.formToJson($("#officeForm"));
	        	officeJson.useable == 'on' ? (officeJson.useable = 1) : (officeJson.useable = 0);
	        	Svc.AjaxForm.post(officeFormSvc.url.saveOffice,officeJson,function(response){
	        		if(response == true){
	        			layer.alert('保存机构'+officeJson.name+'成功！',function(index){
	        				$('#datatables_office').dataTable().fnDraw();
	        				window.fnOfficeReloadTree();
	        				layer.close(index);
	        				API.fnHideForm();
	        			});
	        		}
	        	});
			},
			fnRegisterEvent: function(){
				// 取消按钮
				$('#formCancelBtn').click(function(){
					API.fnHideForm();
				});
				// 下拉框
			    $("#officeForm select.select2").select2();
			    // 表单验证
			    $("form[name='officeForm']").Validform({
			        tiptype: function (msg, o, cssctl) {
			            var objtip = $(o.obj).closest(".form-group").children(".valid-msg");
			            cssctl(objtip, o.type);
			            objtip.text(msg);
			        },
			        beforeSubmit: function (curform) {
			            // TODO 保存方法
			        	officeFormSvc.fnCommit();
			            return false;
			        }
			    });
			}
	}
	// init
	officeFormSvc.fnRegisterEvent();
})