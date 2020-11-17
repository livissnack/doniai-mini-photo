// pages/photo/detail.js
const app = getApp()
import {API_ROOT} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  chooseImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        let auth_token = app.globalData.token
        let file_path = res.tempFilePaths[0]
        console.log(auth_token)
        if(auth_token === null) {
          wx.showToast({title: '未授权登录…',icon: 'fail',duration: 2000})
          return
        }
        if(file_path === null || file_path === undefined) {
          wx.showToast({title: '上传文件异常…',icon: 'fail',duration: 2000})
          return
        }
        wx.showLoading({title: '上传中,请稍等…'})
        var upTask = wx.uploadFile({
          url: `${API_ROOT}/api/ai/photo_to_text`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${auth_token}` },
          formData: {
            'spec': 2,
            'bk': 'blue'
          },
          success: (result)=>{
            console.log(result);
          },
          fail: (e)=>{
            console.log(e)
            wx.showLoading({title: '上传失败…'})
          },
          complete: (e)=>{
            console.log(e)
            wx.hideLoading()
          }
        });
        console.log(res)
      }
    })
  },

  takeImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log(res)
      }
    })
  }
})