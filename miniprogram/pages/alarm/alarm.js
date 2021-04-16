// 图表js开始
const app = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
const checkout = ''  // checkout 获取useId下的数据
let lineChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: '',
    coverTitle: '暂未选择', 
    title: '选择告警',
    conditionVisible: false,
    //**** 表格开始
    listData:['2021/2/12 12:23','停电告警'],
    listData1: '',
    // 日期选择
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: '',
    dateTime: '',
    dateTimeArray1: '',
    dateTime1: '',
    startYear: 2020,
    endYear: 2021,
    // 日期选择
    currentData: '0',
    dataDate: ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06','2018-10-07','2018-10-08','2018-10-09','2018-10-10','2018-10-11','2018-10-12','2018-10-13'],
    dataPhV: ['220','220','220','220','220','220','220','220','220','220','220','220','220'],
    timeDate: ['上电', '高压', '低压', '过压', '漏电', '齿轮闭锁'],
    data: '',
    dataTime: '',
    dataValue: '',
    leftTime: '',
    nowDate: [15,14,15,14,15,14,11],
    allDate: [150,140,150,140,150,140,110],
    conditionList: [{
      title: '停电告警',
      id: '1',
      select: false
    },
    {
      title: '低压告警',
      id: '2',
      select: false
    },
    {
      title: '过压告警',
      id: '3',
      select: false
    },
    {
      title: '功率过载',
      id: '4',
      select: false
    },
    {
      title: '异常告警',
      id: '5',
      select: false
    }
  ],
  },

  //下拉框开始
  showCondition() {
		this.setData({
			conditionVisible: !this.data.conditionVisible
		})
	},
	// 改变查询项
	onChnageCondition(e) {
    const list = this.data.conditionList
    var dd
		list.forEach(item => {
			if (item.id === e.currentTarget.dataset.id) {
				item.select = true
				this.setData({
					'choosedCondition.title': item.title,
					'choosedCondition.id': item.id
        })
        dd = item.title;
			} else {
				item.select = false
			}
    }) 
    console.log(dd)
    this.setData({
      conditionList: list,
      title: dd
    })
    // this.line()
  },
