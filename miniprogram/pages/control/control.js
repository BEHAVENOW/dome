const checkout = '' // checkout 获取useId数据
 
// 用电量部分
import * as echarts from '../../ec-canvas/echarts.js'
const that = this
let datas = []
let num = 0
function name(nums,params) {
  datas = []
  for(let i=1;i<32;i++){
    datas.push(
      [nums+'-'+i, i>params?'':Math.floor(i*Math.random()*2)]
    )
  }
  num = 8
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
          textStyle: {
          }
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
        show: true
      }
    },
    series: {
      type: 'line',
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
// 用电量部分
Page({
  data: {
    key: '',
    equimentName: '',
    currentData : 0,
    list: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    list1: ['电压', '电流', '总功率'],
    listData1:['13','14','12','18','20'],
    ec: {
      onInit: initChart
    },
    timeIndex: '',
  },
  onLoad(options) {
    var key = options.key
    this.setData({
      key: key
    })
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: 'http://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfMomFzfgmuLsR', //仅为示例，并非真实的接口地址
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
        console.log(res)
        var uuid = []
        var equimentName = []
        for (var i = 0; i < res.data.data.uuid.length; i++) {
          if (res.data.data.uuid[i].serial_number_id === key) {
            var name = res.data.data.uuid[i].context
            wx.setNavigationBarTitle({
              title: name
            })
          }
        }
      } 
    })
    // 用电量部分
    this.setData({
      timeIndex: this.data.list[0]
    })
    // 用电量部分
  },
    // 用电量部分
  timeChange: (e) => {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index + 1
    if(index>=8){
      name(index, 0)
    } else if(index==7){
      name(index, 6)
    } else {
      name(index, 31)
    }
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
   // 用电量部分
  spot: function () {
    var key = this.data.key
    wx.navigateTo({
      url: '/pages/controlSZ/controlSZ?key='+key,
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
  }  
})


// 实现远程控制分合闸
  // switchEvent: function (e) {
  //   if (e.detail.value === true) {
  //     this.setData({
  //       openBg: '#15b938',
  //       closeBg: '#bfbfbf'
  //     })
  //   }
  // },