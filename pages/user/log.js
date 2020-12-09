// pages/user/log.js
const app = getApp()
import {getPayLogs} from '../../utils/api'
import {isEmpty} from '../../utils/helper'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request: {
      type: 0,
      page: 1,
      size: 20
    },
    response: {},
    scrollLeft:0,
    nav_menus: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '收入'
      },
      {
        id: 2,
        name: '支出'
      }
    ]
  },

  tabSelect(e) {
    this.setData({
      'request.type': e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getPayLogs()
  },

  getPayLogs() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = this.data.request
    getPayLogs(request_data, headers).then(res => {
      this.setData({
        response: res.data
      })
   
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPayLogs()
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