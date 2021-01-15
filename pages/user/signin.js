// pages/user/signin.js
const app = getApp()
import {getSigninDays, doSignin} from '../../utils/api'
import {isEmpty} from '../../utils/helper'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: [],
    today_sign: {
      continue_days: 0,
      is_sign: false,
    },
    title: ''
  },

  onLoad() {
    this.getSigninDays()
  },

  getSigninDays() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getSigninDays({}, headers).then(res => {
      this.setData({
        weekdays: res.data.sign_data,
        'today_sign.continue_days': isEmpty(res.data.today_sign) ? 0 : res.data.today_sign.continue_days,
        'today_sign.is_sign': !isEmpty(res.data.today_sign),
        title: res.data.name
      })
   
    }).catch(e => {
      console.log(e)
      wx.showToast({title: '请求失败'});
    })
  },

  doSignin() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    doSignin({}, headers).then(res => {
      if(res.code === 0) {
        wx.showToast({
          title: `获得${res.data}积分`,
          icon: 'success'
        });
        this.getSigninDays()
      } else {
        wx.showToast({title: '签到失败'});
      }
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  }
})