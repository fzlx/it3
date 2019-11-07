$(function() {
	var roleSvc = {
			url: {
				findRole : rootPath + "/sys/role/list?t="+new Date().getTime(),
				deleteRole : rootPath + "/sys/role/delete?t="+new Date().getTime(),
				RoleForm : rootPath + "/sys/role/form?t="+new Date().getTime()
			},
			fnSaveRole: function(){
				roleSvc.fnRoleModal('新增角色信息');
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
				roleSvc.fnRoleModal('修改角色信息',info);
			},
			fnDetail: function(info){
				roleSvc.fnRoleModal('查看角色信息',info);
			},
			fnRoleModal: function(title,info){
				API.fnShowForm({
					url: roleSvc.url.RoleForm+(info?('&id='+info.id):''),
					title: title
				});
			},
			fnRegisterEvent: function(){
				//搜索按钮
				$("#searchBtn").click(function(){
					var params = Svc.formToJson($("#roleSearchForm"));
					params.name && (params.name = "%"+params.name+"%");
					params.officeId && (params.office = {id: params.officeId,name: params.officeName});
					roleTable.reDrawParams = params;
					roleTable.fnDraw();
				});
				//重置按钮
				$("#resetBtn").click(function(){
					Svc.resetForm($("#roleSearchForm"));
				});
			}
	}

	//---------------------------------------用户列表------------------------------------------------
	var roleTable = $('#datatables_role').dataTable({
			sAjaxSource : roleSvc.url.findRole,
			fnServerData : fnServer(),
			oDTCheckbox: {
		        iColIndex :0
		    },
			aoColumnDefs : [
					{ aTargets : [ 0 ], mData : "id", sClass : "text-center", sTitle : "<input type='checkBox' class='TableCheckall'>",bSortable: false, sWidth : "20px"},
					{ aTargets : [ 1 ], mDataProp : "name", sTitle : "角色名称"},
					{ aTargets : [ 2 ], mDataProp : "office.name", sTitle : "归属机构", mRender: function(v){
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
			oTableTools : {
				sRowSelect : "single",
				fnRowSelected:function(){
				},
				aButtons : [ 
				  		        { sExtends : "tiny", sButtonClass:"btn btn-success btn-sm", sButtonText : "新增", fnClick : function(nButton, oConfig) {
						         	 	roleSvc.fnSaveRole();
						        }},
						        { sExtends : "tiny", sButtonClass:"btn btn-danger btn-sm", sButtonText : "批量删除", fnClick : function(nButton, oConfig) {
							        	var info = DTCheckbox.fnGetInstance("datatables_Role").selectData;
							        	if($.isEmptyObject(info)){
											 layer.msg('请选择要删除的记录。。', {icon: 5});
											 return;
										}
							        	roleSvc.fnDelRole(info);
					             }}]
			},
			initComplete: function( settings ){
				// 表格头部按钮权限
				$.each(roleTable.permission,function(i,perm){
					switch(perm){
					case 'sys:role:edit':
						$('#ToolTables_datatables_role_0, #ToolTables_datatables_role_1').removeClass('hide');
						break;
					case 'permission:all':
						$('#ToolTables_datatables_role_0, #ToolTables_datatables_role_1').removeClass('hide');
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
	roleSvc.fnRegisterEvent();
});