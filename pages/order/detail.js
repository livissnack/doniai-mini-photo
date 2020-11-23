// pages/order/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_id = options.order_id
    console.log(order_id)
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

  callContact() {
    wx.makePhoneCall({
      phoneNumber: '15302661170',
    })
  },

  doCopy(e) {
    let source_text = 'dadad'
    wx.setClipboardData({
      data: source_text,
      success: function () {
        wx.showToast({
          title: '复制成功',
          duration: 3000,
        })
        wx.getClipboardData({
          success: function (res) {},
        })
      },
    })
  },
})
