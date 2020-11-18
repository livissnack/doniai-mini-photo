// pages/photo/index.js
const app = getApp();
import {getAllSpec} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    request: {
      keyword: ''
    },
    response: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSpecs()
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

  jumpPhotoDetailPage(e) {
    let spec_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/photo/detail?id=${spec_id}`
    })
  },

  jumpPhotoHistoryPage() {
    wx.navigateTo({
      url: `/pages/photo/history`
    })
  },

  getSpecs() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getAllSpec(request_data, headers).then(res => {
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  changeSearchValue(e) {
    let search_value = e.detail.value
    this.setData({
      'request.keyword': search_value
    })
  },

  doSearch() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getAllSpec(request_data, headers).then(res => {
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  }
})