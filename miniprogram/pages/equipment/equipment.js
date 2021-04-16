const app = getApp();
var util = require('../../utils/util.js')

Page({
  data: {
    shareNumber: '',
    shareNumberTime: '',
    dataAge: '',
    inputContent: '',
    length: '',
    id: '',
    uuid: '',
    shareId: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设备分享' 
    })
    console.log(options.key)
    var uuid = options.key
    this.setData({
      uuid: uuid
    })
  },
  bindChange: function(e) {
    var id = e.detail.value
    this.setData ({
      inputContent: e.detail.value
    })
  },
  btn: function () {
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfMeDkyHXQISVQ', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'share',
          userId: userId,
          uuid: this.data.uuid,
          shareId: this.data.inputContent,
          shareTime: util.formatTime(new Date())
        },
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
            title: '分享成功',   
            duration: 1000,    
            icon:'none'      
          });
          this.obtain()
        } else {
          wx.showToast({
            title: '分享失败',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })
  },
  obtain: function () {
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfkAng7S0bQFsJ', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'share_list',
          userId: userId,
          uuid: this.data.uuid
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
        var shareNumber = []
        var shareNumberTime = []
        var shareId = []
        String.prototype.signMix= function() {
          if(arguments.length === 0) return this;
          var param = arguments[0], str= this;
          if(typeof(param) === 'object') {
            for(var key in param)
              str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
            return str;
          } else {
            for(var i = 0; i < arguments.length; i++)
              str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
            return str;
          }
        }
        for (var i = 0; i < res.data.data.share_list.length; i++) {
          var a = i + 1
          var name = "share_{0}".signMix(a)
          var time = "time_share_{0}".signMix(a)
          if (res.data.data.share_list[i][name] !== undefined) {
            shareNumber.push(res.data.data.share_list[i][name])
            shareNumberTime.push(res.data.data.share_list[i][time])
            shareId.push(i + 1)
          }
        }
        this.setData({
          shareNumber: shareNumber,
          shareNumberTime:  shareNumberTime,
          shareId: shareId
        })
      }
    })
    
  },
  delete: function (e) {
    var userId = wx.getStorageSync("userId");
    String.prototype.signMix= function() {
      if(arguments.length === 0) return this;
      var param = arguments[0], str= this;
      if(typeof(param) === 'object') {
        for(var key in param)
          str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
        return str;
      } else {
        for(var i = 0; i < arguments.length; i++)
          str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return str;
      }
    }
    var index = e.currentTarget.id
    var name = "share_{0}".signMix(index)
    console.log(name)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfvOMEOOCKQesN', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'del_share',
          userId: userId,
          uuid: this.data.uuid,
          share: name
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
        if (res.data.data.status === 200) {
          wx.showToast({
            title: '删除成功',   
            duration: 1000,    
            icon:'none'      
          });
          this.obtain()
        } else {
          wx.showToast({
            title: '删除失败',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })
  //   console.log(e.target.id)
  //   var id = e.target.id
  //   if (id) {
  //     const db = wx.cloud.database()
  //     db.collection('user').doc(id).remove({
  //       success: res => {
  //         wx.showToast({
  //           title: '删除成功',
  //         })
  //         this.setData({
  //           counterId: '',
  //           count: null,
  //         })
  //         this.obtain()
  //       },
  //       fail: err => {
  //         wx.showToast({
  //           icon: 'none',
  //           title: '删除失败',
  //         })
  //       }
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '无记录可删，请见创建一个记录',
  //     })
  //   }
  }
});

//获取数据库中的分享成员
// var _this = this;
    // const db = wx.cloud.database({
    //   //这个是环境ID不是环境名称     
    //   env: 'weiduan-9gtmiw7oa0914f23'
    // })
    // db.collection('user').get({
    //   success: res => {
    //     var dataName = [];
    //     var dataTime = [];
    //     var dataId = [];
    //     var length = res.data.length
    //     for(let i = 0; i < res.data.length; i++){
    //       dataName[i] = res.data[i].name;
    //       dataTime[i] = res.data[i].time;
    //       dataId[i] = res.data[i]._id;
    //     }
    //     this.setData({
    //       dataName: dataName,
    //       dataTime: dataTime,
    //       length: length,
    //       id: dataId
    //     })
    //   }
    // })
    //获取数据库中的分享成员