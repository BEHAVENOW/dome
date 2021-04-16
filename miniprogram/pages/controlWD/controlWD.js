// pages/controlWD/controlWD.js
const checkout = ''  // checkout 输入useId 获取各种数据
const lockon = '' // lockon 可以锁定的功能

Page({

  /**
   * 页面的初始数据
   */
  data: {
    electric: '11',
    power: '2212',
    state1: '锁定',
    state2: '解锁',
    uuid: '',
    protect: '漏电保护',
    gate1: '合闸',
    gate2: '分闸',
    statusC: '',
    statusO: '',
    phV: '',
    phA: '',
    locking: '',
    bindingOwen: '',
    equimentName: '',
    equiment: '',
    slide_up: ['slide_up0','slide_up1','slide_up2','slide_up3'],
    conditionVisible: false,
    heightH: '',
    imgURL: '',
    upLoad: '',
    imageUuidChange: '',
    whValue: '',
    nane: '',
    status: ''
    // status: 'hidden'
  },
  
  // spot: function () {
  //   wx.navigateTo({
  //     url: '/pages/controlSZ/controlSZ',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(() => {
    //   this.setData({
    //     status: ''
    //   })
    // }, 5000)
    // this.app = getApp()
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
        var statusC = []
        var statusO = []
        var phV = []
        var phA = []
        var locking = []
        var binding = []
        var equimentName = []
        var equiment = []
        var whValue = []
        var status = []
        var device_model = []
        // if (res.data.data.uuid.online_list.length <= 6) {
        //   this.setData({
        //     conditionVisible: false
        //   })
        // } else {
        //   var h = (res.data.data.uuid.online_list.length/6 + 1) * 100
        //   this.setData({
        //     conditionVisible: true,
        //     heightH: h
        //   })
        // }
        for (let i = 0; i < res.data.data.length; i++) {
          // if (res.data.data[i].status === '在线') {
            status[i] = res.data.data[i].status
            uuid[i] = res.data.data[i].serial_number_id
            statusC[i] = res.data.data[i].Ss_c
            statusO[i] = res.data.data[i].Ss_o
            phV[i] = res.data.data[i].phV_mes
            phA[i] = res.data.data[i].phA_mes
            locking[i] = res.data.data[i].locked
            // binding[i] = res.data.data[i].bindingTime
            equimentName[i] = res.data.data[i].context
            whValue[i] = res.data.data[i].wh_c
            device_model[i] = res.data.data[i].device_model
          // }
          //  else {
          //   status[i] = res.data.data[i].status
          //   uuid[i] = res.data.data[i].serial_number_id
          //   statusC[i] = 0
          //   statusO[i] = 0
          //   phV[i] = 0
          //   phA[i] = 0
          //   locking[i] = 0
          //   // binding[i] = res.data.data[i].bindingTime
          //   equimentName[i] = 0
          //   whValue[i] =0
          // }
          // if (equimentName[i] === '厨房') {
          //   equiment[i] = 'kitchen'
          // } else if (equimentName[i] === '灯') {
          //   equiment[i] = 'lamp'
          // } else if (equimentName[i] === '卫生间') {
          //   equiment[i] = 'toilet'
          // } else if (equimentName[i] === '空调') {
          //   equiment[i] = 'airconditioner'
          // } else {
          //   equiment[i] = uuid[i]
          // }
          // if (equimentName[i] === '空调') 
        }
        if (res.data.code === 200) {
          this.setData({
            uuid: uuid,
            statusC: statusC,
            statusO: statusO,
            phV: phV,
            phA: phA,
            locking: locking,
            bindingOwen: binding,
            equimentName: equimentName,
            equiment: equiment,
            whValue: whValue,
            status: status,
            device_model: device_model
          })
        } else {
          wx.showToast({
            title: '当前无设备',   
            duration: 1000,    
            icon:'none'      
          });
        }
        // var nane = []
        // allUuid.forEach(res => {
        //   let index = uuid.indexOf(res)
        //   if (index === -1) {
        //     nane.push(res)
        //   }
        // })
        // this.setData({
        //   nane: nane
        // })
        // console.log(nane)
      } 
    })
    
  },
  view: function (e) {
    // var uuid = this.data.uuid[e.currentTarget.id]
    // var device_model = this.data.device_model[e.currenTarget.id]
    var key = this.data.uuid[e.currentTarget.id]
    // key.push(uuid)
    // key.push(device_model)
    var canUse = this.data.locking[e.currentTarget.id]
    if (this.data.bindingOwen === '') {
      if (canUse === 0) {
      wx.navigateTo({
        url: '/pages/home1/home1?key=' + key,
      })
    } else {
        wx.showToast({
          title: '当前设备暂不支持使用',   
          duration: 1000,    
          icon:'none'      
        });
    }
    } else {
      wx.navigateTo({
        url: '/pages/home1/home1?key=' + key,
      })
    }
    
  },
  imageUpload: function(e) {
    console.log(e)
    console.log(e.target.id)
    this.setData({
      imageUuidChange: e.target.id
    })
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(that.data.imageUuidChange)
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
    this.setData({
      upLoad: '1'
    })
  },
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      // cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      cloudPath: this.data.imageUuidChange +'.png',
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        //获取文件路径
        this.setData({
          imgURL:res.fileID
        })
        wx.showToast({
          title: '加载图片20Min',
        })
        setTimeout(() => {
          this.onShow()
        },2000)
      },
      fail: console.error
    })
  },
  onShow: function () {
    this.onLoad()
    // this.app.slideupshow(this, 'slide_up0', -200, 1)
    // setTimeout(function () {
    //   this.app.slideupshow(this, 'slide_up1', -200, 1)
    // }.bind(this), 500);
    // setTimeout(function () {
    //   this.app.slideupshow(this, 'slide_up2', -200, 1)
    // }.bind(this), 1000);
    // setTimeout(function () {
    //   this.app.slideupshow(this, 'slide_up3', -200, 1)
    // }.bind(this), 1500);
  },
  onHide: function () {
    //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
  //  this.app.slideupshow(this, 'slide_up0', 200, 0)
  //  //延时展现容器2，做到瀑布流的效果，见上面预览图
  //  setTimeout(function () {
  //    this.app.slideupshow(this, 'slide_up1', 200, 0)
  //  }.bind(this), 500);
  //  setTimeout(function () {
  //   this.app.slideupshow(this, 'slide_up2', -200, 0)
  // }.bind(this), 1000);
  // setTimeout(function () {
  //   this.app.slideupshow(this, 'slide_up3', -200, 0)
  // }.bind(this), 1500);
 },

  locking: function (e) {
    // console.log(e)
    var locking = !this.data.locking[e.currentTarget.id]
    var uuid = this.data.uuid[e.currentTarget.id]
    var userId = wx.getStorageSync("userId");
    // console.log(locking)
    // console.log(uuid)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfDL8wTMR4NIpO', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'lockon',
          userId: userId,
          uuid: uuid,
          lock: locking
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
        // console.log(res)
        // console.log(res.data.data.status)
        if (res.data.data.status === 200) {
          this.onLoad()
        } else {
          wx.showToast({
            title: '当前设备暂不可使用',   
            duration: 1000,    
            icon:'none'      
          });
        }
      } 
    })
  },
  
  //下拉刷新
  // onPullDownRefresh:function()
  // {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
    
  //   //模拟加载
  //   setTimeout(function()
  //   {
  //     // complete
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   },1500);
  // },

  // 跳转网页接口
  out: function () {
    wx.navigateTo({
      url: '/pages/out/out',
    })
  },
  // 跳转网页接口
 
  onReady: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    // this.onLoad()
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})