import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

// 取N到M之间的随机数
const getRandom = (N, M) => Math.random() * (M - N + 1) + N;


// 模拟天温度
const getDayTemp = () => {
  const dayTemp = []
  for (let i = 0; i < 7; i++) {
    dayTemp[i] = getRandom(24, 36).toFixed(1)
  }
  return dayTemp
}
// 模拟天湿度
const getDayHumidity = () => {
  const dayHumidity = []
  for (let i = 0; i < 7; i++) {
    dayHumidity[i] = parseInt(getRandom(10, 100))
  }
  return dayHumidity
}
// 模拟天亮度
const getDayBrightness = () => {
  const dayBrightness = []
  for (let i = 0; i < 7; i++) {
    dayBrightness[i] = parseInt(getRandom(100, 1000))
  }
  return dayBrightness
}

// 图表配置
let option
function setOption(chart, index) {
  // 根据传入的传感器索引显示不同的数据
  const arr = [getDayTemp(), getDayHumidity(), getDayBrightness()]
  option = {
    xAxis: {
      type: 'category',
      data: ['07:50', '09:30', '10:20', '12:50', '15:25', '18:10', '20:25']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: arr[index],
        type: 'line',
        smooth: true
      }
    ]
  };
  chart.setOption(option, 0);
}

Page({
  data: {
    // echatrs相关配置
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,

    flag: 0,

    // 下拉菜单配置
    itemTitle: '日期',
    option: [
      { text: '温度', value: 0 },
      { text: '湿度', value: 1 },
      { text: '亮度', value: 2 },
    ],
    value: 0,

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

  // 选择传感器发送变化，切换数据
  onChange(e) {
    this.setData({
      value: e.detail
    })
    // 调入初始化数据并且传入要显示的传感器的序号
    this.init && this.init(e.detail)
  },

  // 当前日期变化触发
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      dateString: new Date(event.detail).toLocaleDateString()
    });
    if (this.data.flag >= 2) {
      this.init(this.data.value)
    }
    // 防止首次加载时报错
    if (this.data.flag < 2) {
      this.setData({ flag: this.data.flag + 1 })
    }
  },

  // 进入时获取图表
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init()
  },

  //进入页面后初始化图表
  init: function (i = 0) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      setOption(chart, i);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      this.setData({
        isLoaded: true,
      });
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
});
