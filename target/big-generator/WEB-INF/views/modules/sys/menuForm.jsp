<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pageform"/>
<body>
<form name="menuForm" action="javascript:void(0);" id="menuForm" class="form form-horizontal">
	<input type="hidden" name="id" value="${menu.id}" />
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">上级菜单：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<sys:treeselect id="menu" name="parent.id" value="${menu.parent.id}" labelName="parent.name" labelValue="${menu.parent.name}"
					title="菜单" url="/sys/menu/treeData" extId="${menu.id}" cssClass="required"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">名称：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="name" value="${menu.name}" class="form-control input-text" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">链接：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="href" value="${menu.href}" class="form-control input-text" placeholder="点击菜单跳转的页面" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">目标：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="target" value="${menu.target}" class="form-control input-text"  placeholder="链接地址打开的目标窗口，默认：mainFrame" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">图标：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<sys:iconselect id="icon" name="icon" value="${menu.icon}"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5">排序：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<input type="text" name="sort" value="${menu.sort}" class="form-control" placeholder="排列顺序，升序" />
    	</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">可见：</label>
    	<div class="col-xs-12 col-sm-7 pl-0" >
    		<div class="radio radio-inline">
				<input id="radio1" type="radio" value="1" name="isShow" <c:if test="${menu.isShow == 1 || menu.id == null }">checked="true"</c:if>>
				<label for="radio1"> 是 </label>
			</div>
			<div class="radio radio-inline">
				<input id="radio0" type="radio" value="0" name="isShow" <c:if test="${menu.isShow == 0 }">checked="true"</c:if>>
				<label for="radio0"> 否 </label>
			</div>
    	</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">权限标识：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="permission" value="${menu.permission}" class="form-control input-text" placeholder="控制器中定义的权限标识，如：@RequiresPermissions(\"权限标识\")" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">备注：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="remarks" value="${menu.remarks}" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<shiro:hasPermission name="sys:menu:edit">
				<button id="formSaveBtn" class="btn btn-primary">保存内容</button>
				<input id="formCancelBtn" class="btn btn-white" type="button" value="取消">
			</shiro:hasPermission>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
</form>
<script type="text/javascript" src="${rootPath}/views/modules/sys/menuForm.js"></script>
</body>