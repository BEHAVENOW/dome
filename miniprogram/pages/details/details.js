// 图表js开始
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
let chart;
var dateTimePicker = require('../../utils/dateTimePicker.js');

var dataCount = 4500;
var data = generateData(dataCount);

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
var option = {
    title: {
        // text: '一月用电量：',
        // left: 10
    },
    // toolbox: {
    //     feature: {
    //         dataZoom: {
    //             yAxisIndex: false
    //         },
    //         saveAsImage: {
    //             pixelRatio: 2
    //         }
    //     }
    // },
    tooltip: {
      snap: true,
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        show: true,
        label: {
          show: true,
          color: '#fff',
          backgroundColor: '#000'
        }
      }
    },
    grid: {
        bottom: 90
    },
    dataZoom: [{
        type: 'inside',
        start: 99, 
        end: 100,  
    }, {
        type: 'slider'
    }],
    xAxis: {
        data: data.categoryData,
        silent: false,
        splitLine: {
            show: false
        },
        splitArea: {
            show: false
        },
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
        }
    },
    yAxis: {
        splitArea: {
            show: false
        },
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
    series: [{
        type: 'bar',
        data: data.valueData,
        // Set `large` for large data amount
        large: true
    }]
};

function generateData(count) {
    var baseValue = Math.random() * 10000;
    var time = +new Date(2021, 0, 1);
    var smallBaseValue;

    function next(idx) {
        smallBaseValue = idx % 30 === 0
            ? Math.random() * 700
            : (smallBaseValue + Math.random() * 500 - 250);
        baseValue += Math.random() * 20 - 10;
        return Math.max(
            0,
            Math.round(baseValue + smallBaseValue) + 3000
        );
    }

    var categoryData = [];
    var valueData = [];

    for (var i = 0; i < count; i++) {
        categoryData.push(echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time));
        valueData.push(next(i).toFixed(2));
        time += 600000;
    }

    return {
        categoryData: categoryData,
        valueData: valueData
    };
}
// 图表结束

Page({

  /**
   * 页面的初始数据
   */
  data: {
      ec: {
        onInit: initChart
      },
      coverTitle: '请选择',
      conditionList: [{
        title: '尖时电量',
        id: '1',
        select: false
      },
      {
        title: '峰时电量',
        id: '2',
        select: false
      },
      {
        title: '平时电量',
        id: '3',
        select: false
      },
      {
        title: '谷时电量',
        id: '4',
        select: false
      }
    ],
    choosedCondition: {
      title: '请选择'
    },
    conditionVisible: false,
    //**** 表格开始
    listData:['50kW-h','15kW-h','20kW-h','5kW-h','5kW-h'],
    //****  表格结束
    uuid: '',
    currentData: '',
    dateTimeArray: '',
    dateTime: '',
    dateTimeArray1: '',
    dateTime1: '',
    startYear: 2020,
    endYear: 2021,
  },
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
		this.setData({
      conditionList: list,
      coverTitle: dd
    })
    this.line()
  },
  
  //单曲线
  line() {
    // ****** 直接获取数据，不需要再通过按钮来获取数据，少了一个步骤
    var _this = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'weiduan-9gtmiw7oa0914f23'
    })
    db.collection('todos').get({
      success: res => {
        var dataName = [];
        var dataAge = [];
        for(let i = 0; i < res.data.length; i++){
          dataName[i] = res.data[i].name;
          dataAge[i] = res.data[i].age;
        }
        this.setData({
          dataName: dataName,
          dataAge: dataAge
        })
      }
    })
    // ******  这里用的是获取数据，传到data中，接下来看看能否使用直接获取数据传到页面中去


    // **** 这里使用的是判断法，判断是哪个，然后用哪个里边的数据
    if (this.data.coverTitle === '尖时电量') {
      let option2 = {
        title: {
          text: this.data.coverTitle,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar'
        }]
      };
      chart.setOption(option2)
    } else if (this.data.coverTitle === '峰时电量') {
      let option2 = {
        title: {
          text: this.data.coverTitle,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 1, 934, 129, 1330, 1320],
          type: 'bar'
        }]
      };
      chart.setOption(option2)
    } else if (this.data.coverTitle === '平时电量') {
      let option2 = {
        title: {
          text: this.data.coverTitle,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 1, 934, 129, 1330, 1320],
          type: 'bar'
        }]
      };
      chart.setOption(option2)
    } else {
      let option2 = {
        title: {
          text: this.data.coverTitle,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.data.dataName,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.data.dataAge,
          type: 'bar'
        }]
      };
      chart.setOption(option2)
    }
    // ****   代码太长，运行时间太长，后期可以看看能不能简化
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 日期选择
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    obj1.dateTimeArray.splice(5,2)  
    obj1.dateTimeArray.splice(4,2)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  }  
})