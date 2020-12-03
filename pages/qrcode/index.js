// pages/qrcode/index.js
const QR = require('../../utils/qrcode')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskHidden: true,
    imagePath: '',
    placeholder: 'baidu.com',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let size = this.setCanvasSize() //动态设置画布大小
    let initUrl = 'https://' + this.data.placeholder
    this.createQrCode(initUrl, 'mycanvas', size.w, size.h)
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

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {}
    try {
      var res = wx.getSystemInfoSync()
      var scale = 750 / 686 //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale
      var height = width //canvas画布为正方形
      size.w = width
      size.h = height
    } catch (e) {
      // Do something when catch error
      console.log('获取设备信息失败' + e)
    }
    return size
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH)
    var that = this
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function () {
      that.canvasToTempImage()
      clearTimeout(st)
    }, 3000)
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath
        console.log(tempFilePath)
        that.setData({
          imagePath: tempFilePath,
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img], // 需要预览的图片http链接列表
    })
  },
  formSubmit: function (e) {
    var that = this
    var url = e.detail.value.url
    url = url == '' ? 'http://' + that.data.placeholder : 'http://' + url
    that.setData({
      maskHidden: false,
    })
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000,
    })
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize()
      //绘制二维码
      that.createQrCode(url, 'mycanvas', size.w, size.h)
      that.setData({
        maskHidden: true,
      })
      clearTimeout(st)
    }, 2000)
  },
})
