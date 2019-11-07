<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="id" type="java.lang.String" required="true" description="编号"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="输入框名称"%>
<%@ attribute name="value" type="java.lang.String" required="true" description="输入框值"%>
<i id="${id}Icon" class="fa ${not empty value ? value : ' hide'}" style="font-size:18px"></i>&nbsp;<label id="${id}IconLabel">${not empty value ? value : '无'}</label>&nbsp;
<input id="${id}" name="${name}" type="hidden" value="${value}"/><a id="${id}Button" href="javascript:" class="btn">选择</a>&nbsp;&nbsp;
<script type="text/javascript">
	$("#${id}Button").click(function(){
		layer.open({
			id:"iconSlect-01",
			type: 2, 
			content:'${ctx}/tag/iconselect?value="+$("#${id}").val()',
			title:"选择图标",
			area: ['80%', '80%'],
			btn:['确定','清除','关闭'],
			yes:function(index,layero){
				var icon = layero.find("iframe")[0].contentWindow.$("#icon").val();
                $("#${id}Icon").attr("class", "fa "+icon);
	            $("#${id}IconLabel").text(icon);
	            $("#${id}").val(icon);
	            layer.close(index);
			},
			btn2:function(index,layero){
				$("#${id}Icon").attr("class", "icon- hide");
	            $("#${id}IconLabel").text("无");
	            $("#${id}").val("");
	            layer.close(index);
			},
			btn3:function(index,layero){
				layer.close(index);
			},
			cancel: function(index,layero){ 
				layer.close(index);
			}
		});
	});
</script>