<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pagelist"/>
<body>
	<div class="row">
		<div class="col-sm-3">
 			<div class="ibox">
 				<div class="ibox-title">
					<h5><i class="fa fa-sitemap"></i> 组织机构树</h5>
					<div class="ibox-tools">
						<a id="changeE" class="btn btn-primary btn-xs" href="javascript:void(0);">刷新树</a>
					</div>
				</div>
                <div class="ibox-content">
                    <ul id="organTreeUl" class="fa-ztree left-ztree" data-url="${ctx}/sys/org/treeData?isUseable=true"></ul>
                </div>
            </div>
        </div>
		<div class="col-sm-9">
 			<div class="ibox">
 				<div class="ibox-title">
					<h5>角色列表</h5>
					<div class="ibox-tools">
						<a id="addRole" class="btn btn-primary btn-xs hide" href="javascript:void(0);">创建新角色</a>
					</div>
				</div>
                <div class="ibox-content">
                    <div class="row m-b-sm m-t-sm">
                        <div class="col-md-1">
                          	<button id="batchDeleteRole" class="btn btn-white btn-sm hide" ><i class="fa fa-trash-o"></i> 批量删除</button>
                        </div>
                        <div class="col-md-11">
                          	<form id="roleSearchForm" action="javascript:void(0);" method="get" class="form-inline pull-right">
                            	<div class="input-group">
                                	<input type="text" name="name" class="input-sm form-control" placeholder="请输入角色名称"> <span class="input-group-btn">
                                	<button id="searchBtn" class="btn btn-sm btn-primary" type="button"> 搜索</button> </span>
                            	</div>
                            </form>
                        </div>
                    </div>
                    <div class="project-list">
                       	<table id="datatables_role" class="table table-striped table-bordered" cellspacing="0"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<script type="text/javascript" src="${rootPath}/views/modules/sys/roleList.js"></script>
</body>
