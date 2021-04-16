const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
let lineChart1 = null;
let lineChart2 = null;
Page({
  data: {
    ec: {
      ec: {
        disableTouch: true,
        lazyLoad: true
      },
    },
    dataVoltageValue: ['12','22','23','11','25','33','12','22','23','11','25','33','12','22','23','11','25','33'],
    dataVoltageTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageUrl1: '../../images/data.png',
    imageUrl2: '../../images/alarm1.png',
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
    echart: '1'
  },
  onLoad: function (options) {
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
    this.getChartTestData()
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
  // 实时监测跳转界面
  monitorGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/data/data?key='+key,
    })
  },
  // 实时监测跳转界面
  alarmGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/alarm/alarm?key='+key,
    })
  },
  // 用电查询跳转界面
  detailsGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/details1/details1?key='+key,
    })
  },
  // 远程控制跳转界面
  controlGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/control2/control2?key='+key,
    })
  },
  // 设置跳转界面
  spot: function () {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/controlSZ/controlSZ?key='+key,
    })
  },
  // 图标显示
  // 获取日还是月
  dayBtn: function () {
    this.setData({
      echart: '1'
    })
  },
  mouthBtn: function () {
    this.setData({
      echart: '0'
    })
  },
  //图表1
  init_echarts1: function (chartData1) {
    this.chart1Componnet = this.selectComponent('#mychart-line1'); //去获取echarts    这里的id就是echarts的id
    this.chart1Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      lineChart1 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      lineChart1.setOption(this.getLineOption1(chartData1));
      return lineChart1; //一定要return出去
    });
  },
  //图表1
  //图表1
  getLineOption1: function (chartData1) {
    let option = {
      title: {
        text: '用电量',
        left: 'center',
        textStyle: {
          color: '#fff',
          // textBorderColor: 'red' 字体描边颜色
        }
      },
      color: ["#0A73FF"],
      grid: {
        containLabel: true
      },
      tooltip: {
        snap: true,
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          show: true,
          label: {
            show: true,
            color: '#fff',
            backgroundColor: '#000'
          }
        }
      },
      xAxis: {
        name: '日期',  // x轴的名称
        type: 'category',
        data: chartData1.xData,
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
              color: '#fff'
          }
        },
        splitLine:{
    　　　show:false
    　　}          
      },
      yAxis: {
        name: 'KW',
        x: 'center',
        type: 'value',
        axisLabel : {
          formatter: '{value}',
          textStyle: {
              color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
      　splitLine:{
  　　　　 show:false
    　　},          
      },
      label: {
        show: true, //开启显示
        position: 'top', 
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 80,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 80,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
      ],
      series:  [{
        data: chartData1.seriesData,
        type: 'line',
        smooth: true,
        // areaStyle: {
        //   opacity: 0.8,
        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //            offset: 0,
        //             color: 'rgba(128, 255, 165)'
        //         }, {
        //             offset: 1,
        //             color: 'rgba(1, 191, 236)'
        //         }]) 
        // },
      },]
    };
    return option
  },
  //图表1
  //图表假数据
  getChartTestData() {
    var chartData1 = {
      xData: this.data.dataVoltageTime,
      seriesData: this.data.dataVoltageValue
    }
    this.init_echarts1(chartData1)
  },
  //图表假数据
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
})