// 下拉框结束
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uuid = options.key
    this.setData({
      uuid: options.key
    })
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
    // 日期选择
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    // obj1.dateTimeArray.splice(5,1)  
    // obj1.dateTimeArray.splice(4,1)
    // obj1.dateTime.splice(5,1)
    // obj1.dateTime.splice(4,1)
    obj.dateTimeArray.splice(5,1)  
    obj.dateTimeArray.splice(4,1)
    obj.dateTime.splice(5,1)
    obj.dateTime.splice(4,1)
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      // dateTimeArray1: obj1.dateTimeArray,
      // dateTime1: obj1.dateTime
    });
    // 日期选择
    // this.getChartTestData()
    wx.setNavigationBarTitle({
      title: '用电告警' 
    })
    // var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfhORGvpSlhxkw', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        'params': {
          action: 'get_rtdata',
          uuid: this.data.uuid,
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
        var S_warn = res.data.data[0].S_warn,
         Alm_PwrOff = res.data.data[0].Alm_PwrOff, 
         Mf_op = res.data.data[0].Mf_op,
         Alm_Ptov = res.data.data[0].Alm_Ptov,
         Alm_Ptuv = res.data.data[0].Alm_Ptuv
         var listData1 = []
         listData1.push(S_warn,Alm_PwrOff,Mf_op,Alm_Ptov,Alm_Ptuv)
         this.setData({
           listData1: listData1
         })
      } 
    })
    //获取最近二十条数据
    wx.request({
      url: 'https://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfy37ctT2hXE5z',
      method: 'POST',
      data: {
        'params': {
          action: 'twenty',
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
        var dataTime = []
        var dataValue = [] 
        var data = []
        for (let i = 0; i < res.data.data.length; i++) {
          dataTime[i] = res.data.data[i].time
          dataValue[i] = res.data.data[i].value
          switch (res.data.data[i].name) {
            case 'ss_c': 
             data.push('微断合位');
             break;
            case 'ss_o': 
            data.push('微断分位');
            break;
            case 'gear_as': 
            data.push('齿轮闭锁'); 
            break;
            case 'overhaul': 
            data.push('自动/检修');
            break;
            case 's_warn': 
            data.push('微断异常告警');
            break;
            case 'alm_md': 
            data.push('参数修改告警');
            break;
            case 'alm_clear': 
            data.push('微断清零告警');
            break;
            case 'alm_pwroff':  
            data.push('停电告警');
            break;
            case 'alm_pwron': 
            data.push('上电告警');
            break;
            case 'alm_ptuv':  
            data.push('低压告警');
            break;
            case 'alm_ptov':  
            data.push('过压告警');
            break;
            case 'alm_ptoc': 
            data.push('电流越限告警');
            break;
            case 'mf_hv': 
            data.push('高压故障');
            break;
            case 'mf_op':  
            data.push('功率过载故障');
            break;
            case 'mf_oc': 
            data.push('短路过流故障');
            break;
            case 'mf_lk': 
            data.push('漏电故障');
            break;
            case 'alm_lk_st': 
            data.push('漏电自检告警');
            break;
            case 'alm_rc': 
            data.push('重合闸告警');
            break;
            case 'alm_tmp':  
            data.push('火线过热告警');
            break;
            case 'alm_rst':  
            data.push('设备重启告警');
            break;
          }
        }
        this.setData({
          dataTime: dataTime,
          dataValue: dataValue,
          data: data
        })
      }
    })
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
    var dateTime = e.detail.value
    var leftTime = this.data.dateTimeArray[0][this.data.dateTime[0]]+'-'+this.data.dateTimeArray[1][this.data.dateTime[1]]+'-'+this.data.dateTimeArray[2][this.data.dateTime[2]]
    console.log(Date.parse(leftTime))
    leftTime = Date.parse(leftTime) - 604800000
    dateTime = new Date(leftTime)
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());
    var milliseconds = now_new - dateTime;
    var leftTime = year + '-' + month + '-' + day;
    this.setData({
      leftTime: leftTime
    })
  },
  // changeDateTime1(e) {
  //   this.setData({ dateTime1: e.detail.value });
  // },
  // changeDateTimeColumn1(e){
  //   var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({
  //     dateTimeArray: dateArr,
  //     dateTime: arr
  //   });
  // },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  // 获取更多数据
  bindMore: function () {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/alarmMore/alarmMore?key =' + key,
    })
  },
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
  // //图表1
  // init_echarts: function (chartData) {
  //   this.chartComponnet = this.selectComponent('#mychart-line'); //去获取echarts    这里的id就是echarts的id  mychart-line
  //   this.chartComponnet.init((canvas, width, height, dpr) => {
  //     // 初始化图表 
  //     lineChart = echarts.init(canvas, null, { //echarts会继承父元素的宽高
  //       width: width,
  //       height: height,
  //       devicePixelRatio: dpr // 像素
  //     });
  //     lineChart.setOption(this.getLineOption(chartData));
  //     return lineChart; //一定要return出去
  //   });
  // },
  // //图表1
  // //图表1
  // getLineOption: function (chartData) {
  //   let option = {
  //     title: {
  //       text: '异常数量',
  //       left: 'center',
  //       textStyle: {
  //         color: '#fff',
  //         // textBorderColor: 'red' 字体描边颜色
  //       }
  //     },
  //     color: ["#0A73FF"],
  //     grid: {
  //       containLabel: true
  //     },
  //     tooltip: {
  //       snap: true,
  //       show: true,
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'line',
  //         show: true,
  //         label: {
  //           show: true,
  //           color: '#fff',
  //           backgroundColor: '#000'
  //         }
  //       }
  //     },
  //     xAxis: {
  //       name: '事件', // x轴的名称
  //       type: 'category',
  //       data: chartData.xData,
  //       axisLine: {
  //         lineStyle: {
  //           color: '#fff',
  //           width: 1
  //         }
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //             color: '#fff'
  //         }
  //       },
  //       splitLine:{
  //   　　　show:false
  //   　　} 
  //     },
  //     yAxis: {
  //       name: '次数',
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
  //           start: 80,      // 左边在 10% 的位置。
  //           end: 100         // 右边在 60% 的位置。
  //       },
  //       {   // 这个dataZoom组件，也控制x轴。
  //           type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
  //           start: 80,      // 左边在 10% 的位置。
  //           end: 100         // 右边在 60% 的位置。
  //       }
  //     ],
  //     series:  [{
  //       data: chartData.seriesData1,
  //       type: 'bar',
  //       barWidth : 10,
  //       itemStyle : {  
  //         normal : {  
  //           color:'#44BBEE', 
  //             lineStyle:{  
  //                 color:'#44BBEE'  
  //             },
  //         },
  //       },
  //     },
  //     {
  //       data: chartData.seriesData2,
  //       type: 'bar',
  //       barWidth : 10,
  //       itemStyle : {  
  //         normal : {  
  //           color:'red', 
  //             lineStyle:{  
  //                 color:'red'  
  //             },
  //         },
  //       },
  //     }
  //   ]
  //   };
  //   return option
  // },
  // //图表1
  // //图表假数据
  // getChartTestData() {
  //   var chartData = {
  //     xData: this.data.timeDate,
  //     seriesData1: this.data.allDate,
  //     seriesData2: this.data.nowDate,
  //   }
  //   this.init_echarts(chartData)
  // },
  //图表假数据
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

  },
   
})