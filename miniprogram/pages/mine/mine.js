// pages//mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId: '',
    imageUrl: '../../images/my.png'
  },
  share: function () {
    wx.navigateTo({
      url: '/pages/sharemain/sharemain',
    })
  },
  onLoad() {
    var userId = wx.getStorageSync("userId");
    this.setData({
      userId: userId
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // uploadImage: function() {
  //   console.log(123)
  //   // wx.navigateTo({
  //   //   url: '/pages/uploadImage/uploadImage',
  //   // })
  // },
  list1: function () {
    wx.navigateTo({
      url: '/pages/manage/manage',
    })
  },
  binding: function () {
    wx.navigateTo({
      url: '/pages/binding/binding',
    })
  },
  out: function () {
    // wx.reLaunch({
    //   url: '/pages/login/login',
    // })
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          wx.setStorageSync('token', '');//将token置空
          wx.redirectTo({
            url: '/pages/login/login',//跳去登录页
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  time: function() {
    wx.navigateTo({
      url: '/pages/timeOut/timeOut',
    })
  },
  contect: function() {
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },
  imageUpload: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  uploadImage(fileURL) {
    var userId = wx.getStorageSync("userId");
    wx.cloud.uploadFile({
      // cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      cloudPath: userId +'.png',
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        //获取文件路径
        this.setData({
          imgURL:res.fileID
        })
        wx.showToast({
          title: '加载图片20Min',
        })
        setTimeout(() => {
          this.onLoad()
        },2000)
      },
      fail: console.error
    })
  },
})