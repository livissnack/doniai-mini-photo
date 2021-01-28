// pages/analyze/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    elements: [
      {
        title: '视频教程',
        name: '如何去除水印',
        color: 'green',
        icon: 'videofill',
      },
      {
        title: '邀请好友',
        name: '转发邀请好友',
        color: 'orange',
        icon: 'friendadd',
      },
      {
        title: '常见问题',
        name: '去水印失败',
        color: 'purple',
        icon: 'questionfill',
      },
      {
        title: 'MD5说明',
        name: '改MD5上热门',
        color: 'mauve',
        icon: 'emojifill',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
})
