import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
let lineChart4 = null;
let lineChart1 = null;
let lineChart2 = null;
let lineChart3 = null;
Page({
  data: {
    ec: {
      ec: {
        disableTouch: true,
        lazyLoad: true
      },
      ac: {
        disableTouch: true,
        lazyLoad: true
      },
      bc: {
        disableTouch: true,
        lazyLoad: true
      },
      cc: {
        disableTouch: true,
        lazyLoad: true
      },
  },
  uuid: '',
  dataVoltageValue: ['12','22','23','11','25','33','12','22','23','11','25','33','12','22','23','11','25','33'],
  dataVoltageTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
  dataElectricValue: ['12','22','23','11','25','33','12','22','23','11','25','33','12','22','23','11','25','33'],
  dataElectricTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
  dataPowerValue: '',
  dataPowerTime: '',
  // dataPowerValue: ['12','22','23','11','25','33','12','22','23','11','25','33','12','22','23','11','25','33'],
  // dataPowerTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
  dataConsumpValue: ['12','22','23','11','25','33','12','22','23','11','25','33','12','22','23','11','25','33'],
  dataConsumpTime: ['2021/1/1','2021/1/2','2021/1/3','2021/1/4','2021/1/5','2021/1/6','2021/1/7','2021/1/8','2021/1/9','2021/1/10','2021/1/11','2021/1/12','2021/1/13','2021/1/14','2021/1/15','2021/1/16','2021/1/17','2021/1/18'],
  dateChange: ''
  },
  onLoad: function (options) {
    var uuid = options.key
    this.setData({
      uuid: uuid
    })
    console.log(options.key)
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfPvwZfd1d4FyD', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'get_mcb_info',
          uuid: uuid,
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
        var dataVoltageValue = []
        var dataVoltageTime = []
        var dataElectricValue = []
        var dataElectricTime = []
        var dataPowerValue = []
        var dataPowerTime = []
        var dataConsumpValue = []
        var dataConsumpTime = []
        for (var i = 0; i < res.data.data.phv_mes.length; i++) {
          dataVoltageValue[i] = res.data.data.phv_mes[i].value,
          dataVoltageTime[i] = res.data.data.phv_mes[i].time.slice(5,16)
        }
        for (var i = 0; i < res.data.data.pha_mes.length; i++) {
          dataElectricValue[i] = res.data.data.pha_mes[i].value,
          dataElectricTime[i] = res.data.data.pha_mes[i].time.slice(5,16)
        }
        for (var i = 0; i < res.data.data.A_neut_mes.length; i++) {
          dataPowerValue[i] = res.data.data.A_neut_mes[i].value,
          dataPowerTime[i] = res.data.data.A_neut_mes[i].time.slice(5,16)
        }
        for (var i = 0; i < res.data.data.totw.length; i++) {
          dataConsumpValue[i] = res.data.data.totw[i].value,
          dataConsumpTime[i] = res.data.data.totw[i].time.slice(5,16)
        }
        this.setData({
          dataVoltageValue: dataVoltageValue,
          dataVoltageTime: dataVoltageTime,
          dataElectricValue: dataElectricValue,
          dataElectricTime: dataElectricTime,
          dataPowerValue: dataPowerValue,
          dataPowerTime: dataPowerTime,
          dataConsumpValue: dataConsumpValue,
          dataConsumpTime: dataConsumpTime
        })
        // setTimeout(()=>{
          this.getChartTestData()
        // },1000)
        
      } 
    })
    // setTimeout(()=>{
    //   this.getChartTestData()
    // },1000)
    
  },
  //下拉框开始
  // showCondition() {
	// 	this.setData({
	// 		conditionVisible: !this.data.conditionVisible
  //   })
  // },
	// 改变查询项
	// onChnageCondition(e) {
  //   // this.getDataBase(0)
  //   this.setData({
  //     coverTitle: e.currentTarget.id,
  //     title: e.currentTarget.id
  //   })
  //   var userId = wx.getStorageSync("userId");
  //   wx.request({
  //     url: '', //仅为示例，并非真实的接口地址
  //     method: 'POST',
  //     data: {
  //       'params': {
  //         action: '',
  //         uuid: e.currentTarget.id,
  //         userId: userId,
  //         dateChange: this.data.dateChange
  //       },
  //       // Date.parse(new Date())/1000
  //       'version': '1.0', 
  //       'id': '12', 
  //       'request': {'apiVer':'1.0.0'}
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: (res) => {
  //       // dataVoltageValue= 1,
  //       // dataVoltageTime=1,
  //       // dataElectricValue=1,
  //       // dataElectricTime=1,
  //       // dataPowerValue=1,
  //       // dataPowerTime=1,
  //       // dataConsumpValue=1,
  //       // dataConsumpTime=1,
  //     }
  //   })
  // //   const list = this.data.conditionList
  // //   var dd
	// // 	list.forEach(item => {
	// // 		if (item.id === e.currentTarget.dataset.id) {
	// // 			item.select = true
	// // 			this.setData({
	// // 				'choosedCondition.title': item.title,
	// // 				'choosedCondition.id': item.id
  // //       })
  // //       dd = item.title;
	// // 		} else {
	// // 			item.select = false
	// // 		}
  // //   }) 
	// // 	this.setData({
  // //     coverTitle: e.currentTarget.id
  // //   })
  // //   this.getChartTestData()
  // },
  // 下拉框结束

  // 选择日  月
  // dateDay: function (e) {
  //   this.setData({
  //     dateChange: 0
  //   })
  // },
  // dateMouth: function (e) {
  //   this.setData({
  //     dateChange: 1
  //   })
  // },
  // 选择日  月

  //获取数据库电流、电压、总功率、用电量的数据
  // getDataBase: function () {
  //   var userId = wx.getStorageSync("userId");
  //   wx.request({
  //     url: '', //仅为示例，并非真实的接口地址
  //     method: 'POST',
  //     data: {
  //       'params': {
  //         action: '',
  //         userId: userId,
  //         uuid: this.data.uuid
  //       },
  //       // Date.parse(new Date())/1000
  //       'version': '1.0', 
  //       'id': '12', 
  //       'request': {'apiVer':'1.0.0'}
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: (res) => {
  //       // dataVoltageValue= 1,
  //       // dataVoltageTime=1,
  //       // dataElectricValue=1,
  //       // dataElectricTime=1,
  //       // dataPowerValue=1,
  //       // dataPowerTime=1,
  //       // dataConsumpValue=1,
  //       // dataConsumpTime=1,
  //     }
  //   })
  // //   var _this = this;
  // //   const db = wx.cloud.database({
  // //     //这个是环境ID不是环境名称     
  // //     env: 'weiduan-9gtmiw7oa0914f23'
  // //   })
  // //   db.collection('voltage001').get({
  // //     success: res => {
  // //       var dataVoltage001Time = [];
  // //       var dataVoltage001Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataVoltage001Time[i] = res.data[i].time;
  // //         dataVoltage001Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataVoltage001Time: dataVoltage001Time,
  // //         dataVoltage001Value: dataVoltage001Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('voltage002').get({
  // //     success: res => {
  // //       var dataVoltage002Time = [];
  // //       var dataVoltage002Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataVoltage002Time[i] = res.data[i].time;
  // //         dataVoltage002Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataVoltage002Time: dataVoltage002Time,
  // //         dataVoltage002Value: dataVoltage002Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('voltage003').get({
  // //     success: res => {
  // //       var dataVoltage003Time = [];
  // //       var dataVoltage003Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataVoltage003Time[i] = res.data[i].time;
  // //         dataVoltage003Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataVoltage003Time: dataVoltage003Time,
  // //         dataVoltage003Value: dataVoltage003Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('voltage004').get({
  // //     success: res => {
  // //       var dataVoltage004Time = [];
  // //       var dataVoltage004Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataVoltage004Time[i] = res.data[i].time;
  // //         dataVoltage004Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataVoltage004Time: dataVoltage004Time,
  // //         dataVoltage004Value: dataVoltage004Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('electric001').get({
  // //     success: res => {
  // //       var dataElectric001Time = [];
  // //       var dataElectric001Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataElectric001Time[i] = res.data[i].time;
  // //         dataElectric001Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataElectric001Time: dataElectric001Time,
  // //         dataElectric001Value: dataElectric001Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('electric002').get({
  // //     success: res => {
  // //       var dataElectric002Time = [];
  // //       var dataElectric002Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataElectric002Time[i] = res.data[i].time;
  // //         dataElectric002Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataElectric002Time: dataElectric002Time,
  // //         dataElectric002Value: dataElectric002Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('electric003').get({
  // //     success: res => {
  // //       var dataElectric003Time = [];
  // //       var dataElectric003Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataElectric003Time[i] = res.data[i].time;
  // //         dataElectric003Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataElectric003Time: dataElectric003Time,
  // //         dataElectric003Value: dataElectric003Value
  // //       })
  // //     }
  // //   })
  // //   db.collection('electric004').get({
  // //     success: res => {
  // //       var dataElectric004Time = [];
  // //       var dataElectric004Value = [];
  // //       for(let i = 0; i < res.data.length; i++){
  // //         dataElectric004Time[i] = res.data[i].time;
  // //         dataElectric004Value[i] = res.data[i].value;
  // //       }
  // //       this.setData({
  // //         dataElectric004Time: dataElectric004Time,
  // //         dataElectric004Value: dataElectric004Value
  // //       })
  // //     }
  // //   })
  // },
  //获取数据库

  //折线图3.0
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
  //图表2
  init_echarts2: function (chartData2) {
    this.chart2Componnet = this.selectComponent('#mychart-line2'); //去获取echarts    这里的id就是echarts的id
    this.chart2Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      lineChart2 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      lineChart2.setOption(this.getLineOption2(chartData2));
      return lineChart2; //一定要return出去
    });
  },
  //图表2
  //图表3
  init_echarts3: function (chartData3) {
    this.chart3Componnet = this.selectComponent('#mychart-line3'); //去获取echarts    这里的id就是echarts的id
    this.chart3Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      lineChart3 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      lineChart3.setOption(this.getLineOption3(chartData3));
      return lineChart3; //一定要return出去
    });
  },
  //图表3
  //图表4
  init_echarts4: function (chartData4) {
    this.chart4Componnet = this.selectComponent('#mychart-line4'); //去获取echarts    这里的id就是echarts的id
    this.chart4Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      lineChart4 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      lineChart4.setOption(this.getLineOption4(chartData4));
      return lineChart4; //一定要return出去
    });
  },
  //图表4
  //折线图3.0
  //图表1
  getLineOption1: function (chartData1) {
    let option = {
      title: {
        text: '相测量电压',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      color: ["#00eeff"],
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: function (params) {
      //     return params[0].value?params[0].name + ': ' + params[0].value: '';
      //   },
      // },
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
        name: '日期',
        type: 'category',
        data: chartData1.xData,
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine:{
          show:false
  　　  },
        axisLabel: {
          show: true,
          textStyle: {
              color: '#fff'
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
                // if (p == rowNumber - 1) {
                  // 最后一次不换行
                  // tempStr = params.substring(start, paramsNameNumber);
                // } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + "\n";
                // }
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
      },
      yAxis: {
        name: 'V/伏特',
        x: 'center',
        type: 'value',
        axisLabel : {
          formatter: '{value}',
          textStyle: {
              color: '#fff'
          }
        },
        splitLine:{
          show:false
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
      },
      label: {
        show: true, //开启显示
        position: 'top', 
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100,
            height : 15,         // 右边在 60% 的位置。
            textStyle: {
              color: '#fff'
            }
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
    ],
      // splitLine:{
      //   // x轴辅助线
      //   show: true,
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // },
      series:  [{
        data: chartData1.seriesData,
        type: 'line',
        smooth: true,
        symbol: "none",
        // areaStyle: {
          // opacity: 0.8,
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //          offset: 0,
          //           color: 'rgba(128, 255, 165)'
          //       }, {
          //           offset: 1,
          //           color: 'rgba(1, 191, 236)'
          //       }]) 
        // }
      },]
    };
    return option
    // if (this.data.coverTitle === '001') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     // tooltip: {
    //     //   trigger: 'axis',
    //     //   formatter: function (params) {
    //     //     return params[0].value?params[0].name + ': ' + params[0].value: '';
    //     //   },
    //     // },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData1.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     // splitLine:{
    //     //   // x轴辅助线
    //     //   show: false,
    //     //   lineStyle: {
    //     //     type: 'dashed'
    //     //   }
    //     // },
    //     series:  [{
    //       data: chartData1.seriesData,
    //       type: 'line',
    //     },]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '002')  {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData1.xData
    //       // this.data.dataVoltage002Time
    //     },
    //     yAxis: {
    //       // type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData1.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '003') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData1.xData
    //     },
    //     yAxis: {
    //       // type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData1.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '004') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData1.xData
    //     },
    //     yAxis: {
    //       // type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData1.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // }
  },
  //图表1
  //图表2
  getLineOption2: function (chartData2) {
    let option = {
      title: {
        text: '相测量电流',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      color: ["#00eeff"],
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: function (params) {
      //     return params[0].value?params[0].name + ': ' + params[0].value: '';
      //   },
      // },
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
        name: '日期',
        type: 'category',
        data: chartData2.xData,
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
                // if (p == rowNumber - 1) {
                  // 最后一次不换行
                //   tempStr = params.substring(start, paramsNameNumber);
                // } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + "\n";
                // }
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
      },
      yAxis: {
        name: 'A/安培',
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
    　　} 
      },
      label: {
        show: true, //开启显示
        position: 'top', 
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 60, 
            end: 100, 
            height : 15,    
            textStyle: {
              color: '#fff'
            }    
        },
        {   // 这个dataZoom组件，也控制x轴。
          show: true,
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 60,   
            end: 100,  
            textStyle: {
              color: '#fff'
            }
        }
    ],
      // splitLine:{
      //   // x轴辅助线
      //   show: true,
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // },
      series:  [{
        data: chartData2.seriesData,
        type: 'line',
        smooth: true,
        symbol: "none",
        // areaStyle: {}
      },]
    };
    return option
    // if (this.data.coverTitle === '001') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData2.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData2.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '002')  {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData2.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData2.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '003') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData2.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData2.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '004') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData2.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData2.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // }
  },
  //图表2
  //图表3
  getLineOption3: function (chartData3) {
    let option = {
      title: {
        text: '零线电流',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      color: ["#00eeff"],
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: function (params) {
      //     return params[0].value?params[0].name + ': ' + params[0].value: '';
      //   },
      // },
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
        name: '日期',
        type: 'category',
        data: chartData3.xData,
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
                // if (p == rowNumber - 1) {
                  // 最后一次不换行
                //   tempStr = params.substring(start, paramsNameNumber);
                // } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + "\n";
                // }
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
      },
      yAxis: {
        name: 'A/安培',
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
    　　} 
      },
      label: {
        show: true, //开启显示
        position: 'top', 
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100,
            height : 15,         // 右边在 60% 的位置。
            textStyle: {
              color: '#fff'
            }
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
    ],
      // splitLine:{
      //   // x轴辅助线
      //   show: true,
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // },
      series:  [{
        data: chartData3.seriesData,
        type: 'line',
        smooth: true,
        symbol: "none",
        // areaStyle: {}
      },]
    };
    return option
    // if (this.data.coverTitle === '001') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData3.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData3.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '002')  {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData3.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData3.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '003') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData3.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData3.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '004') {
    //   let option = {
    //     title: {
    //       text: '电流',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData3.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData3.seriesData,
    //       type: 'line',
    //     }]
    //   };
    //   return option
    // }
  },
  //图表3
  //图表4
  getLineOption4: function (chartData4) {
    let option = {
      title: {
        text: '有用功率',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      color: ["#00eeff"],
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: function (params) {
      //     return params[0].value?params[0].name + ': ' + params[0].value: '';
      //   },
      // },
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
        name: '日期',
        type: 'category',
        data: chartData4.xData,
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
                // if (p == rowNumber - 1) {
                  // 最后一次不换行
                //   tempStr = params.substring(start, paramsNameNumber);
                // } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + "\n";
                // }
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
      },
      yAxis: {
        name: 'KW/千瓦',
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
    　　} 
      },
      label: {
        show: true, //开启显示
        position: 'top', 
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100,
            height : 15,         // 右边在 60% 的位置。
            textStyle: {
              color: '#fff'
            }
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 60,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
    ],
      // splitLine:{
      //   // x轴辅助线
      //   show: true,
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // },
      series:  [{
        data: chartData4.seriesData,
        type: 'line',
        smooth: true,
        symbol: "none",
        // areaStyle: {}
      },]
    };
    return option
    // if (this.data.coverTitle === '001') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData4.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData4.seriesData,
    //       type: 'line'
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '002')  {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData4.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData4.seriesData,
    //       type: 'line'
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '003') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData4.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData4.seriesData,
    //       type: 'line'
    //     }]
    //   };
    //   return option
    // } else if (this.data.coverTitle === '004') {
    //   let option = {
    //     title: {
    //       text: '电压',
    //       left: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: chartData4.xData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     label: {
    //       show: true, //开启显示
    //       position: 'top', 
    //     },
    //     series: [{
    //       data: chartData4.seriesData,
    //       type: 'line'
    //     }]
    //   };
    //   return option
    // }
  },
  //图表4

  //图表假数据
  getChartTestData() {
    var chartData1 = {
      xData: this.data.dataVoltageTime,
      seriesData: this.data.dataVoltageValue
    }
    var chartData2 = {
      xData: this.data.dataElectricTime,
      seriesData: this.data.dataElectricValue
    }
    var chartData3 = {
      xData: this.data.dataPowerTime,
      seriesData: this.data.dataPowerValue
    }
    var chartData4 = {
      xData: this.data.dataConsumpTime,
      seriesData: this.data.dataConsumpValue
    }
    this.init_echarts1(chartData1)
    this.init_echarts2(chartData2)
    this.init_echarts3(chartData3)
    this.init_echarts4(chartData4)
    //获取数据2.0
    // if (this.data.coverTitle === '001') {
    //   var chartData1 = {
    //     xData: this.data.dataVoltage001Time,
    //     seriesData: this.data.dataVoltage001Value
    //   }
    //   var chartData2 = {
    //     xData: this.data.dataElectric001Time,
    //     seriesData: this.data.dataElectric001Value
    //   }
    //   var chartData3 = {
    //     xData: this.data.dataElectric001Time,
    //     seriesData: this.data.dataElectric001Value
    //   }
    //   var chartData4 = {
    //     xData: this.data.dataVoltage001Time,
    //     seriesData: this.data.dataVoltage001Value
    //   }
    //   this.init_echarts1(chartData1)
    //   this.init_echarts2(chartData2)
    //   this.init_echarts3(chartData3)
    //   this.init_echarts4(chartData4)
    // } else if (this.data.coverTitle === '002') {
    //   var chartData1 = {
    //     xData: this.data.dataVoltage002Time,
    //     seriesData: this.data.dataVoltage002Value
    //   }
    //   var chartData2 = {
    //     xData: this.data.dataElectric002Time,
    //     seriesData: this.data.dataElectric002Value
    //   }
    //   var chartData3 = {
    //     xData: this.data.dataElectric002Time,
    //     seriesData: this.data.dataElectric002Value
    //   }
    //   var chartData4 = {
    //     xData: this.data.dataVoltage002Time,
    //     seriesData: this.data.dataVoltage002Value
    //   }
    //   this.init_echarts1(chartData1)
    //   this.init_echarts2(chartData2)
    //   this.init_echarts3(chartData3)
    //   this.init_echarts4(chartData4)
    // } else if (this.data.coverTitle === '003') {
    //   var chartData1 = {
    //     xData: this.data.dataVoltage003Time,
    //     seriesData: this.data.dataVoltage003Value
    //   }
    //   var chartData2 = {
    //     xData: this.data.dataElectric003Time,
    //     seriesData: this.data.dataElectric003Value
    //   }
    //   var chartData3 = {
    //     xData: this.data.dataElectric003Time,
    //     seriesData: this.data.dataElectric003Value
    //   }
    //   var chartData4 = {
    //     xData: this.data.dataVoltage003Time,
    //     seriesData: this.data.dataVoltage003Value
    //   }
    //   this.init_echarts1(chartData1)
    //   this.init_echarts2(chartData2)
    //   this.init_echarts3(chartData3)
    //   this.init_echarts4(chartData4)
    // } else {
    //   var chartData1 = {
    //     xData: this.data.dataVoltage004Time,
    //     seriesData: this.data.dataVoltage004Value
    //   }
    //   var chartData2 = {
    //     xData: this.data.dataElectric004Time,
    //     seriesData: this.data.dataElectric004Value
    //   }
    //   var chartData3 = {
    //     xData: this.data.dataElectric004Time,
    //     seriesData: this.data.dataElectric004Value
    //   }
    //   var chartData4 = {
    //     xData: this.data.dataVoltage004Time,
    //     seriesData: this.data.dataVoltage004Value
    //   }
    //   this.init_echarts1(chartData1)
    //   this.init_echarts2(chartData2)
    //   this.init_echarts3(chartData3)
    //   this.init_echarts4(chartData4)
    // }
    
    //获取数据2.0

    //获取数据1.0
    // var dataArr1 = [{
    //   data: this.data.dataVoltage001Value,
    // },{
    //   data: this.data.dataVoltage002Value,
    // },{
    //   data: this.data.dataVoltage003Value,
    // },{
    //   data: this.data.dataVoltage004Value,
    // }];
    // var dataArr2 = [];
    // var dataArr3 = [];
    // var dataArr4 = [];
    // for (var j = 0; j < 4; j++) {
    //   for (var i = 0; i < dataArr[j].length; i++) {
    //     var dic = dataArr[j][i];
    //     dic['type'] = 'line'; //表示数据图样式
    //     dic['itemStyle'] = {
    //       normal: {
    //         label: {
    //           show: true,      //开启显示
    //           position: 'top', //在上方显示
    //           textStyle: {     //数值样式
    //             // color: '#1a1a1a',
    //             fontSize: 10
    //           }
    //         },
    //       }
    //     }
    //   }
    //   var chartData = {
    //     seriesData: dataArr1
    //   };
    // }
    // this.init_echarts1(chartData)
    //获取数据1.0
  },
  //图表假数据
})


  //切换柱状图
  // bar(){
  //   let option3 = {
  //     title: {
  //       text: '直接更新数据，减少性能消耗',
  //       left: 'center'
  //     },
  //     xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [{
  //         data: [120, 200, 150, 80, 70, 110, 156],
  //         type: 'bar',
  //         showBackground: true,
  //         backgroundStyle: {
  //             color: 'rgba(220, 220, 220, 0.8)'
  //         }
  //     }]
  //   };
  //   chart.setOption(option3)
  // }
  // 柱状图结束
  
