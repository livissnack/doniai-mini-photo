// pages/address/create.js
const app = getApp()
import {createAddress} from '../../utils/api'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min')
const wxMap = new QQMapWX({
  key: app.globalData.wechatDevelopKey,
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tags: [
      {
        id: 1,
        title: '家',
        name: 'red',
        color: '#e54d42',
      },
      {
        id: 2,
        title: '公司',
        name: 'orange',
        color: '#f37b1d',
      },
      {
        id: 3,
        title: '学校',
        name: 'yellow',
        color: '#fbbd08',
      },
      {
        id: 4,
        title: '其他',
        name: 'blue',
        color: '#fbbd08',
      }
    ],
    receiver: '',
    receiver_phone: '',
    tag: 4,
    is_default: false,
    country: '中国',
    province: '',
    city: '',
    area: '',
    address: '',
    region: ['广东省', '广州市', '海珠区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
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

  bindReceiverChange(e) {
    let receiver = e.detail.value
    console.log(receiver)
    this.setData({
      receiver: receiver
    })
  },

  bindPhoneChange(e) {
    let receiver_phone = e.detail.value
    console.log(receiver_phone)
    this.setData({
      receiver_phone: receiver_phone
    })
  },

  bindRegionChange(e) {
    let regions = e.detail.value
    console.log(regions)
    this.setData({
      province: regions[0],
      city: regions[1],
      area: regions[2]
    })
  },

  
  bindAddressChange(e) {
    let address = e.detail.value
    console.log(address)
    this.setData({
      address: address
    })
  },

  bindDefaultChange(e) {
    let is_default = e.detail.value
    console.log(is_default)
    this.setData({
      is_default: is_default
    })
  },

  selectTag(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      tag: id
    })
  },

  handleSubmit() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = {
      country: this.data.country,
      province: this.data.province,
      city: this.data.city,
      area: this.data.area,
      region: this.data.address,
      receiver_phone: this.data.receiver_phone,
      receiver: this.data.receiver,
      tag: this.data.tag,
      is_default: this.data.is_default,
    }

    console.log(request_data)
  
    createAddress(request_data, headers).then((res) => {
      console.log(res)
      if (res.code === 0) {
        wx.navigateTo({
          url: '/pages/address/index'
        })
      } else {
        wx.showToast({
          title: '新建地址失败',
        })
      }
    })
  },

  getLocation() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        
        wxMap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success: function(res) {
            console.log(res.result)
            let nation = res.result.ad_info.nation
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            let district = res.result.ad_info.district
            let address = res.result.address_component.street
            that.setData({
              country: nation,
              province: province,
              city: city,
              area: district,
              region: [province, city, district],
              address: address
            })
          },
          fail: function(res) {
            console.log(res)
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
