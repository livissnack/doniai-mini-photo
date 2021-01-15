// pages/photo/history.js
const app = getApp()
import {getPhotoHistorys, delPhotoHistory} from '../../utils/api'
import {isEmpty} from '../../utils/helper'
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    request: {
      page: 1,
      size: 20
    },
    response: {}
  },

  onLoad() {
    this.getPhotoHistorys()
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    console.log(e)
    this.setData({
      ListTouchDirection:
        e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left',
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target,
      })
    } else {
      this.setData({
        modalName: null,
      })
    }
    this.setData({
      ListTouchDirection: null,
    })
  },

  getPhotoHistorys() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getPhotoHistorys(request_data, headers).then(res => {
      console.log(res);
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  deletePhotoHistory(e) {
    let ph_id = e.currentTarget.dataset.id
    if(isEmpty(ph_id)) {
      wx.showToast({ title: '编号ID为空…', icon: 'fail', duration: 2000 })
      return
    } else {
      let auth_token = app.globalData.token || wx.getStorageSync('token')
      let request_data = {ph_id: ph_id}
      let headers = {
        Authorization: `Bearer ${auth_token}`,
      }
      delPhotoHistory(request_data, headers).then(res => {
        if(res.code === 0) {
          this.getPhotoHistorys()
        } else {
          wx.showToast({title: '删除失败'});
        }
      }).catch(e => {
        wx.showToast({title: '请求失败'});
      })
    }
  },

  jumpPhotoDownloadPage(event) {
    let ph_id = event.currentTarget.dataset.id
    if(isEmpty(ph_id)) {
      wx.showToast({ title: '编号ID为空…', icon: 'fail', duration: 2000 })
      return
    } else {
      wx.navigateTo({
        url: `/pages/photo/download?ph_id=${ph_id}`
      })
    }
  }
})
