import Toast from '@vant/weapp/toast/toast'
const KEY = '141214f6fdecbc49abd6300a16439726'
Page({
  // 高得API的KEY
  /**
   * 页面的初始数据
   */
  data: {
    title: '智能居家监控系统',
    welcome: '"欢迎回家!今天的天气是晴',
    location: '佛山市 南海区',
    temperature: 30,
    weatherText: '晴',
    weatherImgUrl: '/images/weather/bingbao.png',
    isConnect: false,
    isSubscribe: false,  // 是否订阅
    isPublish: false,    // 是否发布
    mqttActionSheet: false,  // 显示底部弹框
    address: 'embedded.stm.top',
    port: '8888',
    username: 'admin',
    password: '123456',
    subscribeAddr: 'test',
    publishAddr: 'test',
    sensorList: [
      //传感器列表
      //图 名字 参数 值 单位 序号
      {
        img: "/images/P1.png",
        name: "DHT22",
        parameter: "温度",
        value: 30,
        unit: "°C",
        idx: 0,
      },
      {
        img: "/images/P2.png",
        name: "DHT22",
        parameter: "湿度",
        value: 50,
        unit: "%rh",
        // isPass: true,
        idx: 1,
      },
      {
        img: "/images/P3.png",
        name: "TEMT60",
        parameter: "光强",
        value: 1000,
        unit: "lx",
        idx: 2,
      },
      {
        img: "/images/P4.png",
        name: "MQ2",
        parameter: "烟雾",
        value: 20,
        unit: "ppm",
        idx: 3,
      },
    ],
    // 其他设备列表
    otherSensorList: [
      { img: "/images/deng.png", name: "灯", isOpen: true },
      { img: "/images/fengshan.png", name: "风扇", isOpen: false },
      {
        img: "/images/chuanglian.png",
        name: "窗帘",
        schedule: 50, // 进度条
        isOpen: false,
      },
    ],
  },

  // 修改传感器上下限
  limitHandle({ detail }) {
    console.log(detail);
    this.setData({
      [`sensorList[${detail.index}].top`]: detail.top,
      [`sensorList[${detail.index}].bottom`]: detail.bottom
    })
  },

  // 更改开关状态
  onSwitch(e) {
    console.log(e.detail);
    this.setData({
      [`otherSensorList[${e.detail}].isOpen`]: !this.data.otherSensorList[e.detail].isOpen
    })
  },

  // 更具天气显示相对于的天气图片
  getWeatherImg() {
    let weather = ''
    if (this.data.weatherText === '晴') {
      weather = 'qing'
    } else if (this.data.weatherText.includes('冰雹')) {
      weather = 'bingbao'
    } else if (this.data.weatherText.includes('云') || this.data.weatherText === '阴') {
      weather = 'duoyun'
    } else if (this.data.weatherText.includes('雷')) {
      weather = 'lei'
    } else if (this.data.weatherText.includes('雪')) {
      weather = 'xue'
    } else if (this.data.weatherText.includes('雨')) {
      weather = 'yu'
    }
    this.setData({
      weatherImgUrl: `/images/weather/${weather}.png`
    })
  },

  // 点击连接按钮
  connectHandle() {
    this.setData({
      isConnect: true
    })
    Toast.success('连接成功')
  },
  // 断开连接
  disConnectHandle() {
    this.setData({
      isConnect: false
    })
    Toast.success('断开成功')
  },

  // 订阅相关操作
  subscribeHandle() {
    if (!this.data.isConnect) return Toast.fail('请先连接')
    this.setData({
      isSubscribe: true
    })
    Toast.success('订阅成功')
  },
  disSubscribeHandle() {
    this.setData({
      isSubscribe: false
    })
  },
  // 发布相关操作
  publishHandle() {
    if (!this.data.isConnect) return Toast.fail('请先连接')
    this.setData({
      isPublish: true
    })
    Toast.success('发布成功')
  },
  disPublishHandle() {
    this.setData({
      isPublish: false
    })
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
  // 获取用户位置(查看是否授权过定位权限)
  getUserLocation() {
    let that = this;
    wx.getSetting({
      success: res => {
        console.log(res, JSON.stringify(res));
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权

        if (
          res.authSetting["scope.userLocation"] != undefined &&
          res.authSetting["scope.userLocation"] != true
        ) {
          wx.showModal({
            title: "请求授权当前位置",
            content: "需要获取您的地理位置，请确认授权",
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: "拒绝授权",
                  icon: "none",
                  duration: 1000,
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000,
                      });
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 1000,
                      });
                    }
                  },
                });
              }
            },
          });
        } else if (res.authSetting["scope.userLocation"] == undefined) {
          //调用wx.getLocation的API
          that.getLocation();
        } else {
          //res.authSetting['scope.userLocation'] == true
          //调用wx.getLocation的API
          that.getLocation();
        }
      },
    });
  },
  // 获取定位经纬度函数
  getLocation() {
    let that = this;
    wx.getLocation({
      type: "wgs84",
      success(res) {
        console.log("经纬度", res);
        if (res?.errMsg === "getLocation:ok") {
          /* ----------------通过经纬度获取地区编码---------------- */
          wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
            data: {
              key: KEY, //填入自己申请到的Key
              location: res.longitude + "," + res.latitude, //传入经纬度
            },
            header: {
              "content-type": "application/json",
            },
            success: function (res) {
              console.log("坐标转换和查询天气", res.data);
              wx.setStorageSync(
                "city",
                res.data.regeocode.addressComponent.adcode //地区编码
              );
              that.setData({
                location:
                  res.data.regeocode.addressComponent.city +
                  " " +
                  res.data.regeocode.addressComponent.district,
              });

              wx.request({
                url: "https://restapi.amap.com/v3/weather/weatherInfo",
                data: {
                  key: KEY, //填入自己申请到的Key
                  city: res.data.regeocode.addressComponent.adcode, //传入地区编码
                },
                header: {
                  "content-type": "application/json",
                },
                success: function (weather) {
                  console.log("天气", weather.data);
                  that.setData({
                    temperature: weather.data.lives[0].temperature, //温度
                    weatherText: weather.data.lives[0].weather, //天气描述 晴天 下雨天...
                    welcome: "欢迎回家!今天的天气是" + weather.data.lives[0].weather, //欢迎语
                  });
                  that.getWeatherImg()
                },
              });
            },
          });
        }
      },
      fail(err) {
        console.log("获取经纬度错误信息", err);
      },
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserLocation()
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