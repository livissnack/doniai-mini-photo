// pages/crop/content.js
const app = getApp()
import { getTranslate, API_ROOT } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.globalData.tempFilePaths,
    target_focus: false,
    target_text: '',
    imgList: [],
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

  doCopy() {
    let target_text = this.data.target_text
    console.target_text
    wx.setClipboardData({
      data: target_text,
      success: function (res) {
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

  target_focus: function () {
    this.setData({
      target_focus: true,
    })
  },
  setTargetText: function (e) {
    let text = e.detail.value
    this.setData({
      target_text: text,
    })
  },

  doTranslate() {
    let target_text = this.data.target_text
    if (isEmpty(target_text)) {
      return wx.showToast({ title: '翻译内容为空' })
    }
    wx.showLoading({ title: '翻译中' })

    let trans_data = {
      q: target_text,
      from: this.data.source_lang,
      to: this.data.target_lang,
    }
    getTranslate(trans_data)
      .then((res) => {
        wx.hideLoading()
        this.setData({
          target_text:
            res.data.to_content === null ? '翻译结果为空' : res.data.to_content,
        })
      })
      .catch((e) => {
        wx.showToast({ title: '请求失败' })
      })
  },

  chooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          wx.showToast({ title: '只能上传一张图片' })
        } else {
          let auth_token = app.globalData.token || wx.getStorageSync('token')
          let file_path = res.tempFilePaths[0]
          this.setData({
            imgList: res.tempFilePaths,
          })

          wx.showLoading({ title: '识别中,请稍等…' })
          wx.uploadFile({
            url: `${API_ROOT}/api/ai/ocr_printed_text`,
            filePath: file_path,
            name: 'file',
            header: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${auth_token}`,
            },
            success: (result) => {
              if (result.statusCode !== 200) {
                return wx.showToast({ title: '识别错误' })
              }
              let ocr_res =
                !isEmpty(result.data) && typeof result.data === 'string'
                  ? JSON.parse(result.data)
                  : '识别结果为空'
              this.setData({
                target_text: ocr_res.data,
              })
            },
            fail: (e) => {
              wx.showLoading({ title: '识别失败…' })
            },
            complete: (e) => {
              wx.hideLoading()
            },
          })
        }
      },
    })
  },
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url,
    })
  },
  delImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这张照片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: (res) => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            imgList: this.data.imgList,
          })
        }
      },
    })
  },
})
