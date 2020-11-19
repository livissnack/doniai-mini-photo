// pages/photo/preview.js
const app = getApp();
import {doPay} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    preview_image_url: 'http://doniai-mini.oss-cn-shenzhen.aliyuncs.com/4fb53d05a76c97e25fb1ebc14b6ea260.jpg',
    preview_print_image_url: 'http://doniai-mini.oss-cn-shenzhen.aliyuncs.com/4fb53d05a76c97e25fb1ebc14b6ea260.jpg',
    is_pay: false,
    checkbox: [{
      value: 0,
      name: '个性换装 | 5.99积分',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '3种底色 | 1.99积分',
      checked: true,
      hot: true,
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromPhotoDetailPage', (data) => {
      console.log(data.data.image_url)
      this.setData({
        preview_image_url: data.data.image_url,
        preview_print_image_url: data.data.print_image_url
      })
      console.log(data)
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

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  pay() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let request_data = {
      amount: 4.99,
      pay_json: JSON.stringify([this.data.preview_print_image_url, this.data.preview_image_url])
    }
    let headers = {
      Authorization: `Bearer ${auth_token}`,
    }
    doPay(request_data, headers).then(res => {
      console.log(res)
      let is_pay_success = false
      if(res.code === 0) {
        is_pay_success = true
      } else{ 
        is_pay_success = false
      }
      this.setData({
        is_pay: is_pay_success,
        modalName: null
      })
      wx.showToast({title: '支付成功'});
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },


  downloadPhoto() {
    wx.showToast({
      title: '下载中...',
      icon: 'success',
      duration: 2000,
    })
    let img_url = this.data.preview_image_url
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
    let img_url = this.data.preview_print_image_url
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