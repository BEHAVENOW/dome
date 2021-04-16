// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
    list: ['微断合位','微断分位','齿轮闭锁','自动/检修','参数修改告警','微断清零告警','上电告警','电流越限告警','高压故障','短路过流故障','漏电故障','漏电自检告警','重合闸告警','火线过热告警','设备重启告警','微断异常告警','停电告警','功率过载故障','过压告警','低压告警']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uuid = options.key
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfhORGvpSlhxkw', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'get_rtdata',
          uuid: uuid,
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
        var Ss_c = res.data.data[0].Ss_c,
        Ss_o = res.data.data[0].Ss_o,
        Gear_as = res.data.data[0].Gear_as,
        Overhaul = res.data.data[0].Overhaul,
        Alm_md = res.data.data[0].Alm_md,
        Alm_clear = res.data.data[0].Alm_clear,
        Alm_PwrOn = res.data.data[0].Alm_PwrOn,
        Alm_Ptoc = res.data.data[0].Alm_Ptoc,
        Mf_hv = res.data.data[0].Mf_hv,
        Mf_oc = res.data.data[0].Mf_oc,
        Mf_lk = res.data.data[0].Mf_lk,
        Alm_lk_st = res.data.data[0].Alm_lk_st,
        Alm_rc = res.data.data[0].Alm_rc,
        Alm_tmp = res.data.data[0].Alm_tmp,
        Alm_rst = res.data.data[0].Alm_rst,
         S_warn = res.data.data[0].S_warn,
         Alm_PwrOff = res.data.data[0].Alm_PwrOff, 
         Mf_op = res.data.data[0].Mf_op,
         Alm_Ptov = res.data.data[0].Alm_Ptov,
         Alm_Ptuv = res.data.data[0].Alm_Ptuv
         var listData = []
         listData.push(Ss_c,Ss_o,Gear_as,Overhaul,Alm_md,Alm_clear,Alm_PwrOn,Alm_Ptoc,Mf_hv,Mf_oc,Mf_lk,Alm_lk_st,Alm_rc,Alm_tmp,Alm_rst,S_warn,Alm_PwrOff,Mf_op,Alm_Ptov,Alm_Ptuv),
         this.setData({
           listData: listData
         })
      } 
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