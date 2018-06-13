(function () {
  'use strict';
  angular.module('img.map',[])
    .directive('imgLevel',function ($window, $rootScope) {//在固定区域等比例显示图片
      return {
        restrict: 'E',
        scope:{
          urlSrc:'=',      //图片地址，必填
          urlIndex:'=',    //图片的序号，int，必填
          nodeImgId:'=',   //用大图的id标识消息，必填
          errSrc:'=',      //在图片加载失败时显示固定图片，必填
          height:'=',      //图片高度，int，必填
          width:'=',       //图片宽度，int，必填
          background:'='   //背景颜色，string，选填
        },
        template:'<div class="img-div" ng-style="style"><img class="img-item" ng-src="{{urlSrc}}"/></div>',
        link: function ($scope, $element) {
          $scope.style={
            'background':$scope.background||'rgba(0,0,0,0.1)'
          };
          var node=angular.element($element[0].childNodes[0].childNodes);
  
          node.bind('load', function() {
            dealWithImg($scope.urlSrc);
          });
          
          node.bind('error', function() {
            dealWithImg($scope.errSrc,1);
            setSrc(node,$scope.errSrc);
          });
  
          node.bind('click', function () {
            $rootScope.$broadcast($scope.nodeImgId, $scope.urlIndex);
          });
  
          /**
           * 设置src
           */
          function setSrc(node,url) {
            node.attr('src',url);
          }
          
          /**
           * 处理图片大小
           */
          function dealWithImg(url,f){
            var image = new Image();
            image.src = url;
            var width = image.width,
                height = image.height;
            var pwidth = $scope.width,
                pheight = $scope.height;
            
            if(!f){
              var scale_x = width / pwidth;
              var scale_y = height / pheight;
  
              if(scale_x > scale_y){
                var w=pwidth-2, h=parseInt(height / scale_x)-2, t=((pheight - h) / 2).toFixed(), l=1;
              }else {
                var w=parseInt(width / scale_y)-2, h=pheight-2, t=1, l=((pwidth - w) / 2).toFixed();
              }
              if(node.attr('src')!=$scope.errSrc){
                node.css({
                  'height': h+'px',
                  'width': w+'px',
                  'top': t + "px",
                  'left': l + "px"
                });
              }
            }else{
              var len=(pheight<pwidth?pheight:pwidth)<(width+2)?(pheight<pwidth?pheight:pwidth):width+2;
              var w=len-2, h=w, t=((pheight-h)/2).toFixed(), l=((pwidth-w)/2).toFixed();
              node.css({
                'height': h+'px',
                'width': w+'px',
                'top': t + "px",
                'left': l + "px"
              });
            }
          }
        }
      }
    })
    .directive('imgViews', function ($timeout, $window, $document, $rootScope) {
      return {
        restrict: 'E',
        scope:{
          cameraList:'=',     //图片列表
          needlessSize:'=',   //选填(boolean, 默认false) true:自定义图片大小;false:沿用组件大小
          width:'=',          //选填(int,单位：px,eg:200,默认100) needlessSize为false时无效
          height:'=',         //选填(int,单位：px,eg:200,默认100) needlessSize为false时无效
          background:'='      //背景颜色，string，'black'/'#000'/'rgb(0,0,0)'/'rgba(0,0,0,0)'，选填
        },
        replace: true,
        template:
          '<div class="imgViews">\n' +
            '<div ng-repeat="it in cameraList track by $index" ng-style="imgSize">'+
              '<img-level url-src="it.url" url-index="$index" node-img-id="\'ngdialog\'+random" needless-size="needlessSize||false" height="h" width="w" background="background" err-src="\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAABlBMVEXm5eX+/v4Lj/UHAAABLUlEQVQ4y+3SwW0DIRAFUAiWONKAJToJ6WxmO5tSKIFDDhxW/LD2eIFNB5ZHAunxGeCA+dTbVwLYAvhVE5AP72oA9Zjw5DMiAHwak93DabXEYxouYc1ruOTD9uGl/79zmt0oL/eXsObZC80Wt5odY7G9esN8vrF2zc3V7uo9Tv1iXPHze24+u/n9Nyd2yuvdCk9GM1umxa7MhvE1zeZQ42wJe1gcWwAP5wB35o1Wl4jssZ3O4bCclo6+Si9zX7IoxGq3gbuT5s0LvgxqVO8hkze0B3WN5dszNa/9JdV7kASveab9FiXCaS5oJuaITfMNMEkSRO0AJibkn4e/PCBgoJhndQNmOHY2C9TJu+tDTYc90E7r/1br/33ZnubhnNb9QsN0bMU4P6qr+dS71R8WH7qWvA/tvAAAAABJRU5ErkJggg==\'"></img-level>'+
            '</div>'+
            '<div id={{"ngdialog"+random}} class="ngdialog-default" ng-class="{ ngdialogClosing : isClose  }" ng-click="stopPropagation($event)">\n' +
              '<div class="ngdialog-overlay-mask"></div>\n' +
              '<div class="ngdialog-content-picture" draggable>\n' +
                '<div class="dialog-body" >\n' +
                  '<img class="dialog-img" src="" onerror="this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAABlBMVEXm5eX+/v4Lj/UHAAABLUlEQVQ4y+3SwW0DIRAFUAiWONKAJToJ6WxmO5tSKIFDDhxW/LD2eIFNB5ZHAunxGeCA+dTbVwLYAvhVE5AP72oA9Zjw5DMiAHwak93DabXEYxouYc1ruOTD9uGl/79zmt0oL/eXsObZC80Wt5odY7G9esN8vrF2zc3V7uo9Tv1iXPHze24+u/n9Nyd2yuvdCk9GM1umxa7MhvE1zeZQ42wJe1gcWwAP5wB35o1Wl4jssZ3O4bCclo6+Si9zX7IoxGq3gbuT5s0LvgxqVO8hkze0B3WN5dszNa/9JdV7kASveab9FiXCaS5oJuaITfMNMEkSRO0AJibkn4e/PCBgoJhndQNmOHY2C9TJu+tDTYc90E7r/1br/33ZnubhnNb9QsN0bMU4P6qr+dS71R8WH7qWvA/tvAAAAABJRU5ErkJggg==\'">\n' +
                '</div>\n' +
              '</div>\n' +
              '<div class="dialog-tool">\n' +
                '<span class="image-title"></span>\n' +
                '<span href="#" class="image-title-box">{{title}}</span>\n' +
                '<span href="#" class="close-dialog" ng-click="backoff()"></span>\n' +
                '<span href="#" class="rotate-dialog" ng-click="rotate()"></span>\n' +
                '<span href="#" ng-if="!single" ng-class="nextTrue?dialog2:cur" class="next-dialog" ng-click="next()"></span>\n' +
                '<span href="#" ng-if="!single" ng-class="preTrue?dialog2:cur" class="previous-dialog" ng-click="previous()"></span>\n' +
              '</div>\n' +
            '</div>\n' +
          '</div>\n',
        link: function ($scope, $element) {
          $scope.dialog2='next-dialog2';//定义样式名称
          $scope.cur='cur';//定义样式名称
          $scope.random=(new Date()).getTime();
          $scope.w=($scope.needlessSize?$scope.width||100:100);
          $scope.h=($scope.needlessSize?$scope.height||100:100);
          $scope.imgSize={
            'width':$scope.w+'px',
            'height':$scope.h+'px',
            'display':'inline-block',
            'margin-right':'5px'
          }
          var cameraList = [];
          var titleList = [];
          $scope.imgList = [];
          $scope.otherList = [];
          var selPage = 1;
          var rotate = 90;
          var num = 0;
  
          /**
           * 处理图片列表
           */
          if($scope.cameraList){
            var data=$scope.cameraList;
            if(data){
              angular.forEach(data, function (elt, index) {
                cameraList.push(elt.url);
                titleList[index]=elt.title;
              });
              if(data.length===1&&data[0].single){
                console.log('single:',data[0].single);//This will avoid some weird bugs
                set(data[0].single);
              }else{
                set(false);
              }
            }
          }
          function set(val) {
            $timeout(function(){
              $scope.single = val;
            });
          }
          
          $rootScope.$on("ngdialog"+$scope.random,function (event,index) {
            $scope.checkBigImg(index,cameraList[index],titleList[index]);
          });
          
          var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
          var i = 1;
  
          /**
           * 鼠标按下事件
           */
          function mouseEvt() {
            $element = angular.element(jQuery("#ngdialog"+$scope.random)).find(".ngdialog-content-picture");
            $element.on('mousedown', function (event) {
              event.preventDefault();
              startX = event.clientX - $element[0].offsetLeft;
              startY = event.clientY - $element[0].offsetTop;
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
            });
          }
          /**
           * 滚轮事件 放大、缩小
           */
          function scrollEvt() {
            var isFirefox = navigator.userAgent.indexOf("Firefox") > -1 ;
            var MOUSEWHEEL_EVENT = isFirefox ? "DOMMouseScroll" : "mousewheel";
            var $imageBox=document.getElementById("ngdialog"+$scope.random);
            $imageBox.onmousewheel = scrollFunc;
            if (document.addEventListener) {
              $imageBox.addEventListener(MOUSEWHEEL_EVENT, scrollFunc, false);
            }else{
              $imageBox.attachEvent("on"+MOUSEWHEEL_EVENT, scrollFunc);
            }
          }
          function scrollFunc(event) {
            event.preventDefault();
            var transform = $element[0].style.transform;
            if (transform.indexOf("scale(")) {
              transform = transform.split(" ")[0];
            }
            if (event.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
              if (event.wheelDelta > 0) { //当滑轮向上滚动时
                i = i + 0.1;
                if (i > 5) {
                  i = 5;
                }
                $element.css({
                  transform: transform + ' scale(' + i + ', ' + i + ')'
                });
              }
              if (event.wheelDelta < 0) { //当滑轮向下滚动时
                i = i - 0.1;
                if (i < 0.1) {
                  i = 0.1;
                }
                $element.css({
                  transform: transform + ' scale(' + i + ', ' + i + ')'
                });
              }
            } else if (event.detail) { //Firefox滑轮事件
              if (event.detail > 0) { //当滑轮向下滚动时
                i = i - 0.1;
                if (i < 0.1) {
                  i = 0.1;
                }
                $element.css({
                  transform: transform + ' scale(' + i + ', ' + i + ')'
                });
              }
              if (event.detail < 0) { //当滑轮向上滚动时
                i = i + 0.1;
                if (i > 5) {
                  i = 5;
                }
                $element.css({
                  transform: transform + ' scale(' + i + ', ' + i + ')'
                });
              }
            }
          }
          /**
           * 拖拽事件
           */
          function mousemove(event) {
            x = event.clientX - startX;
            y = event.clientY - startY;
            $element.css({
              top: y + 'px',
              left: x + 'px',
              transition: 'left 0s, top 0s'
            });
          }
          /**
           * 鼠标放开事件
           */
          function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
            $element.css({
              transition: 'all .6s'
            });
          }
          /**
           * 返回
           */
          $scope.backoff = function () {
            $scope.isClose = true;
            $timeout(function () {
              $scope.isClose = false;

              angular.element(jQuery("#ngdialog"+$scope.random)).css({
                'display':'none'
              });
              num = 0;
            }, 300);
          };
          /**
           * 翻转
           */
          $scope.rotate = function () {
            i = 1;
            angular.element(jQuery("#ngdialog"+$scope.random)).find(".ngdialog-content-picture").css({
              transform: 'rotate(' + rotate * num + 'deg)'
            });
            num++;
          };
          /**
           * 上一张
           */
          $scope.previous = function () {
            var index = selPage - 1;
            if (index < 0 || index > (cameraList.length - 1)) return;
            var data = cameraList[index];
            var title = titleList[index];
            $scope.checkBigImg(index, data, title);
            
          };
          /**
           * 下一张
           */
          $scope.next = function () {
            var index = selPage + 1;
            if (index < 0 || index > (cameraList.length - 1)) return;
            var data = cameraList[index];
            var title = titleList[index];
            $scope.checkBigImg(index, data, title);
          };
          /**
           * 绑定事件
           */
          function bindEvt() {
            angular.element(jQuery("#ngdialog"+$scope.random)).find(".dialog-img").bind('error', function() {
              angular.element(jQuery("#ngdialog"+$scope.random)).find(".ngdialog-content-picture").css({
                width: "140px",
                height: "140px",
                top: (($window.innerHeight - 140)/2).toFixed() + "px",
                left: (($window.innerWidth - 140)/2).toFixed() + "px"
              });
            });
          }
          /**
           * 切换图片
           */
          $scope.checkBigImg = function (index, data, title) {
            num = 0;
            selPage = index;
            
            $timeout(function () {
              $scope.title=title||null;
              $scope.rotate();
              $scope.preTrue = !(index === 0);
              $scope.nextTrue = !(index === (cameraList.length - 1));
            });
            
            var image = new Image();
            image.src = data;
            var width = image.width;
            var height = image.height;
            var ww = $window.innerWidth;
            var wh = $window.innerHeight - 50;
            if (width < ww && height < wh) {
              width = width;
              height = height;
            } else {
              var scale_x = width / ww;
              var scale_y = height / wh;
              if (scale_x > scale_y) {
                width = ww;
                height = parseInt(height / scale_x);
              } else {
                width = parseInt(width / scale_y);
                height = wh;
              }
            }
            var left = ((ww - width) / 2).toFixed();
            var top = ((wh - height) / 2 +50).toFixed();
            

            angular.element(jQuery("#ngdialog"+$scope.random)).css({
              'display':'block'
            });
            angular.element(jQuery("#ngdialog"+$scope.random)).find(".ngdialog-content-picture").css({
              width: width + "px",
              height: height + "px",
              top: top + "px",
              left: left + "px"
            });
            angular.element(jQuery(".dialog-img")).attr("src", cameraList[index]);
            bindEvt();
            mouseEvt();
            scrollEvt();
          }
        }
      };
    });
})();
