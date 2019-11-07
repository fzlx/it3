$(function(){
	var roleFormSvc = {
			url: {
				saveRole : rootPath + "/sys/role/save?t="+new Date().getTime()
			},
			fnCommit: function(){
				var tree=$.fn.zTree.getZTreeObj("menuTree");
				var tree2=$.fn.zTree.getZTreeObj("orgTree");
				var ids = [], nodes = tree.getCheckedNodes(true);
				for(var i=0; i<nodes.length; i++) {
					ids.push(nodes[i].id);
				}
				$("#menuIds").val(ids);
				var ids2 = [], nodes2 = tree2.getCheckedNodes(true);
				for(var i=0; i<nodes2.length; i++) {
					ids2.push(nodes2[i].id);
				}
				$("#orgIds").val(ids2);
				var roleJson = Svc.formToJson($("#roleForm"));
	        	roleJson.loginFlag == 'on' ? (roleJson.loginFlag = 1) : (roleJson.loginFlag = 0);
	        	Svc.AjaxForm.post(roleFormSvc.url.saveRole,roleJson,function(response){
	        		if(response == true){
	        			layer.alert('角色保存成功！',function(index){
	        				$('#datatables_role').dataTable().fnDraw();
	        				layer.close(index);
	        				API.fnHideForm('roleLayerForm');
	        			});
	        		}
	        	});
			},
			fnRegisterEvent: function(){
				// 取消按钮
				$('#formCancelBtn').click(function(){
					API.fnHideForm('roleLayerForm');
				});
			    // 表单验证
			    $("form[name='roleForm']").Validform({
			        tiptype: function (msg, o, cssctl) {
			            var objtip = $(o.obj).closest(".form-group").children(".valid-msg");
			            cssctl(objtip, o.type);
			            objtip.text(msg);
			        },
			        beforeCheck: function (curform) {
			            //在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			            //这里明确return false的话将不会继续执行验证操作;
			        },
			        beforeSubmit: function (curform) {
			            // TODO 保存方法
			        	roleFormSvc.fnCommit();
			            return false;
			        }
			    });
			}
	}
	roleFormSvc.fnRegisterEvent();
})