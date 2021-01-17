// pages/epidemic/index.js
const app = getApp()
import {getCovidInfo, getCovidStat} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from_city: ['广东省', '深圳市'],
    to_city: ['湖北省', '黄冈市'],
    from_covid_info: {
    },
    to_covid_info: {},
  },

  regionFromChange(e) {
    this.setData({
      from_city: e.detail.value
    })
    this.getCovidInfo()
  },

  regionToChange(e) {
    this.setData({
      to_city: e.detail.value
    })
    this.getCovidInfo()
  },

  exchangeRegion() {
    console.log(1)
    this.setData({
      from_city: this.data.to_city,
      to_city: this.data.from_city,
    })
    this.getCovidInfo()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCovidInfo()
  },

  getCovidInfo() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let from_city = this.data.from_city
    let to_city = this.data.to_city
    let request_data = {
      from_city: from_city[1],
      to_city: to_city[1]
    }
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getCovidInfo(request_data, headers).then(res => {
      console.log(res);
      this.setData({
        from_covid_info: res.data.from_city_covid_info,
        to_covid_info: res.data.to_city_covid_info,
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'DoniaiMini-快速防疫政策查询',
      imageUrl: '/images/share.jpg',
      path: '/pages/epidemic/index',
    }
  }
})