// pages/photo/index.js
const app = getApp();
import {getAllSpec} from '../../utils/api'
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    request: {
      keyword: ''
    },
    response: []

  },

  onLoad() {
    this.getSpecs()
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