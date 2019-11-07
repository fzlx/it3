$(function(){
	var menuFormSvc = {
			url: {
				saveUser : rootPath + "/sys/menu/save?t="+new Date().getTime()
			},
			fnCommit: function(){
				
			},
			fnRegisterEvent: function(){
				// 取消按钮
				$('#formCancelBtn').click(function(){
					API.fnHideForm();
				});
			    // 表单验证
			    $("form[name='menuForm']").Validform({
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
			        	var menuJson = Svc.formToJson($("#menuForm"));
			        	menuJson.isShow?(menuJson.isShow = 1) : (menuJson.isShow = 0);
			        	Svc.AjaxForm.post(menuFormSvc.url.saveUser,menuJson,function(response){
			        		if(response == true){
			        			layer.alert('菜单保存成功！',function(index){
			        				API.fnHideForm();
			        				layer.close(index);
			        				//刷新菜单树
			        				var menutree = $("#fancytree_menu").data("menutree");
			        				var tree = menutree.fancytree("getTree");
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
			            return false;
			        }
			    });
			}
	}
	menuFormSvc.fnRegisterEvent();
})
