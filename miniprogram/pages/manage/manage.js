// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: '',
    time: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设备管理' 
    })
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfMomFzfgmuLsR', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'checkout',
          userId: userId,
        },
        // Date.parse(new Date())/1000
        'version': '1.0', 
        'id': '12', 
        'request': {'apiVer':'1.0.0'}
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        var uuid = []
        var time = []
        var name = []
        var status = []
        for (var i = 0; i < res.data.data.length; i++) {
          uuid[i] = res.data.data[i].serial_number_id
          time[i] = res.data.data[i].bindingTime
          name[i] = res.data.data[i].context
          status[i] = res.data.data[i].status
        }
        console.log(res)
        console.log(res.data.data.status)
        // if (res.data.data.code === 200) {
          this.setData({
            uuid: uuid,
            time: time,
            name: name,
            status: status
          })
        // } else {
        //   wx.showToast({
        //     title: '当前无设备',   
        //     duration: 1000,    
        //     icon:'none'      
        //   });
        // }
      } 
    })
  },
  manage: function (e) {
    console.log(e)
    var key = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/controlSZ/controlSZ?key='+key,
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
    this.onLoad()
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