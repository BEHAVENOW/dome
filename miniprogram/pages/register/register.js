// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '../../images/close.png',
    type: 'password',
    username: '',
    password: '',
    name: '',
    pwd: '',
    pwd1: ''
  },
  uname: function (e) {
    // console.log(e.detail.value)
    var username = e.detail.value
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value))) {
      wx.showToast({
      title: '手机号码有误',   
      duration: 1000,    
      icon:'none'      
      });
    } else {
      wx.showToast({
        title: '手机号码正确',   
        duration: 100,    
        icon:'none'      
        });
    }
    this.setData({
      username: username
    })
  },
  pwd: function (e) {
    var reg = /^[a-zA-Z0-9_-]{8,12}$/;
    var pwd = e.detail.value
    if (reg.test(e.detail.value)) {
      wx.showToast({
        title: '密码正确',   
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
      pwd: pwd
    })
  },
  pwd1: function (e) {
    var reg = /^[a-zA-Z0-9_-]{6,16}$/;
    var pwd = e.detail.value
    if (reg.test(e.detail.value)) {
      wx.showToast({
        title: '密码正确',   
        duration: 2000,    
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
      pwd1: pwd
    })
  },
  btn: function (e) {
    if(this.data.pwd === this.data.pwd1 && this.data.pwd !== '' && this.data.username !== '') {
      wx.request({
        url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfukwF9PS5VEZA', //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          'params': {
            action: 'logon',
            userId: this.data.username,
            userPassword: this.data.pwd,    
            sup: '-'       
          },
          'version': '1.0', 
          'id': '12', 
          'request': {'apiVer':'1.0.0'}
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res)
          console.log(res.data.data.status)
          if (res.data.data.status === 200) {
            wx.navigateTo({
              url: '/pages/sgin/sgin',
            })
          } else {
            wx.showToast({
            icon: 'none',
            title: '注册失败'
          })
          }          
        }
      })
    //   const db = wx.cloud.database()
    //   db.collection('sgin').add({
    //     data: {
    //       name: this.data.username,
    //       password: this.data.pwd
    //     }, 
        
    //     success: res => {
    //       // 在返回结果中会包含新创建的记录的 _id
    //       this.setData({
    //         counterId: res._id,
    //         count: 1
    //       })
    //       wx.showToast({
    //         title: '注册成功',
    //       })
         
    //       console.log(1214)
    //     },
        // fail: err => {
        //   wx.showToast({
        //     icon: 'none',
        //     title: '注册失败'
        //   })
        // }
    //   })
      // wx.navigateTo({
      //   url: '/pages/sgin/sgin',
      // })
    // } else {
    //   console.log("注册失败")
       
    }
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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