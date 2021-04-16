//获取应用实例
const app = getApp()
var isFirst = true;
var isSiFirst = true;
Page({
  data: {
    percent: "20",     // 初始进度条百分数
    sw: 6,             // 初始进度条宽度
    pc: '#00ff00', 
    pbc: '#cccccc',
    isActive: true,
    isSi: true,
  },
 
  onLoad: function () {
 
  },
  //进度条输入事件
  progressInput: function (e) {
    this.setData({
      percent: e.detail.value
    })
  },
  //设置宽度事件
  swInput: function (e) {
    this.setData({
      sw: e.detail.value
    })
  },
  //设置进度条颜色事件
  pcInput: function (e) {
    this.setData({
      pc: e.detail.value
    })
  },
  //未选择的进度条的颜色事件
  pbcInput: function (e) {
    this.setData({
      pbc: e.detail.value
    })
  },
  //设置进度条从左往右的动画
  bindButton: function (e) {
    console.log(isFirst);
    if (isFirst == true) {
      isFirst = false;
      this.setData({
        isActive: false,
      })
    } else {
      isFirst = true;
      this.setData({
        isActive: true,
      })
    }
  },
  //设置进度条右侧显示百分比
  bindButton1: function (e) {
    if (isSiFirst == true) {
      isSiFirst = false;
      this.setData({
        isSi: false,
      })
 
    } else {
      isSiFirst = true;
      this.setData({
        isSi: true,
      })
    }
  },
})