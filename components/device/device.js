// components/device/device.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    otherSensorList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 开关
    onChange(e) {
      this.triggerEvent('onSwitch', e.target.dataset.index)
    }
  }
})