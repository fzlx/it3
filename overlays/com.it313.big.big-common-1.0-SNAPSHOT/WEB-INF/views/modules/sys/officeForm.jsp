<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<form name="orgForm" action="javascript:void(0);" id="orgForm" class="form form-horizontal">
	<input type="hidden" id="id" name="id" value="${org.id }">
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">上级机构：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<sys:treeselect id="org" name="parent.id" value="${org.parent.id}" labelName="parent.name" labelValue="${org.parent.name}"
					title="机构" url="/sys/org/treeData" extId="${org.id}" cssClass="required" allowClear="${org.currentUser.admin}"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">归属区域：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
    		<sys:treeselect id="area" name="area.id" value="${org.area.id}" labelName="area.name" labelValue="${org.area.name}"
					title="区域" url="/sys/area/treeData" cssClass="required"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">机构名称：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="name" id="name" value="${org.name }" placeholder="机构名称" class="form-control input-text" datatype="*1-50" nullmsg="机构名称不能为空！"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">机构编码：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="code" id="code" value="${org.code }" placeholder="机构编码" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">机构类型：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<select name="type" class="form-control select2" datatype="*" nullmsg="机构类型不能为空！">
				<c:forEach items="${fns:getDictList('sys_org_type')}" var="dict">
					<option value="${dict.value }" <c:if test="${dict.value == org.type}"> selected</c:if>>${dict.label }</option>
				</c:forEach>
			</select>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">机构级别：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<select name="grade" class="form-control select2" datatype="*" nullmsg="机构级别不能为空！">
				<c:forEach items="${fns:getDictList('sys_org_grade')}" var="dict">
					<option value="${dict.value }" <c:if test="${dict.value == org.grade}"> selected</c:if>>${dict.label }</option>
				</c:forEach>
			</select>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">是否可用：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<div class="switch switch-info round switch-inline" style="float: left;">
				<input id="useable" name="useable" type="checkbox" <c:if test="${org.useable == 1 || org.id == null }">checked="true"</c:if>>
				<label for="useable"></label>
			</div>
			<span style="padding-left: 5px; float: left; padding-top: 5px;">“是”代表此账号允许登陆，“否”则表示此账号不允许登陆</span>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">主负责人：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<sys:treeselect id="primaryPerson" name="primaryPerson.id" value="${org.primaryPerson.id}" labelName="org.primaryPerson.name" labelValue="${org.primaryPerson.name}"
					title="用户" url="/sys/org/treeData?type=3" allowClear="true" notAllowSelectParent="true"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">副负责人：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<sys:treeselect id="deputyPerson" name="deputyPerson.id" value="${org.deputyPerson.id}" labelName="org.deputyPerson.name" labelValue="${org.deputyPerson.name}"
					title="用户" url="/sys/org/treeData?type=3" allowClear="true" notAllowSelectParent="true"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">联系地址：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="address" id="address" value="${org.address }" placeholder="联系地址" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">邮政编码：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="zipCode" id="zipCode" value="${org.zipCode }" placeholder="邮政编码" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">负责人：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="master" id="master" value="${org.master }" placeholder="负责人" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">电话：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="phone" id="phone" value="${org.phone }" placeholder="电话" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">传真：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="fax" id="fax" value="${org.fax }" placeholder="传真" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
    	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">邮箱：</label>
    	<div class="col-xs-12 col-sm-7 pl-0">
			<input type="text" name="email" id="email" value="${org.email }" placeholder="邮箱" class="form-control input-text"/>
		</div>
    	<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5">描述：</label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<textarea class="form-control" row="10" placeholder="说点什么..." name="remarks">${org.remarks }</textarea>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	</div>
	<c:if test="${empty org.id}">
		<div class="form-group normal-form">
  	  	<label class="col-xs-12 col-sm-2 control-label  pl-0 pr-5">快速添加下级部门：</label>
    		<div class="col-xs-12 col-sm-7 pl-0">
				<c:forEach items="${fns:getDictList('sys_org_common')}" var="dict">
					<div class="checkbox-custom pt-5">
						<input type="checkbox" name="childDeptList" id="id${dict.id }" value="${dict.value }">
						<label for="id${dict.id }" class="cursor-hand">${dict.label }</label>
					</div>
				</c:forEach>
			</div>
    		<div class="col-xs-12 col-sm-3 valid-msg"></div>
		</div>
	</c:if>
	<div class="form-group normal-form">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<shiro:hasPermission name="sys:org:edit">
				<button id="formSaveBtn" class="btn btn-info">提交</button>
				<input class="btn btn-success" type="reset" value="重置">
				<input id="formCancelBtn" class="btn btn-default" type="button" value="取消">
			</shiro:hasPermission>
		</div>
	<div class="col-xs-12 col-sm-3 valid-msg"></div>
</div>
</form>
<script type="text/javascript" src="${rootPath}/views/modules/sys/orgForm.js"></script>