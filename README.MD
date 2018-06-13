## 指令说明
> 点击图片查看大图   
大图旋转、轮播、鼠标滚轮放大或缩小、拖拽
## 使用示例   
> 组件参数说明     
```
  cameraList:'=',     //图片列表(array, [{url: '图片地址', title: '图片名称',single:true}]) 
                      //single: true不显示切换按钮，false显示切换；默认false，非必须属性
  needlessSize:'=',   //选填(boolean, 默认false) true:自定义图片大小;false:沿用组件默认大小
  width:'=',          //选填(int,单位：px,eg:200,默认100) needlessSize为false时无效
  height:'=',         //选填(int,单位：px,eg:200,默认100) needlessSize为false时无效
  background:'='      //选填(string, 默认rgba(0,0,0,0.1)，eg:'black'/'#000'/'rgb(0,0,0)'/'rgba(0,0,0,0)')   
```   

> package.json   

```json
{
  "dependencies":{
    "img-views": "JSer-yj/img-views.git"
  }
}
```    

> 执行 npm install       

> html页面：   

```html
<img-views needless-size="true" width="180" height="130" camera-list="cameraList"></img-views>
```

> angular controller：   

```javascript
$scope.cameraList=[
  {url:'your url',title:'your title',single:true},
  //...
];
```
