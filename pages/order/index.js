const app = getApp()

import { getOrders, deleteOrder } from '../../utils/api'
import { isEmpty } from '../../utils/helper'

Page({
  data: {
    TabCur: 1,
    scrollLeft: 0,
    nav_top_menus: [
      {
        id: 1,
        menu_text: '全部',
      },
      {
        id: 2,
        menu_text: '待付款',
      },
      {
        id: 3,
        menu_text: '待收货',
      },
      {
        id: 4,
        menu_text: '已完成',
      },
    ],
    request: {
      status: 1,
      page: 1,
      size: 10,
    },
    response: {},
  },

  onLoad: function (options) {
    this.getOrders()
  },

  jumpLogisticPage() {
    wx.navigateTo({
      url: '/pages/order/logistic',
    })
  },

  jumpOrderDetailPage(e) {
    let order_id = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/order/detail?order_id=${order_id}`,
    })
  },

  delOrder(e) {
    let order_id = e.currentTarget.dataset.orderid
    let that = this
    wx.showModal({
      title: '提示',
      content: '你确定要删除该订单？',
      success(res) {
        if (res.confirm) {
          let auth_token = app.globalData.token || wx.getStorageSync('token')
          let headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth_token}`,
          }
          let request_data = {
            order_id: order_id,
          }
       
          deleteOrder(request_data, headers).then((res) => {
            if (res.code === 0) {
              let array = that.data.response.items
              array.splice(e.target.dataset.index, 1)
              that.setData({
                'response.items': array 
              })
              wx.showToast({
                title: '删除成功',
              })
            } else {
              wx.showToast({
                title: '请求出错',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  tabSelect(e) {
    let status = e.currentTarget.dataset.id
    this.setData({
      'request.status': status,
      TabCur: status,
      scrollLeft: (status - 1) * 60,
    })
    this.getOrders()
  },

  getOrders() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let status = this.data.request.status
    let request_data = {}
    if (status === 1) {
      request_data = {}
    } else {
      request_data = this.data.request
    }
    getOrders(request_data, headers)
      .then((res) => {
        this.setData({
          response: isEmpty(res.data) ? [] : res.data,
        })
      })
      .catch(() => {
        wx.showToast({ title: '请求失败' })
      })
  },
})
