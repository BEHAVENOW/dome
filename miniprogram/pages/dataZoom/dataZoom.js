import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
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
        }
    ],
    series: [
        {
            type: 'line', // 这是个『散点图』
            itemStyle: {
                opacity: 0.8
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: [["0","4.771"],["2","8.971"],["3","5.701"],["4","8.167"],["6","5.042"],["7","2.605"],["9","9.710"],["12","1.429"],["15","4.182"],["144","7.241"]]
            // [["144","7.241","0.896"],["3","5.701","0.955"],["2","8.971","0.669"],["9","9.710","0.171"],["15","4.182","0.536"],["12","1.429","0.962"],["4","8.167","0.113"],["0","4.771","0.1"],["7","2.605","0.645"],["6","5.042","0.368"]]
        }
    ]
};

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
