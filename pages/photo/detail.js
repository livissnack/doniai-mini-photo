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
      spec_name: '',
      width_mm: '',
      height_mm: '',
      width_px: '',
      height_px: '',
      is_print: '',
      price: '',
      spec_id: '',
      is_hot: '',
      is_you: '',
      ppi: '',
      background_color: '',
      file_size_max: '',
      file_size_min: '',
    }
  },

  onLoad(options) {
    let spec_id = options.id
    this.setData({
      spec_id: spec_id
    })
    this.getSpec(spec_id)
  },

  chooseImage() {
    let spec_id = this.data.spec.spec_id
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
        if (spec_id === null || spec_id === undefined || spec_id === '') {
          wx.showToast({ title: '未选择制作规格…', icon: 'none', duration: 2000 })
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
            spec_id: spec_id
          },
          success: (result) => {
            app.globalData.tempFilePaths = file_path
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
    let spec_id = this.data.spec.spec_id
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
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
        if (spec_id === null || spec_id === undefined || spec_id === '') {
          wx.showToast({ title: '未选择制作规格…', icon: 'none', duration: 2000 })
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
            spec_id: spec_id
          },
          success: (result) => {
            app.globalData.tempFilePaths = file_path
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
      spec_id: spec_id
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
