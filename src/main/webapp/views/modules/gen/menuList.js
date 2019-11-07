$(function() {
	var initParam = {paginate:{
			 			menuId:currentMenuId
			 		}};
	var menuSvc = {
			url : {
						menuList : rootPath + "/sys/menu/list?t=" + new Date().getTime(),
						menuForm : rootPath + "/sys/menu/form?t="+new Date().getTime(),
						delMenu  : rootPath + "/sys/menu/delete?t="+new Date().getTime(),
					  updateSort : rootPath + "/sys/menu/updateSort?t="+new Date().getTime()
			},
			fnTreeReload : function(params){//重新加载表格树
				if(!params)
					params = initParam;
				else
					$.extend(params,initParam);
				var tree = menuTree.fancytree("getTree");
				$(tree.tbody).empty();
				tree.activeNode = null;
				tree.focusNode = null; 
				tree.rootNode.children = null;
				tree.options.ajax.data=params;
				tree.reload();
			},
			fnSave: function(){
				menuSvc.fnMenuModal('新增菜单');
			},
			fnUpdate:function(id){
				menuSvc.fnMenuModal('修改菜单',{id: id});
			},
			fnDel:function(id){
				Svc.AjaxForm.post(menuSvc.url.delMenu+"&id="+id,{},function(data){
					layer.alert("删除成功",function(index){
						layer.close(index);
						menuSvc.fnTreeReload();
					})
				});
			},
			fnDetail:function(id){
				menuSvc.fnMenuModal('查看菜单',{id: id});
			},
			fnMenuModal: function(title,info){
				API.fnShowForm({
					url: menuSvc.url.menuForm+(info?('&id='+info.id):''),
					title: title
				});
			},
			fnUpdateSort:function(){
				var menuIndexJson = Svc.formToJson($("#menuIndexForm"));
				menuIndexJson.ids = menuIndexJson.id;
				menuIndexJson.sorts = menuIndexJson.sort;
				delete menuIndexJson.id;
				delete menuIndexJson.sort;
				console.log(menuIndexJson)
				Svc.AjaxForm.post(menuSvc.url.updateSort,menuIndexJson,function(data){
					if(data==true){
						layer.alert("保存菜单排序成功!",function(index){
							layer.close(index);
						})
					}
				});
			}
	}
	
	/**
	 * 表格树
	 */
	var menuTree = $("#fancytree_menu").fancytree({
		extensions: ["table"],
		checkbox: false,
	    selectMode: 3,
	    expanded:true,
		table: {
			title:"组织机构信息",
			toolBar:[{name:"新增",className:"btn-success",id:"savaBtn",onClick:function(data){
						menuSvc.fnSave();
					}},
					{name:"批量修改顺序",className:"btn-danger",id:"updateSortBtn",onClick:function(){
						menuSvc.fnUpdateSort();
					}}],
			columns:[ 
			         {key : "name", title:"组织机构"},
			         {key : "href", title:"链接"},
			         {key : "sort", title:"排序",width:"60px",fnRender:function(text,td,rowData,col){
			         	return "<input type='hidden' name='id' value='"+rowData.id+"' /><input type='input' class='form-control input-sm' name='sort' value='"+rowData.sort+"' />";
			         }},
			         {key : "isShow",title:"可见",fnRender:function(text,td,rowData,col){
			         	if("1"==rowData.isShow){
			         		return "显示";
			         	}else{
			         		return "隐藏";
			         	}
			         }},
			         {key : "permission", title:"权限标识"},
			         {key : "permission", title:"操作",fnRender:function(text,td,rowData,col,permission){
			         	var str = '<a data-id="'+rowData.id+'" class="Item-Detail" href="javascript:;" style="margin-right:5px"><i class="fa fa-eye"></i>查看</a>';
			         	$.each(permission,function(i,perm){
							switch(perm){
							case 'sys:menu:edit':
  								str +='<a data-id="'+rowData.id+'" class="Item-Del" href="javascript:;" style="margin-right:5px"><i class="fa fa-trash"></i>删除</a>'+
										'<a data-id="'+rowData.id+'" class="Item-Update" href="javascript:;" style="margin-right:5px"><i class="fa fa-edit"></i>编辑</a>';
								break;
							case 'permission:all':
  								str +='<a data-id="'+rowData.id+'" class="Item-Del" href="javascript:;" style="margin-right:5px"><i class="fa fa-trash"></i>删除</a>'+
										'<a data-id="'+rowData.id+'" class="Item-Update" href="javascript:;" style="margin-right:5px"><i class="fa fa-edit"></i>编辑</a>';
								break;
							}
						});
			        	return  str;
			         }}
			         ]
		},
		ajax:{
			type:"post",
			data:initParam
		},
		source: {
			url: menuSvc.url.menuList,
			isSimple:true,
			key:{pid:"parentId"}
		},
		init:function(event, ctx){
			$("#savaBtn").hide();
			$("#updateSortBtn").hide();
			var permission = ctx.options.permission;
			$.each(permission,function(i,perm){
				switch(perm){
				case 'sys:menu:edit':
					$("#savaBtn").show();
					$("#updateSortBtn").show();
					break;
				case 'permission:all':
					$("#savaBtn").show();
					$("#updateSortBtn").show();
					break;
				}
			});
		}
	});
	function initPage(){
		//更新
		$("#fancytree_menu").delegate(".Item-Update","click",function(){
			var that = $(this);
			menuSvc.fnUpdate(that.attr("data-id"));
		})
		//删除
		$("#fancytree_menu").delegate(".Item-Del","click",function(){
			var that = $(this);
			layer.confirm('确定要删除该菜单', {icon: 3, title:'提示'}, function(index){
				menuSvc.fnDel(that.attr("data-id"));
				layer.close(index);
			});
			
		});
		//详情
		$("#fancytree_menu").delegate(".Item-Detail","click",function(){
			var that = $(this);
			menuSvc.fnDetail(that.attr("data-id"));
		})
		
		//把menutree放进table里面
		$("#fancytree_menu").removeData("menutree");
		$("#fancytree_menu").data("menutree",menuTree);
	}
	initPage();
});