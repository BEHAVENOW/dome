import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
const db = wx.cloud.database({});
const cont = db.collection('river_data');
let chart;

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
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
      orient: 'vertical',
      left: 10,
      data: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
  },
  series: [
      {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 335, name: 'AAA'},
              {value: 310, name: 'BBB'},
              {value: 234, name: 'CCC'},
              {value: 135, name: 'DDD'},
              {value: 1548, name: 'EEE'}
          ]
      }
  ]
};

Page({
  data: {
    ec: {
      onInit: initChart
    },
    dataAge: '',
    dataName: '',
    coverTitle: '',
		title: '',
    id: '',
    select: '',
    choosedCondition: {
      title: '001',
      id: '1'
    },
		conditionVisible: '',
  },
  onLoad: function () {
    this.getBase()
  },
  showCondition() {
    var that = this
    var a = this.data.select
		this.setData({
      conditionVisible: !this.data.conditionVisible,
      select: a
    })
	},
	// 改变查询项
	onChnageCondition(e) {
    var selectChange = [false, false, false, false, false, false]
    selectChange[e.currentTarget.dataset.id] = true
    this.setData({
      'choosedCondition.title': this.data.title[e.currentTarget.dataset.id],
      coverTitle: this.data.title[e.currentTarget.dataset.id],
      select: !selectChange
    })
    this.line()
  },
  getBase: function () {
    var _this = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'weiduan-9gtmiw7oa0914f23'
    })
    db.collection('conditionList').get({
      success: res => {
        var title = [];
        var uuidId = [];
        var uuidSelect = [];
        for(let i = 0; i < res.data.length; i++){
          title[i] = res.data[i].uuid;
          uuidId[i] = res.data[i].id;
          uuidSelect[i] = res.data[i].select;
        }
        this.setData({
          title: title,
          id: uuidId,
          select: uuidSelect,
        })
      }
    })
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
    if (this.data.coverTitle === '001') {
      let option = {
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
          type: 'line'
        }]
      };
      chart.setOption(option)
    } else if (this.data.coverTitle === '002') {
      let option = {
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
          type: 'line'
        }]
      };
      chart.setOption(option)
    } else if (this.data.coverTitle === '003') {
      let option = {
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
          type: 'line'
        }]
      };
      chart.setOption(option)
    } else {
      let option = {
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
          type: 'line'
        }]
      };
      chart.setOption(option)
    }
    // ****   代码太长，运行时间太长，后期可以看看能不能简化
  },

  
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
  //         data: [120, 200, 150, 80, 70, 110, 130],
  //         type: 'bar',
  //         showBackground: true,
  //         backgroundStyle: {
  //             color: 'rgba(220, 220, 220, 0.8)'
  //         }
  //     }]
  //   };
  //   chart.setOption(option3)
  // },


  // 用按钮调试获取数据，实验成功
  // buttonEvent: function () {
  //   var _this = this;
  //   const db = wx.cloud.database({
  //     //这个是环境ID不是环境名称     
  //     env: 'weiduan-9gtmiw7oa0914f23'
  //   })
  //   db.collection('todos').get({
  //     success: res => {
  //       console.log(res.data)
  //       var dataName = [];
  //       var dataAge = [];
  //       for(let i = 0; i < res.data.length; i++){
  //         dataName[i] = res.data[i].name;
  //         dataAge[i] = res.data[i].age;
  //       }
  //       this.setData({
  //         dataName: dataName,
  //         dataAge: dataAge
  //       })
  //       console.log(dataName)
  //       console.log(dataAge)
  //     }
  //   })
  // }
})