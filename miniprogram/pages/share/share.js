const app = getApp();
var util = require('../../utils/util.js')

Page({
  data: {
    dataName: '',
    dataAge: '',
    inputContent: '',
    length: '',
    id: ''
  },
  bindChange: function(e) {
    var id = e.detail.value
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfMeDkyHXQISVQ', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'share',
          userId: userId,
          uuid: '',
          shareId: id
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
        var uuid = []
        for (var i = 0; i < res.data.data.uuid.length; i++) {
          uuid[i] = res.data.data.uuid[i].serial_number_id
        }
        console.log(res)
        console.log(res.data.data.status)
        if (res.data.data.status === 200 && res.data.data.uuid !== '请绑定设备') {
          this.setData({
            uuid: uuid
          })
        } else {
          wx.showToast({
            title: '当前无设备',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })


    this.setData ({
      inputContent: id
    })
    
  },
  btn: function () {
    var time = util.formatTime(new Date())
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        name: this.data.inputContent,
        time: time
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        this.obtain()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
      }
    })
  },
  obtain: function () {
    var _this = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'weiduan-9gtmiw7oa0914f23'
    })
    db.collection('user').get({
      success: res => {
        var dataName = [];
        var dataTime = [];
        var dataId = [];
        var length = res.data.length
        for(let i = 0; i < res.data.length; i++){
          dataName[i] = res.data[i].name;
          dataTime[i] = res.data[i].time;
          dataId[i] = res.data[i]._id;
        }
        this.setData({
          dataName: dataName,
          dataTime: dataTime,
          length: length,
          id: dataId
        })
      }
    })
  },
  delete: function (e) {
    console.log(e.target.id)
    var id = e.target.id
    if (id) {
      const db = wx.cloud.database()
      db.collection('user').doc(id).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',
            count: null,
          })
          this.obtain()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  }

  // 很丑的开关样式
  // switchEvent: function (e) {
  //   if (e.detail.value === true) {
  //     this.setData({
  //       openBg: '#15b938',
  //       closeBg: '#bfbfbf'
  //     })
  //   } else {
  //     this.setData({
  //       openBg: '#15b938',
  //       closeBg: '#bfbfbf'
  //     })  
  //   }
  // },
  // buttonEventOpen: function (e) {
  //     this.setData({
  //       checked: true,
  //       openBg: '#15b938',
  //       closeBg: '#bfbfbf'
  //     })
  // },
  // buttonEventClose: function (e) {
  //     this.setData({
  //       checked: false,
  //       closeBg: '#15b938',
  //       openBg: '#bfbfbf',
  //     })
  // }
});