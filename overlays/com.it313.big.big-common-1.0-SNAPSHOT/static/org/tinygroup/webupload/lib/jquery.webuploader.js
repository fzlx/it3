(function($,window,undefined) {
	if(!Array.indexOf){
		Array.prototype.indexOf = function(el){
			for (var i=0,n=this.length; i<n; i++){
				if (this[i] === el){
					return i;
				}
			}
			return -1;
		}
	}
	var pluginName = "fileUploader",
		fileListPrex = "thelist", 
		containterName= "uploaderContainPrex",
		imgRegExp = /^\.(gif|jpg|jpeg|bmp|png)$/i, 
		officeRegExp = /^\.(doc|docx|xls|xlsx|ppt|pptx)$/i,
		docExp = /^\.(doc|docx)$/i, 
		xlsRegExp = /^\.(xls|xlsx)$/i, 
		pptRegExp = /^\.(ppt|pptx)$/i, 
		pdfRegExp = /^\.(pdf)$/i, 
		vidoRegExp = /^\.(mp4|rmvb|flv|mpeg|avi)$/i, 
		defaults = {
			model:'img',//img(图片模式),file(文件模式)
			btns : ["picker","downFile"],
			btnsClass : ["fa-cloud-upload", "fa-download"],
			btnsName : ["附件","下载"],
			isMul:true,//是否多附件,
			auto:true,//自动上传
			isForce:true    //是否直接新增记录或者删除数据的附件表记录
		}
	
	/**
	*注意： 1、settings.btns为空的时候为详情，只显示单纯的图片
	*		
	*
	*/
	
	var uploaderFileSvc = {
		url : {
			delAttachment : rootAdminPath +  "/sys/attachment/delete?t=" + new Date().getTime(),
			findAttachment : rootAdminPath + "/sys/attachment/list?t=" + new Date().getTime(),
			saveAttachment : rootAdminPath + "/sys/attachment/save?t=" + new Date().getTime(),
			getAtta : rootAdminPath + "/sys/attachment/getAtta?t=" + new Date().getTime(),
			fileDown : rootAdminPath + "/sys/attachment/fileDown?t=" + new Date().getTime(),
			zipDown: rootAdminPath + "/sys/attachment/zipDown?t=" + new Date().getTime()
		},
		fnDelFile: function(atta) {
            Svc.AjaxJson.post(uploaderFileSvc.url.delAttachment, atta);
        },
        fnZipDown: function(fileNames, type) {
            var params = {};
            params.fileNames = fileNames;
            params.type = type;
            window.location.href = uploaderFileSvc.url.zipDown + "&" + $.param(params);
        }
	}
	
	/*添加文件
	*uploader  文件上传
	*$list 文件容器
	*file  文件
	*isMul 是否为多附件
	*src   图片src  (如果src有只，直接设置)
	*/
	function addFile(fileUploader,$list,file,isMul,src){
		
		var model = fileUploader.isImgModel?"imgModel":"fileModel",
			fileName = file.name,
			$li= $(
	            '<div id="' + file.id + '" class="file-item '+model+' filelist">' +
	            	'<div class="checkbox-uploader filewrap">'+
	                '<img title="'+file.name+'" />'+ 
	                '<i class="fa" style="font-size: 16px;color:#1c33d7"></i>'+
	                '</div>'+
	            '</div>'
	            ),
	         $fileWrap = $li.find('.filewrap'),    
	    	 $img = $li.find('img'),
	    	 $i = $li.find('i'),
	    	 $btns;
	    	 
	    	 if(!fileUploader.isImgModel){
	    	 	$fileWrap.append('<a style="padding-left:5px;color:#08c;" href="#" class="fileSpan" data-src="'+src+'" title="'+fileName+'">'+(fileName.length>20?fileName.substring(0,20)+"...":fileName)+'</a>');
	    	 	
	    	 	//如果有下载按钮
	    	 	if((fileUploader.settings.btns.length==1&&"downFile"==fileUploader.settings.btns[0])||fileUploader.settings.btns.length==2){
	    	 		$img.before('<input type="checkbox" id="ck'+file.id+'" name="operFile"/>'+
								'<label for="ck'+file.id+'" class="cursor-hand"></label>');
	    	 	}
	    	 	
	    	 }
	    	 
	    	 if(fileUploader.settings.width)
	    	 	$li.css('width',fileUploader.settings.width);
	    	 
	    	 //讲文件保存在div里面
	    	 $li.data("file",file);
	    	 
		     if(fileUploader.settings.btns.length>0){
		     	  $btns = $('<div class="file-panel">' +
		     	 		' <i class="sicon fa fa-trash-o"></i>'+
		                '</div>').appendTo($li.find(".filewrap"));     
				  
				    //如果是单文件-》清空文件容器以及后台删除文件
				    if(!isMul){
				    	removeFile(fileUploader,$list.find("div.file-item").data("file"));
				    	$list.html("");
				    }
				    
				    file.rotation = 0;
				    
				    //图片模式
				    if(fileUploader.isImgModel){
					    $li.on( 'mouseenter', function() {
				            $btns.stop().animate({height: 30});
				        });
				
				        $li.on( 'mouseleave', function() {
				            $btns.stop().animate({height: 0});
				        });
				    } 
			        
				    $btns.on( 'click', 'i', function() {
			            var index = $(this).index(),
			                deg;
			            switch ( index ) {
			                case 0:
			                    removeFile(fileUploader,file);
			                    return;
			            }
					});
		     } 
		     
		     if(!fileUploader.isImgModel){
		     	$img.remove();
		     	var className = "fa-file-archive-o",
		     		fileExt = fileName.substring(fileName.lastIndexOf("."));
		     	if(docExp.test(fileExt)){
		     		className = "fa-file-word-o";
		     		$li.find(".fileSpan").attr("data-file","office");
		     	}else if(xlsRegExp.test(fileExt)){	
		     		className = "fa-file-excel-o";
		     		$li.find(".fileSpan").attr("data-file","office");
		     	}else if(pptRegExp.test(fileExt)){	
		     		className = "fa-file-excel-o";
		     		$li.find(".fileSpan").attr("data-file","office");
		     	}else if(imgRegExp.test(fileExt)){	
		     		className = "fa-file-image-o";	
		     		$li.find(".fileSpan").attr("data-file","img");
		     	}else if(vidoRegExp.test(fileExt)){	
		     		className = "fa-file-movie-o";	
		     		$li.find(".fileSpan").attr("data-file","file");
		     	}else if(pdfRegExp.test(fileExt)){	
		     		className = "fa-file-movie-o";		
		     		$li.find(".fileSpan").attr("data-file","file");
		     	}else{
		     		$li.find(".fileSpan").attr("data-file","file");
		     	}		
		     	$i.addClass(className);
		     	
		     }else{
		     	$i.remove();
		     	src&&$img.attr( 'src', src );
		     	if(!src){
		     		// 创建缩略图
				    // thumbnailWidth x thumbnailHeight 为 100 x 100
				    var thumbnailWidth=100,thumbnailHeight=100;
				    fileUploader.uploader.makeThumb( file, function( error, src ) {
				        if ( error ) {
				            $img.replaceWith('<span>不能预览</span>');
				            return;
				        }
				
				        $img.attr( 'src', src );
				    }, thumbnailWidth, thumbnailHeight );
		     	}
		     }
		     
		     
	     	// $list为容器jQuery实例
			$list.append( $li );
	}
	
	/*移除文件
	*uploader  文件上传
	*file  文件
	*如果未上传就是没有新文件名称，直接删除
	*如果已经上传会有文件名称，当没有fromId的时候就只删除文件，如果有fromId同时删除文件和记录
	*/
	function removeFile(fileUploader,file){
		if(file){
			var $li = $('#'+file.id);
			if(fileUploader.settings.isForce&&($li.attr("data-attid")||$li.attr("data-newFile"))){
				uploaderFileSvc.fnDelFile({id:$li.attr("data-attId"),newFileName:$li.attr("data-newFile"),type:fileUploader.settings.attachment.type})
			}
		    //不是自己生产的file
		    if(!file.self){
		    	fileUploader.uploader.removeFile( file );
		    }
		    
		    $li.off().find('.file-panel').off().end().remove();
		}
		
	}
	window.FileUploader = window.FileUploader||{};
	FileUploader = function(element, options) {
        this.isCanVisible = false;
        this.fileSize = 0;
        this.$element = $(element);
        	 
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        
        //是否为文件或图片模式false为文件模式
        this.isImgModel = false;
        if("img"==this.settings.model)
        	this.isImgModel = true;
        
         //如果是自动上传，则去掉开始上传按钮
        if(this.settings.auto&&(!options.btns)){
        	this.settings = $.extend(this.settings,{"btns" : ["picker"]});
        	this._defaults = $.extend(this._defaults,{"btns" : ["picker"]});
        }
        if(options.btns&&options.btns.length==0){
        	this.settings = $.extend(this.settings,{"btns" : []});
        }
        this._name = pluginName;
        this.init();
        this.initWebUploader();
        this.registerEvents();
    };
	FileUploader.prototype = {
		init : function(){	
			var _this = this, r;
			var _defaults = this._defaults,btns = this._defaults.btns;
			_this.r = r = parseInt(10000 * Math.random());
			_this.$operBtnsContanter = $('<div class="btns"></div>').appendTo(_this.$element);
			_this.$fileListContainter = $('<div id="' + fileListPrex + _this.r + '" class="uploader-list"></div>').appendTo(_this.$element);
			var btnDivContain="",k;
			if(_this.settings.btns.length==0){
				_this.$operBtnsContanter.hide();
			}else{
				$.each(_this.settings.btns,function(i,v){
					if((k = _defaults.btns.indexOf(v))>=0){
						btnDivContain +=['<div id=',v+r,' style="margin-right:10px;vertical-align: top;display: inline-block;float: left;">','<i class="fa ',defaults.btnsClass[k],'" style="color:#2e3ca0;margin-right:3px;"></i><span style="color:#838383">',_defaults.btnsName[k],'</span></div>'].join("");
					}
				});
				$(btnDivContain).appendTo(_this.$operBtnsContanter);
			}
			//获取上传按钮
			_this.$uploadBtn = $("#" + btns[1]?btns[1]:btns[0] + this.r);
		},
		initWebUploader : function(){
			var _this = this,
				$list = _this.$fileListContainter,
				$uploadBtn = _this.$uploadBtn,
				state = 'pending',
				option ={
					auto:true,
					headers :{
	        			accept:"*/*"
	        		},
	        		accept :{
	        			extensions: _this.settings.acceptExt?_this.acceptExt:(_this.isImgModel?"gif,jpg,jpeg,bmp,png":"*"),
	        			mimeTypes: _this.isImgModel?'image/*':null
	        		},
	        		multiple:true,
			        // swf文件路径
				    swf:'Uploader.swf',
				    // 文件接收服务端。
				    server:uploaderFileSvc.url.saveAttachment,
				    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				    resize: false,
			        fileVal: 'ajaxFile',
			        pick: '#picker'+this.r,
			        fileSingleSizeLimit: 20* 1024 * 1024,    // 20 M
			        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
			        compress:{
			        	quality: 50
			        }
			    };
			//自动上传文件
			_this.settings.auto&&$.extend(option,{"auto":_this.settings.auto});
			//是否多附件
			!_this.settings.isMul&&$.extend(option,{"fileNumLimit":1},{"multiple":false});
			 
			//创建webuploader
			if(!_this.settings.attachment.fromId)
				_this.settings.attachment.fromId = undefined;
			var uploader = WebUploader.create($.extend({}, option, {
                formData:_this.settings.attachment
            }));
            
            _this.uploader = uploader;
            	
            uploader.on( 'beforeFileQueued', function( file ) {
            	//如果不是强制想后台加入附件记录，设值为空
            	if(!_this.settings.isForce)
            		this.options.formData.fromId="";
		    });
            // 当有文件添加进来的时候
		    uploader.on( 'fileQueued', function( file ) {
		    	addFile(_this,$list,file,_this.settings.isMul);
		    });
		    // 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
			    var $li = $( '#'+file.id ).find(".filewrap"),
			        $percent = $li.find('.progress span');
			
			    // 避免重复创建
			    if ( !$percent.length ) {
			        $percent = $('<p class="progress"><span></span></p>')
			                .appendTo( $li )
			                .find('span');
			    }
			
			    $percent.css( 'width', percentage * 100 + '%' );
			});
			
			
					    
		    uploader.on( 'uploadSuccess', function( file,response ) {
		    	var data = response.data;
		    	if(data==false){
		    		return false;
				}
			    
		    	var $file = $( '#'+file.id );
		    	$file.attr("data-flag","1");
		    	$file.attr("data-newFile",data.newFileName);
		    	$file.attr("data-oldFile",data.oldFileName);
		    	$file.attr("data-attId",data.id?data.id:"");
		    	//给复选框赋值
		    	$file.find("input[type='checkBox'][name='operFile']").attr("data-newFile",data.newFileName);
		    	$file.find("input[type='checkBox'][name='operFile']").attr("data-oldFile",data.oldFileName);
		    	
		    	if(!_this.isImgModel&&"img"!=$file.find(".filewrap .fileSpan").attr("data-file")){
		    		var url = uploaderFileSvc.url.fileDown+'&type='+_this.settings.attachment.type+'&newFileName='+data.newFileName+'&oldFileName='+data.oldFileName;
		    		$file.find(".filewrap .fileSpan").attr("href",url)
		    	}else{
		    		$file.addClass('upload-state-done');
			    	var _width = 500,_height=500;
					if(file._info){
						_width = file._info.width;
						_height = file._info.height;
					}
					// 如果为非图片文件，可以不用调用此方法。
				    uploader.makeThumb( file, function( error, src ) {
				        $file.find("img").attr( 'data-src', src );
				    },_width,_height);
		    	}
		    	
		    	
		    });
		    uploader.on( 'uploadError', function( file ) {
		    	 var $li = $( '#'+file.id ),
			        $error = $li.find('div.error');
			
			    // 避免重复创建
			    if ( !$error.length ) {
			        $error = $('<div class="error"></div>').appendTo( $li );
			    }
			
			    $error.text('上传失败');
		    });
		    uploader.on( 'all', function( type ) {
				if (type === "startUpload") {
                    state = "uploading";
                } else {
                    if (type === "stopUpload") {
                        state = "paused";
                    } else {
                        if (type === "uploadFinished") {
                            state = "done";
                            $(".form-actions input[type='button']").removeAttr("disabled");
                        }
                    }
                }
                if (state === "uploading") {
                    $uploadBtn.text('暂停上传');
                    $(".form-actions input[type='button']").attr("disabled", "disabled");
                } else {
                    $uploadBtn.text('开始上传');
                }
		    });
		    
			uploader.on( 'uploadComplete', function( file ) {
			    $( '#'+file.id ).find('.progress').remove();
			});
			uploader.onError = function(code) {
                switch (code) {
                  case "F_DUPLICATE":
                  	layer.msg("不能同时上传文件相同文件");
					break;
                  case "Q_EXCEED_NUM_LIMIT":
                  	layer.msg("已达允许上传文件数量");
					break;
                  case "F_EXCEED_SIZE":
                  	layer.msg("单个文件超出2M");
					break;
                  case "Q_EXCEED_SIZE_LIMIT":
                    layer.msg("上传文件超出200M");
					break;
                  case "Q_TYPE_DENIED":
                  	layer.msg("上传文件格式错误");
					break;

                  default:
                  	layer.msg("错误: " + code);
					break;
                }
            };
            $uploadBtn.click(function() {
            	if ( state === 'uploading' ) {
		            uploader.stop();
		        } else {
		            uploader.upload();
		        }
		    });
        	if(_this.settings.attachment.fromId){
        		_this.loaderData();
        	}
		    
            
		},
		loaderData: function(opt) {
			var _this = this;
            	_this.fileSize = 0,
            	_settings =  _this.settings;//文件容器
            	
            Svc.AjaxJson.post(uploaderFileSvc.url.findAttachment, _settings.attachment, function(data) {
            	if(data.length>0){
            		$.each(data,function(i,info){
            			var file ={},src=uploaderFileSvc.url.getAtta+"&id="+info.id;
	            		file.id ="SELF"+_this.r+"_WU_FILE_10000"+i;
	            		file.name = info.oldFileName;
	            		file.self =true;
	            		//添加文件
	            		addFile(_this,_this.$fileListContainter,file,_this.settings.isMul,src);
	            		var $file = $( '#'+file.id );
				    	$file.attr("data-flag","1");
				    	$file.attr("data-newFile",info.newFileName);
				    	$file.attr("data-oldFile",info.oldFileName);
				    	$file.attr("data-attId",info.id?info.id:"");
				    	$file.data("file",file);
				    	
				    	if(_this.settings.btns.length>0){
				    		$file.addClass('upload-state-done');
				    	}
				    	//给复选框赋值
				    	$file.find("input[type='checkBox'][name='operFile']").attr("data-newFile",info.newFileName);
				    	$file.find("input[type='checkBox'][name='operFile']").attr("data-oldFile",info.oldFileName);
				    	
				    	if(!_this.isImgModel&&"img"!=$file.find(".filewrap .fileSpan").attr("data-file")){
				    		var url = uploaderFileSvc.url.fileDown+'&type='+_settings.attachment.type+'&newFileName='+info.newFileName+'&oldFileName='+info.oldFileName
				    		$file.find(".filewrap .fileSpan").attr("href",url)
				    	}
				    	
				    	//如果是单文件上传的话
	            		if(!_this.settings.isMul){
	            			return false;
	            		}
            		})
            	}
            	
            });
		},
		registerEvents : function(){
			var _this = this,
				_fileListContainter = _this.$fileListContainter,
				_operBtnsContanter = _this.$operBtnsContanter;
			//图片点击事件
			_fileListContainter.delegate("div[data-flag='1'] img,.fileModel .filewrap a[data-file='img']","click", function() {
                var $obj = "IMG"==$(this)[0].nodeName?_fileListContainter.find("div[data-flag='1'] img"):_fileListContainter.find(".fileModel .filewrap a[data-file='img']");
               	var config = {};
                config.activeImage = $(this).attr("data-src")?$(this).attr("data-src"):$(this).attr("src");
                config.aData = $obj;
                //LightBox&&LightBox.showImg(config);
                ImgViewer&&ImgViewer.showImg(config);
            });
            //文件下载事件
            _operBtnsContanter.delegate("#downFile"+this.r,"click", function() {
            	var files = _fileListContainter.find("input[name='operFile']:checked");
                if (files.length == 0) {
                    layer.msg("请选择要下载的附件！");
                    return;
                } else {
                    layer.confirm("确定下载选中的附件吗？", function(index) {
                        var fileNames = "";
                        /*if (s.length > 10) {
                            layer.msg("批量下载附件最多10个附件！");
                            return;
                        }*/
                        $.each(files, function(i, info) {
                            fileNames += $(this).attr("data-newFile") + "#" + $(this).attr("data-oldFile") + ";";
                        });
                        uploaderFileSvc.fnZipDown(fileNames, _this.settings.attachment.type);
                        layer.close(index);
                    });
                }
            });
		},
		getUploadFiles : function(){
			var _this = this;
			var flagFiles =_this.$fileListContainter.find("div[data-flag='1']");
			var oldFileNames = [],newFileNames=[];
			$.each(flagFiles,function(){
				var that = $(this);
				if(!that.attr("data-attId")||(!_this.settings.isForce)){
					oldFileNames.push(that.attr("data-oldFile"));
					newFileNames.push(that.attr("data-newFile"));
				}
			});
			return {
				oldFileNames: oldFileNames,
				newFileNames: newFileNames,
				fileType:_this.settings.attachment.type
			}
		}
	};
	
})(jQuery,window);