// pages/photo/history.js
const app = getApp()
import {getPhotoHistorys} from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    request: {
      page: 1,
      size: 20
    },
    response: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhotoHistorys()
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

  jumpPhotoDownloadPage(event) {
    let ph_id = event.currentTarget.dataset.id
    if(ph_id === null || ph_id === undefined || ph_id ==='') {
      wx.showToast({ title: '编号ID为空…', icon: 'fail', duration: 2000 })
      return
    } else {
      wx.navigateTo({
        url: `/pages/photo/download?ph_id=${ph_id}`
      })
    }
  }
})
