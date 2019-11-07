<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pageform"/>
<body>
	<form id="roleForm" name="roleForm" action="javascript:void(0);" action="${ctx}/sys/role/save" class="form form-horizontal">
		<input type="hidden" id="id" name="id" value="${role.id }">
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">归属机构${menu.id}:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			 <sys:treeselect id="org" name="org.id" value="${role.org.id}" labelName="org.name" labelValue="${role.org.name}"
					title="机构" url="/sys/org/treeData" cssClass="required" datatype="*" nullmsg="归属机构不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">角色名称:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input id="oldName" name="oldName" type="hidden" value="${role.name}">
				<input type="text" name="name" id="name" value="${role.name}" placeholder="角色名称" class="form-control input-text" datatype="*1-50" nullmsg="名称不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">英文名称:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    	<input id="oldEnname" name="oldEnname" type="hidden" value="${role.enname}">
			<input type="text" name="enname" id="enname" value="${role.enname }" placeholder="英文名称" class="form-control input-text" datatype="*1-50" nullmsg="英文名称不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">角色类型:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<select name="roleType" class="form-control"  datatype="*" nullmsg="角色类型不能为空！">
					<option value="user" <c:if test="${role.roleType=='user'}"> selected</c:if>>普通角色</option>
					<option value="security-role" <c:if test="${'security-role' == role.roleType}"> selected</c:if>>管理角色</option>
					<option value="assignment" <c:if test="${'assignment' == role.roleType}"> selected</c:if>>任务分配</option>
			</select>
			<span class="help-block m-b-none" title="activiti有3种预定义的组类型:security-role、assignment、user 如果使用Activiti Explorer，需要security-role才能看到manage页签，需要assignment才能claim任务">工作流组用户组类型（任务分配:assignment、管理角色:security-role、普通角色:user）</span>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">是否系统数据:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<c:forEach items="${fns:getDictList('yes_no')}" var="dict" varStatus="status">
    		<div class="radio radio-inline">
				<input id="sysData${dict.value }" type="radio" name="sysData" value="${dict.value }" <c:if test="${(dict.value == role.sysData) || (role.sysData == null && status.index == 0)}"> checked</c:if>>
				<label for="sysData${dict.value }"> ${dict.label } </label>
			</div>
			</c:forEach>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">是否可用:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<c:forEach items="${fns:getDictList('yes_no')}" var="dict" varStatus="status">
    		<div class="radio radio-inline">
				<input id="state${dict.value }" type="radio" name="state" value="${dict.value }" <c:if test="${(dict.value == role.sysData) || (role.sysData == null && status.index == 0)}"> checked</c:if>>
				<label for="state${dict.value }"> ${dict.label } </label>
			</div>
			</c:forEach>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">数据范围:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<select name="dataScope" id="dataScope" class="form-control">
				<c:forEach items="${fns:getDictList('sys_data_scope')}" var="dict">
					<option value="${dict.value }" <c:if test="${dict.value == role.dataScope}"> selected</c:if>>${dict.label }</option>
				</c:forEach>
			</select>
			<span class="help-block help-block m-b-none">特殊情况下，设置为“按明细设置”，可进行跨机构授权</span>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5">角色授权:</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<div id="menuTree" class="ztree" style="margin-top:3px;float:left;"></div>
				<input type="hidden" id="menuIds" name="menuIds" >
				<div id="orgTree" class="ztree" style="margin-left:100px;margin-top:3px;float:left;"></div>
				<input type="hidden" id="orgIds" name="orgIds" >
    	</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<shiro:hasPermission name="sys:role:edit">
				<button id="formSaveBtn" class="btn btn-primary">保存内容</button>
				<input id="formCancelBtn" class="btn btn-white" type="button" value="取消">
			</shiro:hasPermission>
		</div>
	<div class="col-xs-12 col-sm-3 valid-msg"></div>
</div>
		
	</form>
	<script type="text/javascript">
		$(document).ready(function(){

			var setting = {check:{enable:true,nocheckInherit:true},view:{selectedMulti:false},
					data:{simpleData:{enable:true}},callback:{beforeClick:function(id, node){
						tree.checkNode(node, !node.checked, true, true);
						return false;
					}}};
			
			// 用户-菜单
			var zNodes=[
					<c:forEach items="${menuList}" var="menu">{id:"${menu.id}", pId:"${not empty menu.parent.id ? menu.parent.id : 0}", name:"${not empty menu.parent.id ? menu.name : '权限列表'}"},
		            </c:forEach>];
			// 初始化树结构
			var tree = $.fn.zTree.init($("#menuTree"), setting, zNodes);
			// 不选择父节点
			tree.setting.check.chkboxType = { "Y" : "ps", "N" : "s" };
			// 默认选择节点
			var ids = "${role.menuIds}".split(",");
			for(var i=0; i<ids.length; i++) {
				var node = tree.getNodeByParam("id", ids[i]);
				try{tree.checkNode(node, true, false);}catch(e){}
			}
			// 默认展开全部节点
			tree.expandNode(tree.getNodes()[0], true, false, false);;
			
			// 用户-机构
			var zNodes2=[
					<c:forEach items="${orgList}" var="org">{id:"${org.id}", pId:"${not empty org.parent ? org.parent.id : 0}", name:"${org.name}"},
		            </c:forEach>];
			// 初始化树结构
			var tree2 = $.fn.zTree.init($("#orgTree"), setting, zNodes2);
			// 不选择父节点
			tree2.setting.check.chkboxType = { "Y" : "ps", "N" : "s" };
			// 默认选择节点
			var ids2 = "${role.orgIds}".split(",");
			for(var i=0; i<ids2.length; i++) {
				var node = tree2.getNodeByParam("id", ids2[i]);
				try{tree2.checkNode(node, true, false);}catch(e){}
			}
			// 默认展开全部节点
			tree2.expandAll(true);
			// 刷新（显示/隐藏）机构
			refreshorgTree();
			$("#dataScope").change(function(){
				refreshorgTree();
			});
		});
		function refreshorgTree(){
			if($("#dataScope").val()==9){
				$("#orgTree").show();
			}else{
				$("#orgTree").hide();
			}
		}
	</script>
	<script type="text/javascript" src="${rootPath}/views/modules/sys/roleForm.js"></script>
</body>
