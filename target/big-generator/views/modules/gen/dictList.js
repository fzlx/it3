$(function() {
	var dictSvc = {
			url: {
				findDict: rootPath + "/sys/dict/list?t="+new Date().getTime(),
				dictForm: rootPath + "/sys/dict/form?t="+new Date().getTime(),
				deletedict: rootPath + "/sys/dict/delete?t="+new Date().getTime()
			},
			fnSave: function(){
				dictSvc.fndictModal('新增字典信息');
			},
			fnDelete: function(list){
				Svc.AjaxJson.post(dictSvc.url.deletedict,list,function(response){
					if(response){
						layer.msg('删除成功！');
						dictTable.fnDraw();
					}else{
						layer.alert('删除失败！');
					}
				});
			},
			fnUpdate: function(info){
				dictSvc.fndictModal('修改字典信息',info);
			},
			fnDetail: function(info){
				dictSvc.fndictModal('查看字典信息',info);
			},
			fndictModal: function(title,info){
				API.fnShowForm({
					url: dictSvc.url.dictForm+(info?('&id='+info.id):''),
					title: title
				});
			},
			fnRegisterEvent: function(){
				//搜索按钮
				$("#searchBtn").click(function(){
					var params = Svc.formToJson($("#dicSearchForm"));
					params.description&&(params.description="%"+params.description+"%");
					dictTable.reDrawParams = params;
					dictTable.fnDraw();
				});
				//重置按钮
				$("#resetBtn").click(function(){
					Svc.resetForm($("#dicSearchForm"));
				});
				$("#dicSearchForm select.select2").select2();
			}
	}
	//---------------------------------------字典列表------------------------------------------------
	var dictTable = $('#datatables_dict').dataTable({
			sAjaxSource: dictSvc.url.findDict,
			fnServerData: fnServer(),
			oDTCheckbox: {
		        iColIndex:0
		    },
			aoColumnDefs: [
					{ aTargets: [ 0 ], mData: "id", sClass: "text-center", sTitle: "<input type='checkbox' class='TableCheckall'>",bSortable: false, sWidth: "20px"},
					{ aTargets: [ 1 ], mDataProp: "value", sTitle: "键值", mRender: function(v){
						return v;
					}},
					{ aTargets: [ 2 ], mDataProp: "label", sTitle: "标签", mRender: function(v){
						return v;
					}},
					{ aTargets: [ 3 ], mDataProp: "type", sTitle: "类型", mRender: function(v){
						return '<a class="Item-Detail" href="javascript:;">'+v+'</a>';
					}},
					{ aTargets: [ 4 ], mDataProp: "description", sTitle: "	描述"},
					{ aTargets: [ 5 ], mDataProp: "sort", sTitle: "排序", mRender: function(v){
						return v||'-';
					}},
					{ aTargets: [ 6 ], sClass: "opperColumn", sTitle: "操作", mData: function(data){
						var buttons = [];
						var buttons = [];
						$.each(dictTable.permission,function(i,perm){
							switch(perm){
							case 'sys:dict:edit':
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
					         	 	dictSvc.fnSave();
					        }},
					        { sExtends: "tiny", sButtonClass:"btn btn-danger btn-sm hide", sButtonText: "批量删除", fnClick: function(nButton, oConfig) {
						        	var info = DTCheckbox.fnGetInstance("datatables_dict").selectData;
						        	var dicts = [];
						        	$.each(info,function(key,v){
						        		dicts.push({id: v.id});
						        	});
						        	if(dicts.length==0){
										 layer.msg('请选择要删除的记录。。', {icon: 5});
									}else{
										layer.confirm('确定删除已勾选的记录吗？', function(index){
											layer.close(index);
								        	dictSvc.fnDelete(dicts);
										});
									}
				             }}]
			},
			initComplete: function( settings ){
				// 表格头部按钮权限
				$.each(dictTable.permission,function(i,perm){
					switch(perm){
					case 'sys:dict:edit':
						$('#ToolTables_datatables_dict_0, #ToolTables_datatables_dict_1').removeClass('hide');
						break;
					case 'permission:all':
						$('#ToolTables_datatables_dict_0, #ToolTables_datatables_dict_1').removeClass('hide');
						break;
					}
				});
			},
			drawCallback: function( settings ){
				// 查看按钮
				$('.Item-Detail').click(function(){
					var info = dictTable.fnGetData($(this).parents("tr"));
					dictSvc.fnDetail(info);
				});
				
				// 修改按钮
				$('.Item-Update').click(function(){
					var info = dictTable.fnGetData($(this).parents("tr"));
					dictSvc.fnUpdate(info);
				});
				
				// 删除按钮
				$('.Item-Delete').click(function(){
					var info = dictTable.fnGetData($(this).parents("tr"));
					layer.confirm('确定删除字典【'+info.label+'】吗？', function(index){
						layer.close(index);
						dictSvc.fnDelete([{id:info.id}]);
					});
				});
			}
		});
	
	//---------------------------------------界面初始化------------------------------------------------
	dictSvc.fnRegisterEvent();
});