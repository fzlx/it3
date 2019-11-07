$(function() {
	var genTemplateSvc = {
			url: {
				findGenTemplate: rootPath + "/gen/genTemplate/list?t="+new Date().getTime(),
				genTemplateForm: rootPath + "/gen/genTemplate/form?t="+new Date().getTime(),
				deletegenTemplate: rootPath + "/gen/genTemplate/delete?t="+new Date().getTime()
			},
			fnSave: function(){
				genTemplateSvc.fngenTemplateModal('新增用户信息');
			},
			fnDelete: function(list){
				Svc.AjaxJson.post(genTemplateSvc.url.deletegenTemplate,list,function(response){
					if(response && response.length==0){
						layer.msg('删除成功！');
						genTemplateTable.fnDraw();
					}else{
						layer.alert(response.join('<br/>'));
					}
				});
			},
			fnUpdate: function(info){
				genTemplateSvc.fngenTemplateModal('修改用户信息',info);
			},
			fnDetail: function(info){
				genTemplateSvc.fngenTemplateModal('查看用户信息',info);
			},
			fngenTemplateModal: function(title,info){
				API.fnShowForm({
					url: genTemplateSvc.url.genTemplateForm+(info?('&id='+info.id):''),
					title: title
				});
			},
			fnRegisterEvent: function(){
				// 组织机构显示隐藏
				if ($("#organTree").hasClass("open")) {
					$("#organTree-ico i").attr("class", "fa fa-caret-right");
				}
				$("#organTree-ico").on("click", function() {
					$("#organTree").toggleClass("open");
					$(this).find("i").toggleClass("fa-caret-left fa-caret-right");
					$(this).nextAll('.togglebodypart').find('.tableButton').toggleClass('pl-15');
				});
				// 刷新组织机构树
				$("#changeE").click(function() {
					fnReloadTree();
				});
				//搜索按钮
				$("#searchBtn").click(function(){
					var params = Svc.formToJson($("#genTemplateSearchForm"));
					params.companyId && (params.company = {id: params.companyId,name: params.companyName});
					params.officeId && (params.office = {id: params.officeId,name: params.officeName});
					genTemplateTable.reDrawParams = params;
					genTemplateTable.fnDraw();
				});
				//重置按钮
				$("#resetBtn").click(function(){
					Svc.resetForm($("#genTemplateSearchForm"));
				});
			}
	}

	//---------------------------------------用户列表------------------------------------------------
	var genTemplateTable = $('#datatables_genTemplate').dataTable({
			sAjaxSource: genTemplateSvc.url.findGenTemplate,
			fnServerData: fnServer(),
			oDTCheckbox: {
		        iColIndex:0
		    },
			aoColumnDefs: [
					{ aTargets: [ 0 ], mData: "id", sClass: "text-center", sTitle: "<input type='checkbox' class='TableCheckall'>",bSortable: false, sWidth: "20px"},
					{ aTargets: [ 1 ], mDataProp: "company", sTitle: "名称", mRender: function(v){
						return v.name;
					}},
					{ aTargets: [ 2 ], mDataProp: "office", sTitle: "分类", mRender: function(v){
						return v.name;
					}},
					{ aTargets: [ 3 ], mDataProp: "备注", sTitle: "用户名"},
					{ aTargets: [ 4 ], sClass: "opperColumn", sTitle: "操作", mData: function(data){
						var buttons = [];
						$.each(genTemplateTable.permission,function(i,perm){
							switch(perm){
							case 'sys:genTemplate:edit':
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
			oTableTools: {
				sRowSelect: "single",
				fnRowSelected:function(){
				},
				aButtons: [ 
				  		        { sExtends: "tiny", sButtonClass:"btn btn-success btn-sm hide", sButtonText: "新增", fnClick: function(nButton, oConfig) {
						         	 	genTemplateSvc.fnSave();
						        }},
						        { sExtends: "tiny", sButtonClass:"btn btn-danger btn-sm hide", sButtonText: "批量删除", fnClick: function(nButton, oConfig) {
							        	var info = DTCheckbox.fnGetInstance("datatables_genTemplate").selectData;
							        	var genTemplates = [];
							        	$.each(info,function(key,v){
							        		genTemplates.push({id: v.id,loginName: v.loginName});
							        	});
							        	if(genTemplates.length==0){
											 layer.msg('请选择要删除的记录。。', {icon: 5});
										}else{
											layer.confirm('确定删除已勾选的用户吗？', function(index){
												layer.close(index);
									        	genTemplateSvc.fnDelete(genTemplates);
											});
										}
					             }}]
			},
			initComplete: function( settings ){
				// 表格头部按钮权限
				$.each(genTemplateTable.permission,function(i,perm){
					switch(perm){
					case 'sys:genTemplate:edit':
						$('#ToolTables_datatables_genTemplate_0, #ToolTables_datatables_genTemplate_1').removeClass('hide');
						break;
					case 'permission:all':
						$('#ToolTables_datatables_genTemplate_0, #ToolTables_datatables_genTemplate_1').removeClass('hide');
						break;
					}
				});
			},
			drawCallback: function( settings ){
				// 查看按钮
				$('.Item-Detail').click(function(){
					var info = genTemplateTable.fnGetData($(this).parents("tr"));
					genTemplateSvc.fnDetail(info);
				});
				
				// 修改按钮
				$('.Item-Update').click(function(){
					var info = genTemplateTable.fnGetData($(this).parents("tr"));
					genTemplateSvc.fnUpdate(info);
				});
				
				// 删除按钮
				$('.Item-Delete').click(function(){
					var info = genTemplateTable.fnGetData($(this).parents("tr"));
					layer.confirm('确定删除用户【'+info.loginName+'】吗？', function(index){
						layer.close(index);
						genTemplateSvc.fnDelete([{id:info.id,loginName:info.loginName}]);
					});
				});
			}
		});
	
	//---------------------------------------界面初始化------------------------------------------------
	genTemplateSvc.fnRegisterEvent();
});