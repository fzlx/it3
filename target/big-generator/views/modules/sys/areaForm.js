$(function(){
	var areaFormSvc = {
			url: {
				saveArea : rootPath + "/sys/area/save?t="+new Date().getTime()
			},
			fnCommit: function(){
				var areaJson = Svc.formToJson($("#areaForm"));
	        	Svc.AjaxForm.post(areaFormSvc.url.saveArea,areaJson,function(response){
	        		if(response == true){
	        			layer.alert('区域保存成功！',function(index){
	        				API.fnHideForm();
	        				layer.close(index);
	        				//刷新区域树
	        				var areatree = $("#fancytree_area").data("areatree");
	        				var tree = areatree.fancytree("getTree");
	        				$(tree.tbody).empty();
							tree.activeNode = null;
							tree.focusNode = null; 
							tree.rootNode.children = null;
							tree.reload();
	        			});
	        		}else{
	        			layer.alert(response);
	        		}
	        	});
			},
			fnRegisterEvent: function(){
				// 取消按钮
				$('#formCancelBtn').click(function(){
					API.fnHideForm();
				});
				// 下拉框
			    $("#areaForm select.select2").select2();
			    // 表单验证
			    $("form[name='areaForm']").Validform({
			        tiptype: function (msg, o, cssctl) {
			            var objtip = $(o.obj).closest(".form-group").children(".valid-msg");
			            cssctl(objtip, o.type);
			            objtip.text(msg);
			        },
			        beforeSubmit: function (curform) {
			            // TODO 保存方法
			            areaFormSvc.fnCommit();
			            return false;
			        }
			    });
			}
	}
	areaFormSvc.fnRegisterEvent();
})
