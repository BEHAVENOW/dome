// pages/sgin/sgin.js
const app = getApp();
const db = wx.cloud.database({});
const cont = db.collection('river_data');
const util = require('../../utils/util.js');

Page({
  data: {
    type: 'password',
    url: '../../images/close.png',
    password: '',
    username: '',
    name: '',
    pwd: '',
    date: ''
  },
  onLoad: function (options) {
    // var _this = this;
    // const db = wx.cloud.database({
    //   //这个是环境ID不是环境名称     
    //   env: 'weiduan-9gtmiw7oa0914f23'
    // })
    // db.collection('sgin').get({
    //   success: res => {
    // var name = [];
    // var password = [];
    // console.log(res.data)
    // console.log(res.data.length)
    // for(let i = 0; i < res.data.length; i++){
    //   name[i] = res.data[i].name;
    //   password[i] = res.data[i].password;
    // }
    //     console.log(name)
    //     this.setData({
    //       name: name,
    //       pwd: password
    //     })
    //   }
    // })
  },

  // 获取用户输入的手机号并且判断输入手机号是否符合规则
  uname: function (e) {
    var username = e.detail.value
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value))) {
      wx.showToast({
        title: '手机号码不符合规则',   
        duration: 1000,    
        icon:'none'      
      });
    } else {
      wx.showToast({
        title: '手机号码符合规则',   
        duration: 100,    
        icon:'none'      
      });
    }
    this.setData({
      username: username
    })
  },

  // 获取用户输入的密码并且判断输入密码是否符合规则
  pwd: function (e) {
    var passworrd = e.detail.value
    var reg = /^[a-zA-Z0-9_-]{8,12}$/;
      if (reg.test(e.detail.value)) {
        wx.showToast({
          title: '密码符合规则',   
          duration: 100,    
          icon:'none'      
        });
      } else {
        wx.showToast({
          title: '密码不符合规则',   
          duration: 1000,    
          icon:'none'      
        });
      }
      this.setData({
        password: passworrd
      })
  },

  // 显示和隐藏密码
  display: function () {
    var that = this;
      this.setData({
        type: 'text',
        url: '../../images/open.png'
      })  
    setTimeout(function () {
      if (that.data.type === 'text') {
        that.setData({
          type: 'password',
          url: '../../images/close.png'
        })
      }
    }, 1000) 
  },

  // 判断当前用户是否可以登录
  btn: function () {
    var uuid = util.uuid();
    var timestamp = Date.parse(new Date())/1000;  
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfBPzul3KqVhP8', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'login',
          userId: this.data.username,
          userPassword: this.data.password,
          create_ts: timestamp,
          page: '/pages/sgin/sgin',
          sup: '0'
        },
        // Date.parse(new Date())/1000
        'version': '1.0', 
        'id': uuid, 
        'request': {'apiVer':'1.0.0'}
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var userId = this.data.username
        wx.setStorageSync("userId", userId);
        if (res.data.data.status === 200) {
          wx.switchTab({
            url: '/pages/controlWD/controlWD',
            })
        } else {
          wx.showToast({
            title: '手机号码错误或者密码输入不正确，请重新输入',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })


    // console.log(this.data.name)
    // for(let i = 0; i < this.data.name.length; i++){
    //   if(this.data.name[i] === this.data.username && this.data.pwd[i] === this.data.password) {
    //     wx.switchTab({
    //     url: '/pages/dome/dome',
    //     })
    //     var k = 1
    //   } 
    // }
    // if (k !== 1) {
    //   wx.showToast({
    //     title: '手机号码错误或者密码输入不正确，请重新输入',   
    //     duration: 1000,    
    //     icon:'none'      
    //   });
    // }
  },

  register: function () {
      wx.navigateTo({
        url: '/pages/register/register',
      })
  }

  /**
   * 生命周期函数--监听页面加载
   */
  

})

