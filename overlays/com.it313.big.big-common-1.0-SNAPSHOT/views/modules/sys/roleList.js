$(function() {
	var roleSvc = {
			url: {
				findRole : rootPath + "/sys/role/list?t="+new Date().getTime(),
				deleteRole : rootPath + "/sys/role/delete?t="+new Date().getTime(),
				roleForm : rootPath + "/sys/role/form?t="+new Date().getTime()
			},
			fnSaveRole: function(){
				if(organTree.getSelectedNodes().length>0 && organTree.getSelectedNodes()[0].id != 'allcontent'){
					var treeNode = organTree.getSelectedNodes()[0];
					roleSvc.fnRoleModal('角色信息', {'org.id': treeNode.id});
				}else{
					roleSvc.fnRoleModal('角色信息', {});
				}
			},
			fnDelete: function(list){
				Svc.AjaxJson.post(roleSvc.url.deleteRole,list,function(response){
					if(response && response.length==0){
						layer.msg('删除成功！');
						roleTable.fnDraw();
					}else{
						layer.alert(response.join('<br/>'));
					}
				});
			},
			fnUpdate: function(info){
				roleSvc.fnRoleModal('角色信息',{id: info.id});
			},
			fnDetail: function(info){
				roleSvc.fnRoleModal('角色信息',{id: info.id});
			},
			fnRoleModal: function(title,params){
				API.fnShowForm({
					id: 'roleLayerForm',
					url: roleSvc.url.roleForm,
					title: title,
					params: params
				});
			},
			fnRegisterEvent: function(){
				// 刷新组织机构树
				$("#changeE").click(function() {
					fnReloadTree(function(){
						$("#searchBtn").trigger('click');
					});
				});
				//搜索按钮
				$("#searchBtn").click(function(){
					var params = Svc.formToJson($("#roleSearchForm"));
					params.name && (params.name = "%"+params.name+"%");
					if(organTree && organTree.getSelectedNodes().length>0 && organTree.getSelectedNodes()[0].id != 'allcontent'){
						var treeNode = organTree.getSelectedNodes()[0];
						params.org = {leftValue: treeNode.leftValue, rightValue: treeNode.rightValue};
					}
					roleTable.reDrawParams = params;
					roleTable.fnDraw();
				});
			}
	}

	//---------------------------------------角色列表------------------------------------------------
	var roleTable = $('#datatables_role').dataTable({
			sAjaxSource : roleSvc.url.findRole,
			fnServerData : fnServer(),
			oDTCheckbox: {
		        iColIndex :0
		    },
			aoColumnDefs : [
					{ aTargets : [ 0 ], mData : "id", sClass : "text-center", sTitle : "<input type='checkBox' class='TableCheckall'>",bSortable: false, sWidth : "20px"},
					{ aTargets : [ 1 ], mDataProp : "name", sTitle : "角色名称", mRender: function(v){
						return '<a class="Item-Detail">'+v+'</a>'
					}},
					{ aTargets : [ 2 ], mDataProp : "org.name", sTitle : "归属机构", mRender: function(v){
						return v||'-';
					}},
					{ aTargets : [ 3 ], mDataProp : "dataScopeLab", sTitle : "数据范围"},
					{ aTargets : [ 4 ], mDataProp: "email", sTitle: "邮箱", mRender: function(v){
						return v||'-';
					}},
					{ aTargets: [ 5 ], sClass: "opperColumn", sTitle: "操作", mData: function(data){
						var buttons = [];
						$.each(roleTable.permission,function(i,perm){
							switch(perm){
							case 'sys:role:edit':
  								buttons.push('<a class="Item-Update" href="javascript:;"><i class="fa fa-edit"></i>修改</a>','<a class="Item-Delete" href="javascript:;"><i class="fa fa-trash"></i>删除</a>');
  								break;
							case 'permission:all':
								buttons.push('<a class="Item-Update" href="javascript:;"><i class="fa fa-edit"></i>修改</a>','<a class="Item-Delete" href="javascript:;"><i class="fa fa-trash"></i>删除</a>');
								break;
							}
						});
						return buttons.join('&nbsp;&nbsp;');
					}}
				],
			initComplete: function( settings ){
				// 表格头部按钮权限
				$.each(roleTable.permission,function(i,perm){
					switch(perm){
					case 'sys:role:edit':
					case 'permission:all':
						$('#addRole, #batchDeleteRole').removeClass('hide');
						$('#addRole').click(function(){
							roleSvc.fnSaveRole();
						});
						$('#batchDeleteRole').click(function(){
							var info = DTCheckbox.fnGetInstance("datatables_role").selectData;
							if($.isEmptyObject(info)){
								 layer.msg('请选择要删除的记录。。');
								 return;
							}
							layer.confirm('确定批量删除所勾选的角色？', function(index){
								layer.close(index);
								var roles = [];
								$.each(info, function(i, role){
									roles.push({id: role.id});
								})
								roleSvc.fnDelete(roles);
							});
						});
						break;
					}
				});
			},
			drawCallback: function( settings ){
				// 查看按钮
				$('.Item-Detail').click(function(){
					var info = roleTable.fnGetData($(this).parents("tr"));
					roleSvc.fnDetail(info);
				});
				
				// 修改按钮
				$('.Item-Update').click(function(){
					var info = roleTable.fnGetData($(this).parents("tr"));
					roleSvc.fnUpdate(info);
				});
				
				// 删除按钮
				$('.Item-Delete').click(function(){
					var info = roleTable.fnGetData($(this).parents("tr"));
					layer.confirm('确定删除角色【'+info.name+'】吗？', function(index){
						layer.close(index);
						roleSvc.fnDelete([{id:info.id,loginName:info.loginName}]);
					});
				});
			}
		});
	//---------------------------------------左侧组织机构树------------------------------------------------
	var organTree;
	function fnTreeClick(event, treeId, treeNode){
		$("#searchBtn").trigger('click');
	};
	var treeSetting= {
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: fnTreeClick,
		}
	};
	function fnReloadTree(callback){
		Svc.AjaxForm.get($("#organTreeUl").attr("data-url"),{},function(data){
			data.splice(0, 0, {id: "allcontent",pId: 0, name: "全部", add: true });
			try {
				organTree.destroy();
			} catch (e) {
			}
			organTree = $.fn.zTree.init($("#organTreeUl"), treeSetting, data);
			callback && callback();
		});
	};
	//---------------------------------------界面初始化------------------------------------------------
	fnReloadTree();
	roleSvc.fnRegisterEvent();
});