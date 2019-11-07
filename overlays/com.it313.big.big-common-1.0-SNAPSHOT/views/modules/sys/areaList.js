$(function() {
	var initParam = {paginate:{menuId:currentMenuId}};
	var areaSvc = {
			url : {
					areaList : rootPath + "/sys/area/list?t=" + new Date().getTime(),
					areaForm : rootPath + "/sys/area/form?t="+new Date().getTime(),
					delArea  : rootPath + "/sys/area/delete?t="+new Date().getTime(),
					updateSort : rootPath + "/sys/area/updateSort?t="+new Date().getTime()
			},
			fnTreeReload : function(params){//重新加载表格树
				if(!params)
					params = initParam;
				else
					$.extend(params,initParam);
				var tree = areaTree.fancytree("getTree");
				$(tree.tbody).empty();
				tree.activeNode = null;
				tree.focusNode = null;
				tree.rootNode.children = null;
				tree.options.ajax.data=params;
				tree.reload();
			},
			fnSave: function(){
				areaSvc.fnAreaModal('新增区域');
			},
			fnUpdate:function(id){
				areaSvc.fnAreaModal('修改区域',{id: id});
			},
			fnDel:function(id){
				Svc.AjaxForm.post(areaSvc.url.delArea+"&id="+id,{},function(data){
					layer.alert("删除成功",function(index){
						layer.close(index);
						areaSvc.fnTreeReload();
					})
				});
			},
			fnDetail:function(id){
				areaSvc.fnAreaModal('查看区域',{id: id});
			},
			fnAreaModal: function(title,info){
				API.fnShowForm({
					url: areaSvc.url.areaForm+(info?('&id='+info.id):''),
					title: title
				});
			}
	}
	
	/**
	 * 表格树
	 */
	var areaTree = $("#fancytree_area").fancytree({
		extensions: ["table"],
		checkbox: false,
	    selectMode: 3,
	    expanded:true,
		table: {
			title:"区域信息",
			toolBar:[{name:"新增",className:"btn-success",id:"savaBtn",onClick:function(data){
						areaSvc.fnSave();
					}}],
			columns:[ 
			         {key : "name", title:"区域"},
			         {key : "code", title:"区域编码"},
			         {key : "type",title:"区域类型",fnRender:function(text,td,rowData,col){
			         	return text;
			         }},
			         {key : "permission", title:"操作",fnRender:function(text,td,rowData,col,permission){
			         	var str = '<a data-id="'+rowData.id+'" class="Item-Detail" href="javascript:;" style="margin-right:5px"><i class="fa fa-eye"></i>查看</a>';
			         	$.each(permission,function(i,perm){
							switch(perm){
							case 'sys:area:edit':
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
			url: areaSvc.url.areaList,
			isSimple:true,
			key:{pid:"parentId"}
		},
		init:function(event, ctx){
			$("#savaBtn").hide();
			$("#updateSortBtn").hide();
			var permission = ctx.options.permission;
			$.each(permission,function(i,perm){
				switch(perm){
				case 'sys:area:edit':
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
		$("#fancytree_area").delegate(".Item-Update","click",function(){
			var that = $(this);
			areaSvc.fnUpdate(that.attr("data-id"));
		})
		//删除
		$("#fancytree_area").delegate(".Item-Del","click",function(){
			var that = $(this);
			layer.confirm('确定要删除该区域', {icon: 3, title:'提示'}, function(index){
				areaSvc.fnDel(that.attr("data-id"));
				layer.close(index);
			});
			
		});
		//详情
		$("#fancytree_area").delegate(".Item-Detail","click",function(){
			var that = $(this);
			areaSvc.fnDetail(that.attr("data-id"));
		})
		
		//把areatree放进table里面
		$("#fancytree_area").removeData("areatree");
		$("#fancytree_area").data("areatree",areaTree);
	}
	initPage();
});