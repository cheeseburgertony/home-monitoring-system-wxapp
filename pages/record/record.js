import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  // var option = {
  //   title: {
  //     text: '测试下面legend的红色区域不应被裁剪',
  //     left: 'center'
  //   },
  //   legend: {
  //     data: ['A', 'B', 'C'],
  //     top: 50,
  //     left: 'center',
  //     backgroundColor: 'red',
  //     z: 100
  //   },
  //   grid: {
  //     containLabel: true
  //   },
  //   tooltip: {
  //     show: true,
  //     trigger: 'axis'
  //   },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  //     // show: false
  //   },
  //   yAxis: {
  //     x: 'center',
  //     type: 'value',
  //     splitLine: {
  //       lineStyle: {
  //         type: 'dashed'
  //       }
  //     }
  //     // show: false
  //   },
  //   series: [{
  //     name: 'A',
  //     type: 'line',
  //     smooth: true,
  //     data: [18, 36, 65, 30, 78, 40, 33]
  //   }, {
  //     name: 'B',
  //     type: 'line',
  //     smooth: true,
  //     data: [12, 50, 51, 35, 70, 30, 20]
  //   }, {
  //     name: 'C',
  //     type: 'line',
  //     smooth: true,
  //     data: [10, 30, 31, 50, 40, 20, 10]
  //   }]
  // };

  var option = {
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      data: ['07:50', '09:30', '10:20', '12:50', '15:25', '18:10', '20:25']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        // smooth: true
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    itemTitle: '日期',
    option1: [
      { text: '温度', value: 0 },
      { text: '湿度', value: 1 },
      { text: '亮度', value: 2 },
    ],
    value1: 0,

    dateString: new Date(2022, 5, 6).toLocaleDateString(),
    currentDate: new Date(2022, 5, 6).getTime(),
    minDate: new Date(2019, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  // 当前日期变化触发
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      dateString: new Date(event.detail).toLocaleDateString()
    });
  },

  onReady() {
    console.log(this.data.dateString);
  },

});
