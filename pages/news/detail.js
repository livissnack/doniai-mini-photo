// pages/news/detail.js
const app = getApp()
import {isEmpty, formatTime} from '../../utils/helper'
import {getNews} from '../../utils/api'
Page({
  data: {
    title: '',
    article: '',
    author: '',
    source: '',
    pushed_time: '',
    
  },

  onLoad(options) {
    let news_id = options.news_id
    if (isEmpty(news_id)) {
      wx.showToast({ title: '请求失败' })
      return
    }
    this.getNews(news_id)
  },

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
      })
      .catch((e) => {
        wx.showToast({ title: '请求失败' })
      })
  },
})
