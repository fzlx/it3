<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${fns:getByConfigKey('sysName')}</title>
	<meta charset="utf-8"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <script type="text/javascript">
        var rootPath = "${ctx}",
        	contextPath = "${rootPath}",
        	frontPath = "${ctxFront}",
        	rootAdminPath = "${ctx}";
    </script>
    <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?201466a617522e4754a8efc6d06d69b5";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
    
    <!-- CSS文件 -->
    <link href="${ctxStatic}/Hplus-v.4.1.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctxStatic}/Hplus-v.4.1.0/css/font-awesome.css" rel="stylesheet">
    <link href="${ctxStatic}/Hplus-v.4.1.0/css/animate.css" rel="stylesheet">
    <link href="${ctxStatic}/Hplus-v.4.1.0/css/style.css" rel="stylesheet">
	<style type="text/css" id="expandStyle"></style>
</head>
    <body class="fixed-sidebar full-height-layout gray-bg">
        <div id="wrapper">
            <!--左侧导航开始-->
            <nav class="navbar-default navbar-static-side" role="navigation">
                <div class="nav-close"><i class="fa fa-times-circle"></i></div>
                <div class="sidebar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="nav-header">
                            <div class="dropdown profile-element"> 
                                <span><i class="fa fa-globe text-navy mid-icon"></i></span>
                                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                    <span class="clear">
                                   <span class="block m-t-xs"><strong class="font-bold">${fns:getUser().loginName}</strong></span>
                                    <span class="text-muted text-xs block">${fns:getUser().name}<!--<b class="caret"></b>--></span></span>
                                </a>
                                <!--<ul class="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a class="J_menuItem" href="form_avatar.html">修改头像</a></li>
                                </ul>-->
                            </div>
                            <div class="logo-element">E
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <!--左侧导航结束-->
            <!--右侧部分开始-->
            <div id="page-wrapper" class="gray-bg dashbard-1">
                <div class="row border-bottom">
                    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                        <div class="navbar-header"><a href="#" class="navbar-minimalize minimalize-styl-2 btn btn-primary "><i class="fa fa-bars"></i> </a>
                        <form action="javascript:void(0);" method="post" class="navbar-form-custom" role="search">
                            <div class="form-group">
                                <input type="text" id="top-search" name="top-search" class="form-control" placeholder="请输入您需要查找的内容 …">
                            </div>
                        </form>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle count-info">
                                <i class="fa fa-envelope"></i> <span class="label label-warning">0</span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">
                                <li>
                                    <div class="text-center link-block">
                                        <a href="javascript:void(0);">
                                            <i class="fa fa-envelope"></i> <strong> 开发中，敬请期待！</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle count-info">
                                <i class="fa fa-bell"></i> <span class="label label-primary">0</span>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="javascript:void(0);">
                                        <div>
                                            <i class="fa fa-envelope fa-fw"></i> 开发中，敬请期待！
                                            <span class="pull-right text-muted small"></span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a aria-expanded="false" class="right-sidebar-toggle">
                                <i class="fa fa-tasks"></i> 主题
                            </a>
                        </li>
                    </ul>
                    </nav>
                </div>
                <div class="row content-tabs">
                <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <a data-id="${ctx}/sys/home/index" class="active J_menuTab" href="javascript:;">主页</a>
                    </div>
                </nav>
                <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
                </button>
                <div class="btn-group roll-nav roll-right">
                    <button data-toggle="dropdown" class="dropdown J_tabClose">关闭操作<span class="caret"></span></button>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu">
                        <li class="J_tabShowActive"><a>定位当前选项卡</a></li>
                        <li class="divider"></li>
                        <li class="J_tabCloseAll"><a>关闭全部选项卡</a></li>
                        <li class="J_tabCloseOther"><a>关闭其他选项卡</a></li>
                    </ul>
                </div>
                <a class="roll-nav roll-right J_tabExit" href="${ctx}/logout"><i class="fa fa fa-sign-out"></i> 退出</a>
            </div>
                <div class="row J_mainContent" id="content-main">
                    <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="${ctx}/sys/home/index" frameborder="0" data-id="${ctx}/sys/home/index" seamless></iframe>
                    <!--默认主页需在对应的页面显示iframe元素上添加name="iframe0"和data-id="默认主页的url"-->
                </div>
                <div class="footer">
                    <div class="pull-right">${fns:getByConfigKey('sysName')}</div>
                </div>
            </div>
            <!--右侧部分结束-->
            <!--右侧边栏开始-->
        <div id="right-sidebar">
            <div class="sidebar-container">
                <ul class="nav nav-tabs navs-3">
                    <li class="active">
                        <a data-toggle="tab" href="#tab-1"><i class="fa fa-gear"></i> 主题</a>
                    </li>
                    <li class="">
                    	<a data-toggle="tab" href="#tab-2">通知</a>
                    </li>
                    <li>
                    	<a data-toggle="tab" href="#tab-3">项目进度</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 主题设置</h3>
                            <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。</small>
                        </div>
                        <div class="skin-setttings">
                            <div class="title">主题设置</div>
                            <div class="setings-item">
                                <span>收起左侧菜单</span>
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu">
                                        <label class="onoffswitch-label" for="collapsemenu">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>固定顶部</span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar">
                                        <label class="onoffswitch-label" for="fixednavbar">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>固定宽度</span>
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout">
                                        <label class="onoffswitch-label" for="boxedlayout">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="title">皮肤选择</div>
                            <div class="setings-item default-skin nb">
                                <span class="skin-name "><a href="#" class="s-skin-0">默认皮肤</a></span>
                            </div>
                            <div class="setings-item blue-skin nb">
                                <span class="skin-name "><a href="#" class="s-skin-1">蓝色主题</a></span>
                            </div>
                            <div class="setings-item yellow-skin nb">
                                <span class="skin-name "><a href="#" class="s-skin-3">黄色/紫色主题</a></span>
                            </div>
                        </div>
                    </div>
                    <div id="tab-2" class="tab-pane">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 最新通知</h3>
                            <small><i class="fa fa-tim"></i> 开发中，敬请期待！</small>
                        </div>
                    </div>
                    <div id="tab-3" class="tab-pane">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-cube"></i> 最新任务</h3>
                            <small><i class="fa fa-tim"></i> 开发中，敬请期待！</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--右侧边栏结束-->
        </div>
     
        <!-- 全局js -->
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/jquery.min.js?v=2.1.4"></script>
        <script src="${ctxStatic}/org/it313/common/js/jquery.heart.min.js?v=1.0.0"></script>
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/bootstrap.min.js?v=3.3.6"></script>
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/plugins/metisMenu/jquery.metisMenu.js"></script>
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/plugins/layer/layer.min.js"></script>
     
        <!-- 自定义js -->
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/hplus.js?v=4.1.0"></script>
        <script type="text/javascript" src="${ctxStatic}/Hplus-v.4.1.0/js/contabs.js"></script>
     
        <!-- 第三方插件 -->
        <script src="${ctxStatic}/Hplus-v.4.1.0/js/plugins/pace/pace.min.js"></script>
    
	<script type="text/javascript">
			var API = {
				fnShowForm: function(option){
					$('#tinypagecontent').hide();
					$('#tinyformcontent').show();
					$('.breadcrumb').append('<li id="form_locate" title="关闭" style="cursor: pointer;">'+option.title+' <i class="fa fa-times-circle"></i></li>');
					Svc.AjaxPage(
						option.url,
						$('#tinyformcontent'),
						option.params||{},
						option.type||'GET',
						option.success
					);
				},
				fnHideForm: function(){
					$('#tinypagecontent').show();
					$('#tinyformcontent').hide();
					$('.breadcrumb li:last').remove();
				}
			}
			
			/**
			 * 获取单个菜单html
			 */
			function get_menu_li(menu){
				var isLastChild = !parent_children_ref[menu.id];
				return ['<li menu_id="', menu.id, '" location="', menu.location, '">',
						'	<a href="',(menu.href? '${ctx}'+menu.href: 'javascript:void(0);'),'" ', 'class="',(isLastChild?'J_menuItem':''),'" title="', menu.name, '" data-treeid="', menu.id, '">',
						'		<i class="fa ', menu.icon, '"></i>',
						'		<span class="nav-label">', menu.name, '</span>',(isLastChild?'': 
						'		<span class="fa arrow"></span>'),
						'	</a>',
						'</li>'].join('');
			}
			
			/**
			 * 递归迭代菜单html
			 */
			var main_menu_inner_ul = $('#side-menu'),
				nav_level = {1: 'nav-first-level', 2: 'nav-second-level', 3: 'nav-third-level'};
			function build_menu_html(menus){
				$.each(menus, function(i,menu){
					var parent_menu_li = main_menu_inner_ul.find('li[menu_id="'+menu.parentId+'"]');
					if(parent_menu_li.length>0){
						var parent_menu_li_ul = parent_menu_li.find('ul:first');
						menu.location = parent_menu_li.attr('location')+','+menu.name;
						if(parent_menu_li_ul.length>0){
							parent_menu_li_ul.append(get_menu_li(menu));
						}else{
							parent_menu_li.addClass('mm-dropdown');
							parent_menu_li.append('<ul class="nav '+nav_level[menu.parentIds.split(',').length-2]+' collapse">'+get_menu_li(menu)+'</ul>');
						} 
					}else{
						menu.location = menu.name;
						main_menu_inner_ul.append(get_menu_li(menu));
					}
					parent_children_ref[menu.id] && build_menu_html(parent_children_ref[menu.id]);
				});
			}
			
			/**
			 * 加载菜单-重构菜单数据-迭代菜单
			 */
			var currentMenuId,parent_children_ref={};
			Svc.AjaxForm.sGet('${ctx}/sys/menu/menuIndex',{},function(data){
				$.each(data,function(i,menu){
					if(menu.parentId == null || menu.parentId == '0' || menu.parentId == '' || menu.parentId == undefined)
						menu.parentId = 0;
					parent_children_ref[menu.parentId]? parent_children_ref[menu.parentId].push(menu): parent_children_ref[menu.parentId] = [menu];
				});
				build_menu_html(parent_children_ref[1]);
			});
		</script>
	</body>
</html>