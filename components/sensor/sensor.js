// components/sensor/sensor.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    sensorList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: false,
    name: '',
    topValue: '',    // 上限
    bottomValue: '',  // 下限
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开弹框
    changeHandle(e) {
      // console.log(e.currentTarget.dataset.index);
      // 打开前先清空输入框
      this.setData({
        topValue: '',
        bottomValue: '',
        showDialog: true,
        name: this.properties.sensorList[e.currentTarget.dataset.index].parameter,
        index: e.currentTarget.dataset.index
      })
    },
    // 关闭弹框
    onCancel() {
      this.setData({
        showDialog: false
      })
    },
    // 确认操作
    confirmHandle() {
      // 发送给父组件让其修改传感器的上下限
      this.triggerEvent('changeLimit', {
        top: this.data.topValue,
        bottom: this.data.bottomValue,
        index: this.data.index
      })
    },
  }
})