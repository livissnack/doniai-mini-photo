// pages/user/log.js
const app = getApp()
import {getPayLogs} from '../../utils/api'
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

  onLoad() {
    this.getPayLogs()
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
  }
})