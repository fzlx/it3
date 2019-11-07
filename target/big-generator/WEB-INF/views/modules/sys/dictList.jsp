<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta name="decorator" content="pagelist"/>
<body>
	<div class="row">
		<div class="col-sm-3">
 			<div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <div class="file-manager">
                            <div class="hr-line-dashed"></div>
                            <button id="addDict" class="btn btn-primary btn-block hide">创建新字典</button>
                            <div class="hr-line-dashed"></div>
                            <h5 class="tag-title">字典类型</h5>
                            <ul class="tag-list" id="type" style="padding: 0">
                                <li><a href="javascript:void(0);">全部</a></li>
                                <c:forEach items="${typeList}" var="t">
                                	<li><a href="javascript:void(0);" data-type="${t}">${t}</a></li>
								</c:forEach>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
 		</div>
		<div class="col-sm-9">
 			<div class="ibox">
 				<div class="ibox-title">
					<h5>所有字典</h5>
					<div class="ibox-tools"></div>
				</div>
                <div class="ibox-content">
                    <div class="row m-b-sm m-t-sm">
                        <div class="col-md-1">
                          	<button id="batchDeleteDict" class="btn btn-white btn-sm hide" ><i class="fa fa-trash-o"></i> 批量删除</button>
                        </div>
                        <div class="col-md-11">
                          	<form id="dictSearchForm" action="javascript:void(0);" method="get" class="form-inline pull-right">
                            	<div class="input-group">
                                	<input type="text" name="description" class="input-sm form-control" placeholder="请输入字典描述"> <span class="input-group-btn">
                                	<button id="searchBtn" class="btn btn-sm btn-primary" type="button"> 搜索</button> </span>
                            	</div>
                            </form>
                        </div>
                    </div>
                    <div class="project-list">
                       	<table id="datatables_dict" class="display table-bordered" cellspacing="0"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<script type="text/javascript" src="${rootPath}/views/modules/sys/dictList.js"></script>
</body>