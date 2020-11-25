// pages/news/detail.js
const app = getApp()
const WxParse = require('../../wxParse/wxParse.js')
import {isEmpty, formatTime} from '../../utils/helper'
import {getNews} from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    article: '',
    author: '',
    source: '',
    pushed_time: '',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let news_id = options.news_id
    if (isEmpty(news_id)) {
      wx.showToast({ title: '请求失败' })
      return
    }
    this.getNews(news_id)
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

  getNews(news_id) {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = { news_id: news_id }
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getNews(request_data, headers)
      .then((res) => {
        let format_time = formatTime(res.data.pushed_time)
        this.setData({
          title: res.data.title,
          article: res.data.article,
          author: res.data.author,
          source: res.data.source,
          pushed_time: format_time,
        })
        let article = this.data.article
        WxParse.wxParse('article', 'html', article, this, 5)
      })
      .catch((e) => {
        wx.showToast({ title: '请求失败' })
      })
  },
})
