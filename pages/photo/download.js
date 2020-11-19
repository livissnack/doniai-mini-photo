// pages/order/download.js
const app = getApp()
import { getPhotoHistory } from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    response: {
      ph_id: null,
      image_url: '',
      print_image_url: '',
      size: '',
      remark: '',
      created_time: '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ph_id = options.ph_id
    if (ph_id === null || ph_id === undefined || ph_id === '') {
      wx.showToast({ title: '请求失败' })
      return
    }
    this.getPhotoHistory(ph_id)
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

  getPhotoHistory(ph_id) {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = { ph_id: ph_id }
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    getPhotoHistory(request_data, headers)
      .then((res) => {
        console.log(res)
        this.setData({
          response: res.data,
        })
      })
      .catch((e) => {
        wx.showToast({ title: '请求失败' })
      })
  },

  downloadPhoto() {
    wx.showToast({
      title: '下载中...',
      icon: 'success',
      duration: 2000,
    })
    let img_url = this.data.response.image_url
    if (img_url === '' || img_url === null || img_url === undefined) {
      wx.showToast({
        title: '未生成照片',
        icon: 'none',
        duration: 2000,
      })
    }
    wx.downloadFile({
      url: img_url,
      success: (res) => {
        if (res.statusCode === 200) {
          let img = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success: (result) => {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000,
              })
            },
            fail: (err) => {
              if (err.errMsg) {
                wx.showModal({
                  title: '提示',
                  content: '你好请先授权，在保存图片',
                  showCancel: false,
                  success: (result) => {
                    console.log(result)
                    if (result.confirm) {
                      wx.openSetting({
                        success: (settingdata) => {
                          if (
                            settingdata.authSetting['scope.writePhotosAlbum']
                          ) {
                            wx.saveImageToPhotosAlbum({
                              filePath: img,
                              success: (result) => {
                                wx.showToast({
                                  title: '保存成功',
                                  icon: 'success',
                                  duration: 2000,
                                })
                              },
                              fail: () => {},
                              complete: () => {},
                            })
                          } else {
                            wx.showModal({
                              title: '温馨提示',
                              content: '授权失败，请稍后重新获取',
                              showCancel: false,
                            })
                          }
                        },
                      })
                    }
                  },
                })
              }
            },
            complete: () => {
              wx.hideLoading()
            },
          })
        }
      },
      fail: () => {
        wx.hideLoading()
      },
      complete: () => {
        wx.hideLoading()
      },
    })
  },

  downloadPrintPhoto() {
    wx.showToast({
      title: '下载中...',
      icon: 'success',
      duration: 2000,
    })
    let img_url = this.data.response.print_image_url
    if (img_url === '' || img_url === null || img_url === undefined) {
      wx.showToast({
        title: '未生成排版照片',
        icon: 'none',
        duration: 2000,
      })
    }
    wx.downloadFile({
      url: img_url,
      success: (res) => {
        if (res.statusCode === 200) {
          let img = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success: (result) => {
              wx.showLoading({
                title: '保存成功',
                icon: 'success',
                duration: 2000,
              })
            },
            fail: (err) => {
              if (err.errMsg) {
                wx.showModal({
                  title: '提示',
                  content: '你好请先授权，在保存图片',
                  showCancel: false,
                  success: (result) => {
                    if (result.confirm) {
                      wx.openSetting({
                        success: (settingdata) => {
                          if (
                            settingdata.authSetting['scope.writePhotosAlbum']
                          ) {
                            wx.saveImageToPhotosAlbum({
                              filePath: img,
                              success: (result) => {
                                wx.showToast({
                                  title: '保存成功',
                                  icon: 'success',
                                  duration: 2000,
                                })
                              },
                              fail: (e) => {
                                console.log(e)
                              },
                              complete: () => {},
                            })
                          } else {
                            wx.showModal({
                              title: '温馨提示',
                              content: '授权失败，请稍后重新获取',
                              showCancel: false,
                            })
                          }
                        },
                      })
                    }
                  },
                })
              }
            },
            complete: () => {
              wx.hideLoading()
            },
          })
        }
      },
      fail: () => {
        wx.hideLoading()
      },
      complete: () => {
        wx.hideLoading()
      },
    })
  },
})
