const app = getApp();
let chart;
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({
  data: {
    imageUrl3: '../../images/details2.png',
    imageUrl4: '../../images/control1.png',
    userId: '',
    uuid: '',
    percent: "", 
    hiddenmodalput: true,
    setUse: '',
    setUseTrue: '100',
    mouthElectricity: '',
    colorOpen: '#FF8225',
    colorClose: '#7C879B',
    switch1Checked: false,
    echart: '1',
    currentData: '0',
    // 日期选择
    dateTimeArray: '',
    dateTime: '',
    dateTimeArray1: '',
    dateTime1: '',
    startYear: 2020,
    endYear: 2021,
    leftTime: '',
    color: '',
    status: '',
    statusC: '',
    statusO: '',
    // 日期选择
    dataDate: ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06','2018-10-07','2018-10-08','2018-10-09','2018-10-10','2018-10-11','2018-10-12','2018-10-13','2018-10-14','2018-10-15','2018-10-16'],
    dataEvent: ['分闸','合闸','合闸','分闸','分闸','合闸','合闸','合闸','分闸','分闸','合闸','合闸','合闸','分闸','分闸','合闸'],
    dataCharacter: ['手动','手动','网络','网络','网络','手动','网络','网络','网络','网络','网络','手动','网络','网络','手动','网络']
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '远程控制' 
    })
    var uuid = options.key
    this.setData({
      uuid: uuid
    })
    // wx.request({
    //   url: 'url',
    //   // 获取到当月使用的电量为 mouthElectricity
    // })
    this.setData({
      mouthElectricity: '30'
    })
    console.log(options.key)
    var dateTime = new Date()
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());
    var milliseconds = now_new - dateTime;
    var time = year + '-' + month + '-' + day;
    console.log(time)
    this.setData({
      leftTime: time
    })
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfhORGvpSlhxkw',
      method: 'POST',
      data: {
        'params': {
          action: 'get_rtdata',
          mcb_id: uuid,
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
        var statusC = res.data.data[0].Ss_c
        var statusO = res.data.data[0].Ss_o
        this.setData({
          statusC: statusC,
          statusO: statusO
        })
        if (statusC === '1' && statusO === '0') {
          this.setData({
            colorClose: '#FF8225',
            colorOpen: '#7C879B'
          })
        } else {
          this.setData({
            colorClose: '#7C879B',
            colorOpen: '#FF8225'
          })
        }
      }
    })
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
        var locked
        for (var i = 0; i < res.data.data.length; i++) {
          if (uuid === res.data.data[i].serial_number_id) {
            locked = res.data.data[i].locked;
            break;
          }
        }
        if (locked === '1') {
          this.setData({
            color: 'red',
            status: '锁定'
          })
        } else {
          this.setData({
            color: 'green',
            status: '未锁定'
          })
        }
      } 
    })
    this.calculation()
    // 日期选择
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    obj.dateTimeArray.splice(5,1)
    obj.dateTimeArray.splice(4,1)
    obj.dateTime.splice(5,1)
    obj.dateTime.splice(4,1)
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    });
    // 日期选择
  },
  // 时间选择器
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
    var dateTime = e.detail.value
    console.log(e.detail.value)
    var leftTime = this.data.dateTimeArray[0][this.data.dateTime[0]]+'-'+this.data.dateTimeArray[1][this.data.dateTime[1]]+'-'+this.data.dateTimeArray[2][this.data.dateTime[2]]
    console.log(Date.parse(leftTime))
    leftTime = Date.parse(leftTime) - 604800000
    console.log(leftTime)
    dateTime = new Date(leftTime)
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());
    var milliseconds = now_new - dateTime;
    var leftTime = year + '-' + month + '-' + day;
    console.log(leftTime)
    this.setData({
      leftTime: leftTime
    })
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  // 滚动播放列表
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    } else{
      that.setData({
        currentData: e.target.dataset.current
      })
    }
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
   // modal显示按钮
  modal: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
   // modal取消按钮
  cancel: function(){
    this.setData({
      hiddenmodalput: true
    })
   },
   // modal确认按钮
   confirm: function(){
    this.setData({
      hiddenmodalput: true,
      setUseTrue: this.data.setUse
    })
    this.calculation()
   },
   // 获取用户在界面设置的用电量
   getinput: function (e) {
    this.setData({
      setUse: e.detail.value
    })
  },
  // 获取用户在界面锁的状态
  switch1Change: function (e){
    console.log(e.detail.value)
  },
  //开关
  btnOpen: function () {
    wx.request({
      url: 'https://33cd4c4cb1724fe4864cb474c223ffa6-cn-shanghai.alicloudapi.com/a123lq4yrzJIS07N/bfRNfpn3FOk9i4',
      method: 'POST',
      data: {
        'params': {
          action: 'node_b32e5b40',
          uuid: this.data.uuid,
          func: 'breaker',
          user_code: 'root',
          src: 'local',
          act: 'true'
        },
        'version': '1.0', 
        'id': '12', 
        'request': {'apiVer':'1.0.0'}
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // wx.navigateTo({
        //   url: '/pages/control2/control2?key='+this.data.uuid,
        // })
        this.onReady()
      }
    })
  },
  btnClose: function () {
    wx.request({
      url: 'https://33cd4c4cb1724fe4864cb474c223ffa6-cn-shanghai.alicloudapi.com/a123lq4yrzJIS07N/bfRNfpn3FOk9i4',
      method: 'POST',
      data: {
        'params': {
          action: 'node_b32e5b40',
          uuid: this.data.uuid,
          func: 'breaker',
          user_code: 'root',
          src: 'local',
          act: 'false'
        },
        'version': '1.0', 
        'id': '12', 
        'request': {'apiVer':'1.0.0'}
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // wx.navigateTo({
        //   url: '/pages/control2/control2?key='+this.data.uuid,
        // })
        this.onReady()
      }
    })
  },
  onReady: function () {
  },
  // 滑块实现
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  detailsGo: function () {
    this.setData({
      currentData: '1'
    })
  },
  controlGo: function () {
    this.setData({
      currentData: '0'
    })
  }
})