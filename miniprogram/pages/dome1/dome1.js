import * as echarts from '../../ec-canvas/echarts';
let barChart = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec1: {
      disableTouch: true,
      lazyLoad: true
    },

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: 'eChart- 异步多个'
    })

    this.getChartTestData()

  },

  //初始化图表
  init_echarts1: function (chartData) {
    this.chart1Componnet = this.selectComponent('#mychart1'); //去获取echarts    这里的id就是echarts的id
    this.chart1Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      barChart = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      barChart.setOption(this.getBarOption1(chartData));
      return barChart; //一定要return出去
    });
  },

  //柱状图配置
  getBarOption1: function (chartData) {
    var option = {
      xAxis: {
        type: 'value'
      },
      yAxis: {
          type: 'value'
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 10,      // 左边在 10% 的位置。
          end: 60         // 右边在 60% 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: 10,      // 左边在 10% 的位置。
          end: 60         // 右边在 60% 的位置。
        }
      ],
      series: [
        {
          type: 'scatter', // 这是个『散点图』
          itemStyle: {
              opacity: 0.8
          },
          symbolSize: function (val) {
              return val[2] * 40;
          },
          data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
        }
    ],
  }
  // option = {
  //     grid: {
  //       containLabel: true
  //     },
  //     tooltip: {
  //       show: true,
  //       trigger: 'axis'
  //     },
  //     legend: {
  //       bottom: 10,
  //       data: chartData.legendData
  //     },
  //     xAxis: [{
  //       type: 'category',
  //     boundaryGap: false,
  //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日','周八'],
  //     }],
  //     yAxis: {},
  //     series: chartData.seriesData
  //   }
    return option
  },

  //图表假数据
  getChartTestData() {

    var dataArr = [{
        name: '蒸发量',
        data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]],
      }
    ];
    for (var i = 0; i < dataArr.length; i++) {
      var dic = dataArr[i];
      dic['type'] = 'line';
      // dic['label'] = {
      //   show: true,
      //   position: 'top',
      // }
      dic['itemStyle'] = {
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            distance: i == 0 ? 5 : 10,
            // rotate: 15,
            // offset: [20, 0],
            formatter: function (val) {
              if (val.value !== 0) {
                return val.value;
              } else {
                return '';
              }
            },
            textStyle: { //数值样式
              // color: '#1a1a1a',
              fontSize: 10
            }
          },
        }
      }
    }
    var chartData = {
      xData:  ['周一', '周二', '周三', '周四', '周五', '周六', '周日','周八'],
      seriesData: dataArr
    };
    this.init_echarts1(chartData)


   

  },




})
