<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pagelist"/>
<body>
	<style>
		.project-list .tableButton{
			display: none;
		}
	</style>
	<div class="row">
		<div class="col-sm-12">
 			<div class="ibox">
 				<div class="ibox-title">
					<h5>所有菜单</h5>
					<div class="ibox-tools">
						<a id="addMenu" class="btn btn-primary btn-xs hide" href="javascript:void(0);">创建新菜单</a>
					</div>
				</div>
                <div class="ibox-content">
                    <div class="row m-b-sm m-t-sm">
                        <div class="col-md-1">
                          	<button id="batchSortMenu" class="btn btn-white btn-sm hide" ><i class="fa fa-sort"></i> 批量排序</button>
                        </div>
                        <div class="col-md-11">
                          	<form id="menuSearchForm" action="javascript:void(0);" method="get" class="form-inline pull-right">
                            	<div class="input-group">
                                	<input type="text" name="name" class="input-sm form-control" placeholder="请输入菜单名称"> <span class="input-group-btn">
                                	<button id="searchBtn" class="btn btn-sm btn-primary" type="button"> 搜索</button> </span>
                            	</div>
                            </form>
                        </div>
                    </div>
                    <div class="project-list">
                    	<form id="menuIndexForm">
                       		<table id="fancytree_menu" class="table-bordered no-footer dataTable" cellspacing="0"> </table>
                       	</form>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<script type="text/javascript" src="${rootPath}/views/modules/sys/menuList.js"></script>
</body>