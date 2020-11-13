// pages/address/create.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tags: [
      {
        title: '家',
        name: 'red',
        color: '#e54d42',
      },
      {
        title: '公司',
        name: 'orange',
        color: '#f37b1d',
      },
      {
        title: '学校',
        name: 'yellow',
        color: '#fbbd08',
      },
    ],
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qqmapsdk = new QQMapWX({
      key: app.globalData.wechatDevelopKey,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  openPhoneContact() {
    wx.addPhoneContact({
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {},
    })
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success(res) {
            let city = res.result.address_component.city
            console.log(res, city) //打印城市名称
          },
        })
      },
      fail(error) {
        console.error(error)
      },
    })
  },

  getVoiceAddressText() {
    let plugin = requirePlugin('WechatSI')
    let manager = plugin.getRecordRecognitionManager()
    manager.onRecognize = function (res) {
      console.log('current result', res.result)
    }
    manager.onStop = function (res) {
      console.log('record file path', res.tempFilePath)
      console.log('result', res.result)
    }
    manager.onStart = function (res) {
      console.log('成功开始录音识别', res)
    }
    manager.onError = function (res) {
      console.error('error msg', res.msg)
    }
    manager.start({ duration: 30000, lang: 'zh_CN' })
  },
})
