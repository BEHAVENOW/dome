//app.js
// const MPServerless = require('/sdk/mpserverless.js');
// const mpServerless = new MPServerless({
//   uploadFile: wx.uploadFile,
//   request: wx.request,
//   getAuthCode: wx.login,
//   getFileInfo: wx.getFileInfo,
//   getImageInfo: wx.getImageInfo,
// }, {
//   appId: 'wx89dedea5b57d6558', // 小程序应用标识
//   spaceId: 'da7d8b8f-892d-4c96-a684-cfd16645e1a2', // 服务空间标识
//   clientSecret: 'viomeNL5qVDmo4+QEcoLUA==', // 服务空间 secret key
//   endpoint: 'https://api.bspapp.com', // 服务空间地址，从小程序 serverless 控制台处获得
// });
App({
  onLaunch: async function () {
    // await mpServerless.user.authorize({
    //   authProvider: 'wechat_openapi',
    // });
    if (!wx.cloud) {
      wx.showToast({
        title: '请使用 2.2.3 或以上的基础库以使用云能力',
        icon: 'warn',
        image: '',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env:"weiduan-9gtmiw7oa0914f23",
      })
    }
    // this.globalData = {}
    
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
      userInfo: null
  },
  // mpServerless,
  //渐入，渐出实现 
  // show : function(that,param,opacity){
  //   var animation = wx.createAnimation({
  //     //持续时间800ms
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   //var animation = this.animation
  //   animation.opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // },

  // //滑动渐入渐出
  // slideupshow:function(that,param,px,opacity){
  //   var animation = wx.createAnimation({
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   animation.translateY(px).opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // },

  // //向右滑动渐入渐出
  // sliderightshow: function (that, param, px, opacity) {
  //   var animation = wx.createAnimation({
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   animation.translateX(px).opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // }
})
