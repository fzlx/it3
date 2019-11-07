<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<form name="areaForm" action="javascript:void(0);" id="areaForm" class="form form-horizontal">
	<input type="hidden" name="id" value="${area.id}" />
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">上级区域：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<sys:treeselect id="area" name="parent.id" value="${area.parent.id}" labelName="parent.name" labelValue="${area.parent.name}"
					title="区域" url="/sys/area/treeData" extId="${area.id}" cssClass="" allowClear="true"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">区域名称：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="name" value="${area.name}" class="form-control input-text" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">区域编码：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<input type="text" name="code" value="${area.code}" class="form-control input-text" />
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">区域类型：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<select name="type" class="form-control select2" datatype="*" nullmsg="区域类型不能为空！">
				<c:forEach items="${fns:getDictList('sys_area_type')}" var="dict">
					<option value="${dict.value }" <c:if test="${dict.value == area.type}"> selected</c:if>>${dict.label }</option>
				</c:forEach>
			</select>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">备注：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<textarea class="form-control" row="10" placeholder="说点什么..." name="remarks">${area.remarks }</textarea>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<shiro:hasPermission name="sys:area:edit">
				<button id="formSaveBtn" class="btn btn-info">提交</button>
				<input class="btn btn-success" type="reset" value="重置">
				<input id="formCancelBtn" class="btn btn-default" type="button" value="取消">
			</shiro:hasPermission>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
</form>
<script type="text/javascript" src="${rootPath}/views/modules/sys/areaForm.js"></script>