<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pagelist"/>
<body>
<div id="organTree" class="togglebox trans open">
	<div id="organTree-ico" class="togglenavico trans"><i class="fa fa-caret-right"></i></div>
	<div id="organTree-nav" toggle-state="open" class="trans togglenavpart aclass">
		<h3 class="navtitle"><i class="fa fa-sitemap"></i> 组织机构</h3>
		<div class="navbody">
			<ul id="organTreeUl" class="fa-ztree left-ztree" data-url="${ctx}/sys/org/treeData?isUseable=true"></ul>
			 <div class="text-align-center mt-10"><input type="button" class="btn btn-default" id="changeE" value="刷新树"/></div>
		</div>
	</div>
	<div id="organTree-body" class="trans togglebodypart">
		<table id="datatables_org" class="display table-bordered" cellspacing="0"></table>
	</div>
</div>
<script type="text/javascript">
	var sys_org_type = {};
	<c:forEach items="${fns:getDictList('sys_org_type')}" var="dict">
		sys_org_type['${dict.value }']= '${dict.label }';
	</c:forEach>
</script>
<script type="text/javascript" src="${rootPath}/views/modules/sys/orgList.js"></script>
</body>