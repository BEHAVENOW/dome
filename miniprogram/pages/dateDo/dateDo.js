import * as echarts from '../../ec-canvas/echarts';
const that = this
let datas = []
let num = 0
function name(nums,params) {
  datas = []
  if(nums === 2) {
    for(let i=1;i<10;i++){
      datas.push(
        [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
      )
    }
  } 
  if (nums < 8 && nums !== 2) {
    if (nums%2 === 0) {
      for(let i=1;i<31;i++){
        datas.push(
          [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
        )
      }
    } else {
      for(let i=1;i<32;i++){
        datas.push(
          [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
        )
      }
    }
  }
  if (nums > 7) {
    if (nums%2 === 0) {
      for(let i=1;i<32;i++){
        datas.push(
          [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
        )
      }
    } else {
      for(let i=1;i<31;i++){
        datas.push(
          [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
        )
      }
    }
  }
  num = 3
}
name(1, 31)
function time(params) { 
  datas= []
  for(let i=1;i<24;i++){
    datas.push(
      [i+':00', i>10?'':Math.floor(i+i*Math.random()*45)]
    )
  }
  num = 6
}
let chart = null;
function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  var option = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].value?params[0].name + ': ' + params[0].value: '';
        },
    },
    xAxis: {
      boundaryGap: false,
      data: datas.map(function (item) {
        let data = {
          value: item[0],
          // x轴字体颜色
          // textStyle: {
          //   color:'#44BBEE' 
          // }
        }
        return data;
      }),
      axisLabel: {
        interval: num
      },
      axisTick:{
        show: true,
        length: 0
      }
    },
    grid: {  
      left: '3%',  
      right: '4%',  
      bottom: '0',  
      top: '10%',
      containLabel: true
    },  
    yAxis: {
      show: true,
      type: 'value',
      axisLine:{
        show: false,
      },
      axisTick:{
        show: false,
        length: 0
      },
      splitLine:{
        // x轴辅助线
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: {
      type: 'line',
      smooth: true,
      itemStyle : {  
        normal : {  
          color:'#44BBEE', 
            lineStyle:{  
                color:'#44BBEE'  
            },
        },
      }, 
      symbol: 'circle',
      symbolSize: 5,
      data: datas.map(function (item) {
          return item[1];
      })
    }
  }
  chart.setOption(option);
  return chart;
}
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    list: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ec: {
      onInit: initChart
    },
    timeIndex: ''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      timeIndex: this.data.list[0]
    })
  },
  timeChange (e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index + 1
    // if(index>=8){
    //   name(index, 0)
    // } else if(index==7){
    //   name(index, 6)
    // } else {
    //   name(index, 31)
    // }
    name(index, 31)
    chart.setOption({
      xAxis: [{
        data: datas.map(function (item) {
          return item[0];
        }),
        axisLabel: {
          interval: num
        },
      }],
      series: [{
        data: datas.map(function (item) {
            return item[1];
        })
      }]
    })
    this.setData({
      timeIndex: e.currentTarget.dataset.index
    })
  },
})