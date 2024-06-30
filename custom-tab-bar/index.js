// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      active: 'activeTarBarIndex'
    },
    actions: {
      updateActive: 'updateActiveIndex'
    }
  },
  options: {
    styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "/pages/record/record",
        "text": "记录",
        "iconPath": "/images/record.png",
        "selectedIconPath": "/images/record-active.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    }
  }
})