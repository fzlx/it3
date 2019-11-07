<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pageform"/>
<body>
<form name="dictForm" action="javascript:void(0);" id="dictForm" class="form form-horizontal">
	<input type="hidden" id="id" name="id" value="${dict.id }">
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">键值：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="value" id="value" value="${dict.value }" placeholder="键值" class="form-control input-text" datatype="*1-50" nullmsg="键值不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">标签：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="label" id="label" value="${dict.label }" placeholder="标签" class="form-control input-text" datatype="*1-50" nullmsg="标签不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">类型：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="type" id="type" value="${dict.type }" placeholder="类型" class="form-control input-text" datatype="*1-50" nullmsg="类型不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5">描述：</label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<textarea class="form-control" row="10" placeholder="描述" name="description">${dict.description }</textarea>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">排序：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="sort" id="sort" value="${dict.sort }" placeholder="排序" class="form-control input-text" datatype="/^\d{0,}$/" nullmsg="只能输入数字！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5">备注：</label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<textarea class="form-control" row="10" placeholder="备注" name="remarks">${dict.remarks }</textarea>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<shiro:hasPermission name="sys:dict:edit">
				<button id="formSaveBtn" class="btn btn-primary">保存内容</button>
				<input id="formCancelBtn" class="btn btn-white" type="button" value="取消">
			</shiro:hasPermission>
		</div>
	<div class="col-xs-12 col-sm-3 valid-msg"></div>
</div>
</form>
<script type="text/javascript" src="${rootPath}/views/modules/sys/dictForm.js"></script>
</body>