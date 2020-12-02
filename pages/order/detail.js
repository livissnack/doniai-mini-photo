// pages/order/detail.js
const app = getApp()
import { getOrder } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    response: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_id = options.order_id
    this.setData({
      order_id: order_id
    })
    console.log(order_id)
    this.getOrder()
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

  getOrder() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = {
      order_id: this.data.order_id
    }
    getOrder(request_data, headers).then((res) => {
      if (res.code === 0 && !isEmpty(res.data)) {
        this.setData({
          response: res.data
        })
      } else {
        wx.showToast({
          title: '订单获取失败',
        })
      }
    })
  },

  callContact() {
    wx.makePhoneCall({
      phoneNumber: '15302661170',
    })
  },

  doCopy(e) {
    let source_text = 'dadad'
    wx.setClipboardData({
      data: source_text,
      success: function () {
        wx.showToast({
          title: '复制成功',
          duration: 3000,
        })
        wx.getClipboardData({
          success: function (res) {},
        })
      },
    })
  },
})
