// pages/binding/binding.js
const util = require('../../utils/util.js');
const check_del = '' // check_del 0  绑定uuid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCodeMsg: '',
    uuid: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设备绑定' 
    })
  },
  scanCode: function() {
    var that = this;
    var userId = wx.getStorageSync("userId");
    wx.scanCode({ //扫描微信API
      success(res) { //成功
        console.log(res) //输出回调信息
        var result = res.result
        var scanCode = result.split('/')
        that.setData({
          scanCodeMsg: result     // 在这里修改了   
        })
        wx.showToast({
          title: scanCode,
          duration: 1000,
          icon:'none'  
        })
        wx.request({
          url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfGfvlGa9SOJIX', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            'params': {
              action: 'check_del',
              userId: userId,
              uuid: result,             //scanCode[1]
              bindingTime: util.formatTime(new Date()),
              del: '0',
              supuser: '0'
            },
            // Date.parse(new Date())/1000
            'version': '1.0', 
            'id': '12', 
            'request': {'apiVer':'1.0.0'}
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            if (res.data.data.status === 200) {
              wx.showToast({
                title: '绑定成功',   
                duration: 1000,    
                icon:'none'      
              });
            } else if (res.data.data.status === 400 || res.data.data.status === undefined) {
              wx.showToast({
                title: '绑定失败',   
                duration: 1000,    
                icon:'none'      
              });
            }
          } 
        })
      }
    })
  },
  input: function (e) {
    var uuid = e.detail.value
    this.setData({
      uuid: uuid
    })
  },
  binding: function () {
    var userId = wx.getStorageSync("userId");
    console.log(this.data.uuid)
    console.log(userId)
    var time = util.formatTime(new Date())
    console.log(time)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfGfvlGa9SOJIX', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'check_del',
          userId: userId,
          uuid: this.data.uuid,
          bindingTime: util.formatTime(new Date()),
          del: '0',
          supuser: '0'
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
        console.log(res.data.data.status)
        if (res.data.data.status === 200) {
          wx.showToast({
            title: '绑定成功',   
            duration: 1000,    
            icon:'none'      
          });
        } else if (res.data.data.status === 400 || res.data.data.status === undefined) {
          wx.showToast({
            title: '绑定失败',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })
  }
})