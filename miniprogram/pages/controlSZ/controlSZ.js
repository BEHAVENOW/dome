// pages/controlSZ/controlSZ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameId: '',
    hiddenmodalput: true,
    id: '',
    ip: '',
    time: '',
    uuid: '',
    custom: 'disappear',
    // 下拉框
    // coverTitle: '请选择',
    conditionList: ['空调','灯','卫生间','厨房','自定义'],
  choosedCondition: {
    title: '请选择'
  },
  conditionVisible: false,
  },
  onLoad: function (options) {
    var key = options.key
    // console.log(key)
    this.setData({
      uuid: key
    })
    var userId = wx.getStorageSync("userId");
    // console.log(userId)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfai4COzgY4E3Q', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'check_info',
          userId: userId,
          uuid: key
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
        this.setData({
          ip: res.data.data.share_list[0].IPAdress,
          id: res.data.data.share_list[0].serial_number_id,
          time: res.data.data.share_list[0].bindingTime,
          nameId: res.data.data.share_list[0].context
        })
      } 
    })
  },
  showCondition() {
		this.setData({
			conditionVisible: !this.data.conditionVisible
		})
	},
	// 改变查询项
	onChnageCondition(e) {
    var name = e.currentTarget.id
    if (name !== '自定义') {
      this.setData({
        nameId: name,
        custom: 'disappear'
      })
    } else {
      this.setData({
        custom: 'custom'
      })
      name = ''
    }
    var userId = wx.getStorageSync("userId");
    // console.log(this.data.uuid)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bf7l84CrS4Cohh', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'change_context',
          userId: userId,
          uuid: this.data.uuid,
          context: name
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
        
      }
    })
  },
  share: function () {
    var uuid = this.data.uuid
    wx.navigateTo({
      url: '/pages/equipment/equipment?key='+uuid,
    })
  },
  list1: function () {
    this.setData({
      //注意到模态框的取消按钮也是绑定的这个函数，
      //所以这里直接取反hiddenmodalput，也是没有毛病
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function(){
    this.setData({
     hiddenmodalput: true
    })
     
   },
   //确认
   confirm: function(){
    this.setData({
      hiddenmodalput: true
    })
    var userId = wx.getStorageSync("userId");
    // console.log(this.data.uuid)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bf7l84CrS4Cohh', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'change_context',
          userId: userId,
          uuid: this.data.uuid,
          context: this.data.nameId
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
        wx.showToast({
          title: '修改成功',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
    // var userId = wx.getStorageSync("userId");
    // wx.request({
    //   url: 'http://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bf7l84CrS4Cohh', //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   data: {
    //     'params': {
    //       action: 'check_info',
    //       userId: userId,
    //       uuid: key
    //     },
    //     // Date.parse(new Date())/1000
    //     'version': '1.0', 
    //     'id': '12', 
    //     'request': {'apiVer':'1.0.0'}
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       ip: res.data.data.share_list[0].IPAdress,
    //       id: res.data.data.share_list[0].serial_number_id,
    //       time: res.data.data.share_list[0].bindingTime,
    //       nameId: res.data.data.share_list[0].context
    //     })
    //   } 
    // })
   },
   getinput: function (e) {
     var name = e.detail.value
     this.setData({
       nameId: name
     })
    //  var userId = wx.getStorageSync("userId");
    // console.log(this.data.uuid)
    // wx.request({
    //   url: 'http://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bf7l84CrS4Cohh', //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   data: {
    //     'params': {
    //       action: 'change_context',
    //       userId: userId,
    //       uuid: this.data.uuid,
    //       context: name
    //     },
    //     // Date.parse(new Date())/1000
    //     'version': '1.0', 
    //     'id': '12', 
    //     'request': {'apiVer':'1.0.0'}
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
   },
   delete: function () {
    var userId = wx.getStorageSync("userId");
    var uuid = this.data.uuid
    wx.showModal({
      title: '提示',
      content: '您确定要删除设备吗',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.setStorageSync('token', '');//将token置空
          // console.log(this.data.uuid)
          wx.request({
            url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfGfvlGa9SOJIX', //仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
              'params': {
                action: 'check_del',
                userId: userId,
                uuid: uuid,
                del: '1',
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
              if (res.data.data.status === 200) {
                wx.showToast({
                  title: '删除成功',   
                  duration: 1000,    
                  icon:'none'      
                })
                setTimeout(()=>{
                  wx.navigateBack({
                    delta: 2,
                  })
                },1000)
              } else {
                wx.showToast({
                  title: '删除失败',   
                  duration: 1000,    
                  icon:'none'      
                });
              }
            } 
          })
        } else {}
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  

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