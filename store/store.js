import { observable, action } from 'mobx-miniprogram'

// 创建 store 时可以采用任何 mobx 的接口风格
// 这里以传统的 observable 风格为例

export const store = observable({
  // 数据字段
  activeTarBarIndex: 0,

  // 计算属性
  get sum() {
  },

  // actions
  updateActiveIndex: action(function (index) {
    this.activeTarBarIndex = index
  })
})