const app = getApp();
Page({
  data: {
    imageUrl1: '../../images/data.png',
    imageUrl2: '../../images/alarm1.png',
    imageUrl3: '../../images/details2.png',
    imageUrl4: '../../images/control1.png',
    image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3398023316,2296967647&fm=26&gp=0.jpg',
    userId: '',
    uuid: '',
    soe_cnt: '',
    sce_cnt: '',
    vdc: '',
    pha_adc: '',
    wh_c: '',
    wh_l: '',
    device_model: '',
    imageUrl: ''
  },
  onLoad: function (options) {
    // var uuid = options.key[0]
    var uuid = options.key
    wx.setNavigationBarTitle({
      title: uuid
    })
    this.setData({
      uuid: uuid
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
        var device_model
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].serial_number_id === uuid) {
            device_model = res.data.data[i].device_model
            break
          }
        }
        if (device_model === '1P') {
          this.setData({
            imageUrl: 'https://7765-weiduan-9gtmiw7oa0914f23-1304768469.tcb.qcloud.la/1p.png?sign=e6cd6ee816ea98befac8b34965aeeceb&t=1616719188'
          })
        } else if (device_model === '2P') {
          this.setData({
            imageUrl: 'https://7765-weiduan-9gtmiw7oa0914f23-1304768469.tcb.qcloud.la/2p.png?sign=562193db3b7789767fecdd2a740dfaf0&t=1616735911'
          })
        } else if (device_model === '3P') {
          this.setData({
            imageUrl: 'https://7765-weiduan-9gtmiw7oa0914f23-1304768469.tcb.qcloud.la/3p.png?sign=1481d743fc8e63de998291f0d0642985&t=1616735920'
          })
        } else {
          this.setData({
            imageUrl: 'https://7765-weiduan-9gtmiw7oa0914f23-1304768469.tcb.qcloud.la/4p.png?sign=198836ae406f8eb3694eb8caf09b1222&t=1616735927'
          })
        }
        
      } 
    })
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfCsucytp8YRIp',
      method: 'POST',
      data: {
        'params': {
          action: 'get_photo_info',
          uuid: uuid,
          condition: 'all'
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
        var soe_cnt = res.data.data.analog_tab[0].Soe_cnt
        var sce_cnt = res.data.data.analog_tab[0].Sce_cnt
        var vdc = res.data.data.analog_tab[0].Vdc1
        var pha_adc = res.data.data.analog_tab[0].phA_adc
        var wh_c = res.data.data.analog_tab[0].Wh_c
        var wh_l = res.data.data.analog_tab[0].Wh_l
        this.setData({
          soe_cnt: soe_cnt,
          sce_cnt: sce_cnt,
          vdc: vdc,
          pha_adc: pha_adc,
          wh_c: wh_c,
          wh_l: wh_l
        })
      }
    })
  },
  // 计算当前使用的情况
  calculation: function () {
    if (this.data.setUseTrue === '') {
      this.setData({
        percent: '0'
      })
    } else {
      var electricity = (this.data.mouthElectricity / this.data.setUseTrue)*100
      electricity = parseInt(electricity)
      this.setData({
        percent: electricity
      })
    } 
  },
  // 实时监测跳转界面
  monitorGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/data/data?key='+key,
    })
  },
  // 实时监测跳转界面
  alarmGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/alarm/alarm?key='+key,
    })
  },
  // 用电查询跳转界面
  detailsGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/details1/details1?key='+key,
    })
  },
  // 远程控制跳转界面
  controlGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/control2/control2?key='+key,
    })
  },
  // 设置跳转界面
  spot: function () {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/controlSZ/controlSZ?key='+key,
    })
  },
})