// pages/user/address/list/index.js
const app = getApp()
import { getAddresses, deleteAddress } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    request: {
      page: 1,
      size: 10,
    },
    response: {},
    address_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllAddress()
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

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    let address_id = e.currentTarget.dataset.id
    this.setData({
      address_id: address_id,
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

  jumpEditAddressPage(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/address/edit?address_id=${id}`,
    })
  },

  jumpCreateAddressPage() {
    wx.navigateTo({
      url: '/pages/address/create',
    })
  },

  getAllAddress() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = this.data.request

    getAddresses(request_data, headers).then((res) => {
      if (res.code === 0) {
        this.setData({
          response: res.data,
        })
      } else {
        wx.showToast({
          title: '请求出错',
        })
      }
    })
  },

  deleteAddress() {
    let address_id = this.data.address_id
    if(isEmpty(address_id)) {
      wx.showToast({
        title: '请求出错',
      })
      return
    }
    let request_data = {
      address_id: address_id
    }
    deleteAddress(request_data).then((res) => {
      console.log(res)
      if (res.code === 0) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          complete: ()=>{
            this.getAllAddress()
          }
        });
      } else {
        wx.showToast({
          title: '请求出错',
        })
      }
    })
  }
})