// line2() {
  //   if (this.data.coverTitle === '003') {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage003Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage003Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //     let option1 = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric003Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric003Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option1)
  //     let option3 = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option3)
  //     let option4 = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option4)
  //   } 
  // },
  // line3() {
  //   if (this.data.coverTitle === '004') {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage004Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage004Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //     let option1 = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric004Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric004Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option1)
  //     let option3 = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option3)
  //     let option4 = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option4)
  //   }
  // },
//折线图1.0
  // lineVoltage() {
    
  //   if (this.data.coverTitle === '001') {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '002')  {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage002Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage002Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '003') {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage003Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage003Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '004') {
  //     let option = {
  //       title: {
  //         text: '电压',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataVoltage004Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataVoltage004Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   }
  // },
  // lineElectric() {
  //   var _this = this;
  //   const db = wx.cloud.database({
  //     //这个是环境ID不是环境名称     
  //     env: 'weiduan-9gtmiw7oa0914f23'
  //   })
   
  //   if (this.data.coverTitle === '001') {
  //     // console.log(this.data.dataElectric001Time)
  //     let option = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric001Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric001Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '002')  {
  //     let option = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric002Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric002Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '003') {
  //     let option = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric003Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric003Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   } else if (this.data.coverTitle === '004') {
  //     let option = {
  //       title: {
  //         text: '电流',
  //         left: 'center'
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: this.data.dataElectric004Time
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: this.data.dataElectric004Value,
  //         type: 'line'
  //       }]
  //     };
  //     chart.setOption(option)
  //   }
  // },
  //折线图1.0