// pages/news/index.js
const app = getApp()
import {getAllNews} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request: {
      page: 1,
      size: 20
    },
    response: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllNews()
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

  jumpNewsDetailPage(e) {
    let news_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news/detail?news_id=${news_id}`,
    })
  },

  getAllNews() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getAllNews(request_data, headers).then(res => {
      console.log(res);
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },
})