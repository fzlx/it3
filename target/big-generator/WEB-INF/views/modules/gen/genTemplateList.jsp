<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<form id="genTemplateSearchForm" action="" method="get" class="form form-inline">
	<div class="well well-sm">
		归属公司：<sys:treeselect id="company" name="companyId" value="" labelName="companyName" labelValue="" 
				title="公司" url="/sys/office/treeData?type=1" cssClass="input-sm" allowClear="true" size="10"/>&nbsp;
		归属部门：<sys:treeselect id="office" name="officeId" value="" labelName="officeName" labelValue="" 
				title="部门" url="/sys/office/treeData?type=2" cssClass="input-sm" allowClear="true" notAllowSelectParent="true" size="10"/>&nbsp;
		帐号：<input type="text" size="10" name="loginName" class="form-control input-sm"/>&nbsp;
		用户名：<input type="text" size="10" name="name" class="form-control input-sm"/>&nbsp;
		<input type="button" id="searchBtn"  class="btn btn-primary btn-sm" value="搜索" />
		<input type="button" id="resetBtn" class="btn btn-primary btn-sm" value="重置" />
	</div>
</form>
<table id="datatables_genTemplate" class="display table-bordered" cellspacing="0"></table>
<script type="text/javascript" src="${rootPath}/views/modules/gen/genTemplateList.js"></script>
