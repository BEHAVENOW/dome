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
    this.calculation()
    // 日期选择
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    // 日期选择
  },
  // 时间选择器
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
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
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
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
    this.setData({
      colorClose: '#7C879B',
      colorOpen: '#FF8225'
    })
  },
  btnClose: function () {
    this.setData({
      colorClose: '#FF8225',
      colorOpen: '#7C879B'
    })
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