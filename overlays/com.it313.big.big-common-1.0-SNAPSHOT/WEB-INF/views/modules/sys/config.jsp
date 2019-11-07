<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pagelist" />
<body>
  <style>
  	.muted{
  		color:red;
  	}
  </style>
  <div class="ibox-content" style="min-height:500px;">
	 <ul class="nav nav-tabs" style="margin-bottom: 30px;">
		<c:forEach items="${configTypes}" var="config" varStatus="status">
			<li data-type="${config.configType}" <c:if test="${status.index==0}"> class="active"</c:if>><a data-toggle="tab" href="#${config.configType}">${config.configTypeName}</a></li>
		</c:forEach>
     </ul>
     <div class="tab-content mt-30">
    	<c:forEach items="${configTypes}" var="config" varStatus="status">
			<div id="${config.configType}" class="tab-pane <c:if test="${status.index==0}"> active</c:if>">
				<form name="${config.configType}_form" action="javascript:void(0);" id="${config.configType}_form" class="form form-horizontal">
				</form>
			</div>
		</c:forEach>
     </div>
     <input type="hidden" id="configType" name="configType" value=""/>
	 <div class="form-group normal-form" style="padding-bottom:20px;">
		<label class="col-xs-12 col-sm-2 control-label pl-0 pr-5"></label>
		<div class="col-xs-12 col-sm-7 pl-0">
			<button id="formSaveBtn" class="btn btn-primary">保存提交</button>
		</div>
		<div class="col-xs-12 col-sm-3 valid-msg"></div>
	 </div>
  </div>	
  <script type="text/javascript" src="${rootPath}/views/modules/sys/config.js"></script>
</body>