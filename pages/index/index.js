Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '智能居家监控系统',
    weather: '欢迎回家！空气质量很好！你今天可以出去',
    location: '广东省&佛山市',
    temperature: 30,
    isConnect: false,
    mqttActionSheet: false,  // 显示底部弹框
    address: '',
    port: '',
    username: '',
    password: '',
    subscribeAddr: '',
    publishAddr: ''
  },

  // MQTT点击弹出底部弹窗
  mqttConnectHandle() {
    this.setData({
      mqttActionSheet: true
    })
  },
  // 关闭底部弹窗
  onClose() {
    this.setData({
      mqttActionSheet: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})