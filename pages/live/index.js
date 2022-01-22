// pages/live/index.js
const app = getApp()
import {getAllLives} from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    request: {
      page: 1,
      size: 40
    },
    response: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAllLives()
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
  onPullDownRefresh(e) {
    console.log(e)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  upper(e) {
    console.log(e)
  },

  lower(e) {
    // this.setData({
    //   'request.page': this.data.request.page + 1
    // })
    // this.getAllLives()
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  jumpLiveDetailPage(e) {
    let live = e.currentTarget.dataset.live
    wx.navigateTo({
      url: `/pages/live/detail?live_url=${live.url}&name=${live.title}`,
    })
  },

  getAllLives() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = this.data.request
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getAllLives(request_data, headers).then(res => {
      console.log(res);
      this.setData({
        response: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },
})
