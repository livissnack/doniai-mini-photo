// pages/fucai/index.js
const app = getApp()
import {getTickets, randomTicket} from '../../utils/api'
import {isEmpty} from '../../utils/helper'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    request: {
      page: 1,
      size: 3
    },
    response: {},
    random_ticket: {
      blue: '',
      red: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTickets()
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

  },

  getTickets() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getTickets(request_data, headers).then(res => {
      console.log(res);
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  
  randomTicket() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    randomTicket({}, headers).then(res => {
      console.log(res);
      this.setData({
        random_ticket: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  doCopy() {
    let blue_ball = this.data.random_ticket.blue
    if(isEmpty(blue_ball)) {
      wx.showToast({
        title: '复制内容为空',
        duration: 3000,
      })
      return
    }
    let ball_no = `${this.data.random_ticket.red.join(' ')} ${blue_ball}`
    wx.setClipboardData({
      data: ball_no,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          duration: 3000,
        })
        wx.getClipboardData({
          success: function (res) {},
        })
      },
    })
  }
})