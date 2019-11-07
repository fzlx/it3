$(function() {
	var officeSvc = {
			url: {
				findOffice: rootPath + "/sys/office/list?t="+new Date().getTime(),
				officeForm: rootPath + "/sys/office/form?t="+new Date().getTime(),
				deleteOffice: rootPath + "/sys/office/delete?t="+new Date().getTime()
			},
			fnSave: function(){
				officeSvc.fnOfficeModal('新增机构信息');
			},
			fnDelete: function(list){
				Svc.AjaxJson.post(officeSvc.url.deleteOffice,list,function(response){
					if(response == true){
						layer.msg('删除成功！');
						officeTable.fnDraw();
						fnReloadTree();
					}
				});
			},
			fnUpdate: function(info){
				officeSvc.fnOfficeModal('修改机构信息',info);
			},
			fnDetail: function(info){
				officeSvc.fnOfficeModal('查看机构信息',info);
			},
			fnOfficeModal: function(title,info){
				API.fnShowForm({
					url: officeSvc.url.officeForm+(info?('&id='+info.id):''),
					title: title
				});
			},
			fnRegisterEvent: function(){
				// 机构显示隐藏
				if ($("#organTree").hasClass("open")) {
					$("#organTree-ico i").attr("class", "fa fa-caret-right");
				}
				$("#organTree-ico").on("click", function() {
					$("#organTree").toggleClass("open");
					$(this).find("i").toggleClass("fa-caret-left fa-caret-right");
					$(this).nextAll('.togglebodypart').find('.tableButton').toggleClass('pl-15');
				});
				// 刷新机构树
				$("#changeE").click(function() {
					fnReloadTree();
				});
			}
	}

	//---------------------------------------机构列表------------------------------------------------
	var officeTable = $('#datatables_office').dataTable({
			oDTCheckbox: {
		        iColIndex:0
		    },
			sAjaxSource: officeSvc.url.findOffice,
			fnServerData: fnServer({parent: {id: 0}}),
			aoColumnDefs: [
					{ aTargets: [ 0 ], mData: "id", sClass: "text-center", sTitle: "<input type='checkbox' class='TableCheckall'>",bSortable: false, sWidth: "20px"},
					{ aTargets: [ 1 ], mDataProp: "name", sTitle: "机构名称", mRender: function(v){
						return '<a class="Item-Detail" href="javascript:;">'+v+'</a>';
					}},
					{ aTargets: [ 2 ], mDataProp: "area", sTitle: "归属区域", mRender: function(v){
						return v.name;
					}},
					{ aTargets: [ 3 ], mDataProp: "code", sTitle: "机构编码", mRender: function(v){
						return v||'-';
					}},
					{ aTargets: [ 4 ], mDataProp: "type", sTitle: "机构类型", mRender: function(v){
						return sys_office_type[v]||'-';
					}},
					{ aTargets: [ 5 ], mDataProp: "remarks", sTitle: "备注", mRender: function(v){
						return v||'-';
					}},
					{ aTargets: [ 6 ], sClass: "opperColumn", sTitle: "操作", mData: function(data){
						var buttons = [];
						$.each(officeTable.permission,function(i,perm){
							switch(perm){
							case 'sys:office:edit':
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
						         	 	officeSvc.fnSave();
						        }},
						        { sExtends: "tiny", sButtonClass:"btn btn-danger btn-sm hide", sButtonText: "批量删除", fnClick: function(nButton, oConfig) {
							        	var info = DTCheckbox.fnGetInstance("datatables_office").selectData;
							        	if($.isEmptyObject(info)){
							        		layer.msg('请选择要删除的记录。。', {icon: 5});
							        		return;
							        	}
										layer.confirm('确定删除已勾选的机构及所有子机构项吗？', function(index){
											layer.close(index);
											var offices = [];
								        	$.each(info,function(key,v){
								        		offices.push({id: v.id});
								        	});
								        	officeSvc.fnDelete(offices);
										});
					             }}]
			},
			initComplete: function( settings ){
				// 表格头部按钮权限
				$.each(officeTable.permission,function(i,perm){
					switch(perm){
					case 'sys:office:edit':
						$('#ToolTables_datatables_office_0, #ToolTables_datatables_office_1').removeClass('hide');
						break;
					case 'permission:all':
						$('#ToolTables_datatables_office_0, #ToolTables_datatables_office_1').removeClass('hide');
						break;
					}
				});
			},
			drawCallback: function( settings ){
				// 查看按钮
				$('.Item-Detail').click(function(){
					var info = officeTable.fnGetData($(this).parents("tr"));
					officeSvc.fnDetail(info);
				});
				
				// 修改按钮
				$('.Item-Update').click(function(){
					var info = officeTable.fnGetData($(this).parents("tr"));
					officeSvc.fnUpdate(info);
				});
				
				// 删除按钮
				$('.Item-Delete').click(function(){
					var info = officeTable.fnGetData($(this).parents("tr"));
					layer.confirm('确定删除机构【'+info.name+'】及所有子机构项吗？', function(index){
						layer.close(index);
						officeSvc.fnDelete([{id:info.id}]);
					});
				});
			}
		});
	//---------------------------------------左侧机构树------------------------------------------------
	var organTree;
	function fnTreeClick(event, treeId, treeNode){
		officeTable.reDrawParams = {parent: {id: treeNode.pId||0}};
		officeTable.fnDraw();
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
			data.splice(0, 0, {id: "allcontent",pId: 0, name: "", add: true });
			try {
				organTree.destroy();
			} catch (e) {
			}
			organTree = $.fn.zTree.init($("#organTreeUl"), treeSetting, data);
			callback && callback();
		});
	};
	window.fnOfficeReloadTree = fnReloadTree;
	//---------------------------------------界面初始化------------------------------------------------
	fnReloadTree();
	officeSvc.fnRegisterEvent();
});