// pages/uploadImage/uploadImage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURL: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  imageUpload: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(that.data.imageUuidChange)
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
    this.setData({
      upLoad: '1'
    })
  },
  uploadImage(fileURL) {
    console.log(this.data.imageUuidChange)
    wx.cloud.uploadFile({
      // cloudPath: this.data.imageUuidChange +'.png', // 上传至云端的路径
      cloudPath: '2p' +'.png',
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        //获取文件路径
        this.setData({
          imgURL:res.fileID
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})