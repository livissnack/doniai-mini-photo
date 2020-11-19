// pages/photo/detail.js
const app = getApp()
import { API_ROOT, getSpec } from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photo_spec_id: '',
    spec: {
      photo_spec_id: '',
      title: '',
      size: '',
      price: '',
      spec_id: '',
      is_hot: '',
      is_you: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let spec_id = options.id
    this.setData({
      photo_spec_id: spec_id
    })
    this.getSpec(spec_id)
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

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        let auth_token = app.globalData.token || wx.getStorageSync('token')
        let file_path = res.tempFilePaths[0]
        if (auth_token === null) {
          wx.showToast({ title: '未授权登录…', icon: 'none', duration: 2000 })
          return
        }
        if (file_path === null || file_path === undefined) {
          wx.showToast({ title: '上传文件异常…', icon: 'none', duration: 2000 })
          return
        }
        wx.showLoading({ title: '上传中,请稍等…' })
        wx.uploadFile({
          url: `${API_ROOT}/api/photo/make`,
          filePath: file_path,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth_token}`,
          },
          formData: {
            spec_id: 1
          },
          success: (result) => {
            wx.hideLoading()
            let make_res = typeof result.data === 'string' ? JSON.parse(result.data) : result.data
            if(make_res.code !== 0) {
              wx.showToast({ title: '图片规格不符合', icon: 'none', duration: 2000 })
            } else {
              wx.navigateTo({
                url: '/pages/photo/preview',
                success: function(res) {
                  res.eventChannel.emit('acceptDataFromPhotoDetailPage', {data: make_res.data})
                }
              })
            }
          },
          fail: (e) => {
            wx.showLoading({ title: '上传失败…' })
          },
          complete: (e) => {
            wx.hideLoading()
          },
        })
      },
    })
  },

  takeImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log(res)
        let auth_token = app.globalData.token || wx.getStorageSync('token')
        let file_path = res.tempFilePaths[0]
        if (auth_token === null) {
          wx.showToast({ title: '未授权登录…', icon: 'none', duration: 2000 })
          return
        }
        if (file_path === null || file_path === undefined) {
          wx.showToast({ title: '上传文件异常…', icon: 'none', duration: 2000 })
          return
        }
        wx.showLoading({ title: '上传中,请稍等…' })
        wx.uploadFile({
          url: `${API_ROOT}/api/photo/make`,
          filePath: file_path,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth_token}`,
          },
          formData: {
            spec_id: 1
          },
          success: (result) => {
            wx.hideLoading()
            let make_res = typeof result.data === 'string' ? JSON.parse(result.data) : result.data
            if(make_res.code !== 0) {
              wx.showToast({ title: '图片规格不符合', icon: 'none', duration: 2000 })
            } else {
              wx.navigateTo({
                url: '/pages/photo/preview',
                success: function(res) {
                  res.eventChannel.emit('acceptDataFromPhotoDetailPage', {data: make_res.data})
                }
              })
            }
          },
          fail: (e) => {
            wx.showLoading({ title: '上传失败…' })
          },
          complete: (e) => {
            wx.hideLoading()
          },
        })
      },
    })
  },

  getSpec(spec_id) {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = {
      photo_spec_id: spec_id
    }
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getSpec(request_data, headers).then(res => {
      this.setData({
        spec: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },
})
