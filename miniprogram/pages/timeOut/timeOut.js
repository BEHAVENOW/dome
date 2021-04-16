// pages/timeOut/timeOut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    hour: '',
    minute: '',
    second: '',
    ms: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    setInterval(() => {
      var time = new Date()
      var myTime = new Date(2021,2,19,10,0,0)
      var num = myTime.getTime() - time.getTime()
      var oneDay = (24*60*60*1000)
      var day = parseInt(num/(24*60*60*1000))
      var num = num%(24*60*60*1000)
      var hour = parseInt(num/(60*60*1000))
      var num = num%(60*60*1000)
      var minute = parseInt(num/(60*1000))
      var num = num%(60*1000)
      var second = parseInt(num/1000)
      this.setData({
        day: day,
        hour: hour,
        minute: minute,
        second: second
      })
    }, 1000)
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