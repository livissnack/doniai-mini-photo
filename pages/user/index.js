// pages/user/contact/contact.js
const app = getApp()
import {getBalance, authLogin} from '../../utils/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
    this.balance()
    console.log(app.globalData.userInfo)
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

  getUserInfo: function (e) {
    console.log(e.detail.userInfo, app.globalData.openid)
    let userInfo = e.detail.userInfo
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true,
    })
    this.doAuthLogin(userInfo)
  },

  doAuthLogin(userInfo) {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = {
      avatarUrl: userInfo.avatarUrl,
      city: userInfo.city,
      country: userInfo.country,
      gender: userInfo.gender,
      nickName: userInfo.nickName,
      province: userInfo.province,
    }
  
    authLogin(request_data, headers).then((res) => {
      if (res.code === 0) {
        console.log('auth login success')
      } else {
        wx.showToast({
          title: '授权登录失败',
        })
      }
    })
  },

  jumpSigninPage() {
    wx.navigateTo({
      url: '/pages/user/signin',
    })
  },

  jumpAddressPage() {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },

  jumpAboutPage() {
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },

  jumpLogPage() {
    wx.navigateTo({
      url: '/pages/user/log',
    })
  },

  callContact() {
    wx.makePhoneCall({
      phoneNumber: '15302661170',
    })
  },

  balance() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getBalance({}, headers).then(res => {
      this.setData({
        balance: res.balance
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },
})
