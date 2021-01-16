// pages/news/index.js
const app = getApp()
import {getAllNews} from '../../utils/api'
Page({
  data: {
    request: {
      page: 1,
      size: 20
    },
    response: {}
  },

  onLoad() {
    this.getAllNews()
  },

  onShareAppMessage: function () {
    return {
      title: 'DoniaiMini-轻奢的智能证件照小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/news/index',
    }
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

  jumpHealthPage() {
    wx.navigateTo({
      url: '/pages/news/health',
    })
  },

  jumpForumPage() {
    wx.navigateTo({
      url: '/pages/news/forum',
    })
  }
})