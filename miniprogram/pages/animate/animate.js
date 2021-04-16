Page({
// 这里是pages/page/index.js
//首先获取小程序实例，访问app.js中的函数
// this.app = getApp();
//调用show函数，传参
//注意：查看上面show函数定义查看参数含义
//第一个参数是当前的页面对象，方便函数setData直接返回数据
//第二个参数是绑定的数据名,传参给setData，详细见上面
//第三个参数是上下滑动的px,因为class="init"定义初始该元素向下偏移了200px，所以这里使其上移200px
//第四个参数是需要修改为的透明度，这里是1，表示从初始的class="init"中定义的透明度0修改到1
// this.app.slideupshow(this, 'slide_up1', -200, 1)
  /**
   * 页面的初始数据
   */
  data: {

  },
//onload时获取小程序实例
onLoad: function (options) {
  this.app = getApp()
},
//页面展示时，触发动画
onShow: function () {
  this.app.slideupshow(this, 'slide_up[1]', -200, 1)
  setTimeout(function () {
    this.app.slideupshow(this, 'slide_up[2]', -200, 1)
  }.bind(this), 2000);
},
//页面隐藏时，触发渐出动画
onHide: function () {
   //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
  this.app.slideupshow(this, 'slide_up[1]', 200, 0)
  //延时展现容器2，做到瀑布流的效果，见上面预览图
  setTimeout(function () {
    this.app.slideupshow(this, 'slide_up[2]', 200, 0)
  }.bind(this), 200);
}
})