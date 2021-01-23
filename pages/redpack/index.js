// pages/redpack/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redpackList: [
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/12/8/57.jpg',
        name: 'ROARINGWILD'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/12/9/64.jpg',
        name: 'TUMI途明'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/12/10/67.jpg',
        name: 'VansChina'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/4/2/125.jpg',
        name: '龙湖集团'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/4/4/133.png',
        name: '微保'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/11/3/294.jpg',
        name: '施华洛世奇'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/12/8/57.jpg',
        name: 'ROARINGWILD'
      },
      {
        img_url: 'https://secres.wxqcloud.qq.com//t/wx_fed/red-envelope-cover-platform/case2/12/8/57.jpg',
        name: 'ROARINGWILD'
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  jumpRedpackDetailPage(e) {
    let redpack = e.currentTarget.dataset.redpack
    wx.navigateTo({
      url: `/pages/redpack/detail?img_url=${redpack.img_url}&name=${redpack.name}`,
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

  }
})