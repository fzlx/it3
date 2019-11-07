<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", 0);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<base href="<%=basePath%>">

<title></title>
<!-- CSS -->
<link href="${contextPath}/H-ui/css/H-ui.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/H-ui/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/H-ui/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="${contextPath}/H-ui/lib/Hui-iconfont/1.0.1/iconfont.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/H-ui/css/style.css" rel="stylesheet" type="text/css" />

<!-- JS -->

<script src="${contextPath}/assets/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="${contextPath}/H-ui/js/H-ui.js"></script> 
<script type="text/javascript" src="${contextPath}/H-ui/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${contextPath}/H-ui/lib/layer/2.0/layer.js"></script>
<script src="${contextPath}/js/jquery.heart.min.js"></script>
 
 
</head>

<body>
<div class="pd-20">
	<form id="testForm" class="form form-horizontal" action="javascript:;;;">
		<input type="hidden" name="id" id="id"/>
		<div class="row cl">
			<label class="form-label col-2">
				项目地址前缀：
			</label>
			<div class="formControls col-10">
				<input class="input-text" type="text" id="urlPrefix" name="urlPrefix">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">
				URL：
			</label>
			<div class="formControls col-10">
				<textarea class="textarea" name="url" placeholder="说点什么吧..."></textarea>
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">
				提交类型：
			</label>
			<div class="formControls col-2">
				<span class="select-box">
			        <select class="select" size="1" name="type">
			          <option value="post">post</option>
			          <option value="get">get</option>
			        </select>
		        </span>
			</div>
			<label class="form-label col-2">
				提交数据类型：
			</label>
			<div class="formControls col-2">
				<span class="select-box">
			        <select class="select" size="1" name="contentType">
			          <option value="application/json;charset=UTF-8">json</option>
			          <option value="text/plain;charset=UTF-8">text文本字符串</option>
			          <option value="text/HTML;charset=UTF-8">HTML</option>
			          <option value="text/xml;charset=UTF-8">xml</option>
			          <option value="image/GIF;charset=UTF-8">GIF</option>
			          <option value="image/JPEG;charset=UTF-8">JPEG</option>
			        </select>
		        </span>
			</div>
			<label class="form-label col-2">
				返回结果类型：
			</label>
			<div class="formControls col-2">
				<span class="select-box">
			        <select class="select" size="1" name="dataType">
			          <option value="json">json格式</option>
			          <option value="text">纯文本字符串</option>
			          <option value="html">html格式</option>
			          <option value="xml">xml格式</option>
			          <option value="jsonp">jsonp格式</option>
			        </select>
		        </span>
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">
				参数：
			</label>
			<div class="formControls col-10">
				<textarea class="textarea" name="params" placeholder=""></textarea>
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">
				返回结果：
			</label>
			<div class="formControls col-10">
				<textarea class="textarea" id="result" placeholder=""></textarea>
			</div>
		</div>
		<div class="row cl btnRow">
			<div class="col-9 col-offset-2">
				<input class="btn btn-primary radius" type="button" id="commitBtn" value="  提交  ">
			</div>
		</div>
	</form>
</div>
<script type="text/javascript">
$(function(){
	function ajaxPost(testJson,callback,errorcallback){
		$.ajax({
			url : testJson.urlPrefix+testJson.url,
			type : testJson.type,
			dataType: testJson.dataType,
			contentType:testJson.contentType,
			//data : JSON.stringify(param),
			data : testJson.params,
			success : callback,
			error : errorcallback
		});
	}
	$("#urlPrefix").val(Svc.rootPath());
	//保存按钮
	$("#commitBtn").click(function(){
		var testJson = Svc.formToJson($("#testForm"));
		console.log(testJson);
		ajaxPost(testJson,function(data) {
			$("#result").val(JSON.stringify(data));
		},function(data) {
			$("#result").val(JSON.stringify(data));
		});
	});
});
</script>
</body>
</html>
