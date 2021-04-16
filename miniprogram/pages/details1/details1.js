// 图表js开始
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
let chart;
var dateTimePicker = require('../../utils/dateTimePicker.js');
let lineChart1 = null;
let lineChart2 = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      ac: {
        disableTouch: true,
        lazyLoad: true
      },
      ec: {
        disableTouch: true,
        lazyLoad: true
      }
    },
    uuid: '',
    currentData: '',
    dateTimeArray: '',
    dateTime: '',
    dateTimeArray1: '',
    dateTime1: '',
    startYear: 2020,
    endYear: 2021,
    // dataVoltageValue1: ['12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29'],
    // dataVoltageValue4: ['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'],
    // dataVoltageValue2: ['22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39'],
    // dataVoltageValue3: ['42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
    // dataVoltageValue: ['78','82','86','90','94','98','102','104','108','112','116','120','124','128','132','136','140','144'],
    // dataVoltageTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
    bindTimeChoise: '',
    whTime: '',
    whValue: '',
    wh1Time: '',
    wh1Value: '',
    wh2Time: '',
    wh2Value: '',
    wh3Time: '',
    wh3Value: '',
    wh4Time: '',
    wh4Value: '',
    leftTime: '',
    chioce: '1',
    btn1: '3px',
    btn2: '0',
    btn3: '0'
  },
  
  onLoad: function (options) {
    this.setData({
      uuid: options.key
    })
    this.getDate(options.key)
    wx.setNavigationBarTitle({
      title: '用电查询' 
    })
    // console.log(options.key)
    // var dateTime = new Date()
    // var year = dateTime.getFullYear();
    // var month = dateTime.getMonth() + 1;
    // var day = dateTime.getDate();
    // var now = new Date();
    // var now_new = Date.parse(now.toDateString());
    // var milliseconds = now_new - dateTime;
    // var time = year + '-' + month + '-' + day;
    // console.log(time)
    // this.setData({
    //   leftTime: time
    // })
    // 日期选择
    // 获取完整的年月日 时分秒，以及默认显示的数组
    // var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    // obj1.dateTimeArray.splice(5,1)  
    // obj1.dateTimeArray.splice(4,1)
    // obj1.dateTime.splice(5,1)
    // obj1.dateTime.splice(4,1)
    // obj.dateTimeArray.splice(5,1)  
    // obj.dateTimeArray.splice(4,1)
    // obj.dateTime.splice(5,1)
    // obj.dateTime.splice(4,1)
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();
    // var lastArray = obj.dateTimeArray.pop();
    // var lastTime = obj.dateTime.pop();
    // this.setData({
    //   dateTime: obj.dateTime,
    //   dateTimeArray: obj.dateTimeArray,
      // dateTimeArray1: obj1.dateTimeArray,
      // dateTime1: obj1.dateTime
    // });
    // 日期选择
  },
  getDate: function (e) {
    // var date = Date.parse(new Date())/1000
    var date = 1621184461
    var date1 = date - 18640000
    // console.log(date+ ',' + date1)
    console.log(this.data.chioce)
    if (this.data.chioce === '1') {
      wx.request({
        url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfePylTY5V5fVl',
        method: 'POST',
        data: {
          'params': {
            action: 'energy',
            uuid: e,
            timestamp: '1610816461,1639674061'
          },
          // Date.parse(new Date())/1000   date1+ ',' + date
          'version': '1.0', 
          'id': '12', 
          'request': {'apiVer':'1.0.0'}
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          // console.log(res)
          var whTime = []
          var wh1Time = []
          var wh2Time = []
          var wh3Time = [] 
          var wh4Time = []
          var whValue = []
          var wh1Value = []
          var wh2Value = []
          var wh3Value = [] 
          var wh4Value = []
          for (let i = 0; i < res.data.data.wh.length; i++) {
            wh2Value.push(res.data.data.wh2[i].value)
            wh4Value.push(res.data.data.wh4[i].value)
            wh3Value.push(res.data.data.wh3[i].value)
            wh1Value.push(res.data.data.wh1[i].value)
            whTime.push(res.data.data.wh[i].time.slice(5,16))
            var time = parseInt(res.data.data.wh1[i].value) + parseInt(res.data.data.wh2[i].value) + parseInt(res.data.data.wh3[i].value) + parseInt(res.data.data.wh4[i].value)
            whValue.push(time)
          }
          // console.log(whTime)
          // for (let i = 0; i < res.data.data.wh1.length; i++) {
            // wh1Time.push(res.data.data.wh1[i].time)
            // wh1Value.push(res.data.data.wh1[i].value)
          // }
          // console.log(wh1Value)
          // for (let i = 0; i < res.data.data.wh2.length; i++) {
            // wh2Time.push(res.data.data.wh2[i].time)
            // wh2Value.push(res.data.data.wh2[i].value)
          // }
          // for (let i = 0; i < res.data.data.wh3.length; i++) {
            // wh3Time.push(res.data.data.wh3[i].time)
            // wh3Value.push(res.data.data.wh3[i].value)
          // }
          // for (let i = 0; i < res.data.data.wh4.length; i++) {
            // wh4Time.push(res.data.data.wh4[i].time)
            // wh4Value.push(res.data.data.wh4[i].value)
          // }
          this.setData({
            whTime: whTime,
            whValue: whValue,
            // wh1Time: wh1Time,
            wh1Value: wh1Value,
            // wh2Time: wh2Time,
            wh2Value: wh2Value,
            // wh3Time: wh3Time,
            wh3Value: wh3Value,
            // wh4Time: wh4Time,
            wh4Value: wh4Value
          })
        }
      })
    } else if (this.data.chioce === '2') {
      var whTime = ['03-01','03-02','03-03','03-04','03-05','03-06','03-07','03-08','03-09','03-10','03-11','03-12','03-13','03-14','03-15','03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30','03-31']
      var whValue = []
      var wh1Value = []
      var wh2Value = []
      var wh3Value = [] 
      var wh4Value = []
      for (let i = 1; i <= 31; i++) {
        wh1Value[i] = i * 10
        wh2Value[i] = i * 10
        wh3Value[i] = i * 10
        wh4Value[i] = i * 10
        whValue[i] = i * 40
      }
      this.setData({
        whTime: whTime,
        whValue: whValue,
        wh1Value: wh1Value,
        wh2Value: wh2Value,
        wh3Value: wh3Value,
        wh4Value: wh4Value
      })
    } else {
      var whTime = ['1','2','3','4','5','6','7','8','9','10','11','12']
      var whValue = []
      var wh1Value = []
      var wh2Value = []
      var wh3Value = [] 
      var wh4Value = []
      for (let i = 1; i <= 12; i++) {
        wh1Value[i] = i * 100
        wh2Value[i] = i * 100
        wh3Value[i] = i * 100
        wh4Value[i] = i * 100
        whValue[i] = i * 400
      }
      this.setData({
        whTime: whTime,
        whValue: whValue,
        wh1Value: wh1Value,
        wh2Value: wh2Value,
        wh3Value: wh3Value,
        wh4Value: wh4Value
      })
    }
    // console.log(wh1Value)
    setTimeout(() => {
      this.getChartTestData()
    },1000)
  },
  // changeDateTime(e){
  //   this.setData({ dateTime: e.detail.value });
  //   var dateTime = e.detail.value
  //   console.log(e.detail.value)
  //   var leftTime = this.data.dateTimeArray[0][this.data.dateTime[0]]+'-'+this.data.dateTimeArray[1][this.data.dateTime[1]]+'-'+this.data.dateTimeArray[2][this.data.dateTime[2]]
  //   console.log(Date.parse(leftTime))
  //   leftTime = Date.parse(leftTime) - 604800000
  //   console.log(leftTime)
  //   dateTime = new Date(leftTime)
  //   var year = dateTime.getFullYear();
  //   var month = dateTime.getMonth() + 1;
  //   var day = dateTime.getDate();
  //   var now = new Date();
  //   var now_new = Date.parse(now.toDateString());
  //   var milliseconds = now_new - dateTime;
  //   var leftTime = year + '-' + month + '-' + day;
  //   console.log(leftTime)
  //   this.setData({
  //     leftTime: leftTime
  //   })
  // },
  // changeDateTime1(e) {
  //   this.setData({ dateTime1: e.detail.value });
  // },
  // changeDateTimeColumn(e){
  //   var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({
  //     dateTimeArray: dateArr,
  //     dateTime: arr
  //   })
  // },
  // changeDateTimeColumn1(e) {
  //   var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({ 
  //     dateTimeArray1: dateArr,
  //     dateTime1: arr
  //   });
  // },
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
      tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              color: '#fff',
              backgroundColor: '#000'
            }
          }
      },
      grid: {
        containLabel: true
      },
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBB17'],
      legend: {
          data: ['谷时电量', '平时电量','\n','峰时电量','尖时电量','\n','总电量'],
          inactiveColor: '#fff',
          textStyle: {
            color: '#fff',
            // fontSize: '20rpx'
          },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: chartData1.xData,
          name: '日期',
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: '10'
            },
            formatter: function(params){
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 6; // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ""; // 表示每一次截取的字符串
                  var start = p * provideNumber; // 开始截取的位置
                  var end = start + provideNumber; // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr; // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName;
            }
          },
          splitLine:{
      　　　show:false
      　　}
        }
      ],
      yAxis: [
        {
          name: 'kW·h',
          nameLocation: 'end',
          nameTextStyle: {
            align: 'right'
          },
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
      　　} 
        }
      ],
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 50,      // 左边在 10% 的位置。
            end: 100,         // 右边在 60% 的位置。
            height : 15,
            textStyle: {
              color: '#fff'
            }
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            // start: 50,      // 左边在 10% 的位置。
            // end: 100         // 右边在 60% 的位置。
        }, 
        // {
        //   textStyle: {
        //     color: '#fff'
        //   }
        // }
      ],
      series: [
          {
              name: '谷时电量',
              type: 'bar',
              barWidth: 6,
              stack: '总量',
              symbol: "none",
              emphasis: {
                  focus: 'series'
              },
              data: chartData1.seriesData1
          },
          {
              name: '平时电量',
              type: 'bar',
              stack: '总量',
              barWidth: 6,
              symbol: "none",
              emphasis: {
                  focus: 'series'
              },
              data: chartData1.seriesData2
          },
          {
              name: '峰时电量',
              type: 'bar',
              stack: '总量',
              barWidth: 6,
              symbol: "none",
              emphasis: {
                  focus: 'series'
              },
              data: chartData1.seriesData3
          },
          {
              name: '尖时电量',
              type: 'bar',
              stack: '总量',
              symbol: "none",
              barWidth: 6,
              emphasis: {
                  focus: 'series'
              },
              data: chartData1.seriesData4
          },
          {
              name: '总电量',
              type: 'line',
              // stack: '总量',
              symbol: 'none', 
              // barWidth: 10,
              label: {
                  show: true,
                  position: 'top'
              },
              emphasis: {
                  focus: 'series'
              },
              data: chartData1.seriesData
          }
      ]
  };
    return option
  },
  //图表1
  //图表2
  // init_echarts2: function (chartData2) {
  //   this.chart2Componnet = this.selectComponent('#mychart-line2'); //去获取echarts    这里的id就是echarts的id
  //   this.chart2Componnet.init((canvas, width, height, dpr) => {
  //     // 初始化图表 
  //     lineChart2 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
  //       width: width,
  //       height: height,
  //       devicePixelRatio: dpr // 像素
  //     });
  //     lineChart2.setOption(this.getLineOption2(chartData2));
  //     return lineChart2; //一定要return出去
  //   });
  // },
  //图表2
  //图表2
  // getLineOption2: function (chartData2) {
  //   let option = {
  //     title: {
  //       left: 'center',
  //       textStyle: {
  //         color: '#fff'
  //       }
  //     },
  //     color: ["#0A73FF"],
  //     legend: {
  //         data: ['总电量'],
  //         inactiveColor: '#fff',
  //         textStyle: {
  //           color: '#fff',
  //           // fontSize: '20rpx'
  //         },
  //     },
  //     // tooltip: {
  //     //   trigger: 'axis',
  //     //   formatter: function (params) {
  //     //     return params[0].value?params[0].name + ': ' + params[0].value: '';
  //     //   },
  //     // },
  //     grid: {
  //       containLabel: true
  //     },
  //     tooltip: {
  //       snap: true,
  //       show: true,
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'shadow',
  //         show: true,
  //         label: {
  //           show: true,
  //           color: '#fff',
  //           backgroundColor: '#000'
  //         }
  //       }
  //     },
  //     xAxis: {
  //       name: '日期',
  //       type: 'category',
  //       data: chartData2.xData,
  //       axisLine: {
  //         lineStyle: {
  //           color: '#fff',
  //           width: 1
  //         }
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //             color: '#fff',
  //             fontSize: '10'
  //         },
  //         formatter: function(params){
  //           var newParamsName = ""; // 最终拼接成的字符串
  //           var paramsNameNumber = params.length; // 实际标签的个数
  //           var provideNumber = 10; // 每行能显示的字的个数
  //           var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
  //           /**
  //            * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
  //            */
  //           // 条件等同于rowNumber>1
  //           if (paramsNameNumber > provideNumber) {
  //             /** 循环每一行,p表示行 */
  //             for (var p = 0; p < rowNumber; p++) {
  //               var tempStr = ""; // 表示每一次截取的字符串
  //               var start = p * provideNumber; // 开始截取的位置
  //               var end = start + provideNumber; // 结束截取的位置
  //               // 此处特殊处理最后一行的索引值
  //               if (p == rowNumber - 1) {
  //                 // 最后一次不换行
  //                 tempStr = params.substring(start, paramsNameNumber);
  //               } else {
  //                 // 每一次拼接字符串并换行
  //                 tempStr = params.substring(start, end) + "\n";
  //               }
  //               newParamsName += tempStr; // 最终拼成的字符串
  //             }
  //           } else {
  //             // 将旧标签的值赋给新标签
  //             newParamsName = params;
  //           }
  //           //将最终的字符串返回
  //           return newParamsName;
  //         }
  //       },
  //       splitLine:{
  //   　　　show:false
  //   　　} 
  //     },
  //     yAxis: {
  //       name: 'kW·h',
  //       x: 'center',
  //       type: 'value',
  //       axisLabel : {
  //         formatter: '{value}',
  //         textStyle: {
  //             color: '#fff'
  //         }
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           color: '#fff',
  //           width: 1
  //         }
  //       },
  //       splitLine:{
  //   　　　show:false
  //   　　} 
  //     },
  //     label: {
  //       show: true, //开启显示
  //       position: 'top', 
  //     },
  //     dataZoom: [
  //       {   // 这个dataZoom组件，默认控制x轴。
  //           type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
  //           start: 50, 
  //           end: 100,   
  //           height : 10,     
  //       },
  //       {   // 这个dataZoom组件，也控制x轴。
  //         show: true,
  //           type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
  //           start: 50,   
  //           end: 100,  
  //           textStyle: {
  //             color: '#fff'
  //           }
  //       }
  //   ],
  //     series:  [{
  //       name: '总电量',
  //       data: chartData2.seriesData,
  //       type: 'bar',
  //       barWidth: 6,
  //       smooth: true,
  //     },{
  //       type: 'line'
  //     }]
  //   };
  //   return option
  // },
  //图表2
  //图表假数据
  getChartTestData() {
    if (this.data.whTime === '') {
      wx.showLoading({
        title: '加载中'
      })
      setTimeout(() => {
        wx.hideLoading()
        this.getDate()
      },3000)
    }
    var chartData1 = {
      xData: this.data.whTime,
      seriesData: this.data.whValue,
      seriesData1: this.data.wh1Value,
      seriesData2: this.data.wh2Value,
      seriesData3: this.data.wh3Value,
      seriesData4: this.data.wh4Value
    }
    // var chartData2 = {
    //   xData: this.data.whTime,
    //   seriesData: this.data.whValue,
    // }
    this.init_echarts1(chartData1)
    // this.init_echarts2(chartData2)
  },
  //图表假数据
  bindHour: function () {
    this.setData({
      bindTimeChoise: '1'
    })
  },
  bindDay: function () {
    this.setData({
      bindTimeChoise: '2'
    })
  },
  bindMouth: function () {
    this.setData({
      bindTimeChoise: '3'
    })
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
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  seven: function () {
    var key = this.data.uuid
    this.setData({
      chioce: '1',
      btn1: '3px',
      btn2: '0',
      btn3: '0'
    })
    this.getDate(key)
  },
  mouth: function () {
    var key = this.data.uuid
    this.setData({
      chioce: '2',
      btn1: '0',
      btn2: '3px',
      btn3: '0'
    })
    this.getDate(key)
  },
  year: function () {
    var key = this.data.uuid
    this.setData({
      chioce: '3',
      btn1: '0',
      btn2: '0',
      btn3: '3px'
    })
    this.getDate(key)
  }
})