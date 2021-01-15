// pages/photo/preview.js
const app = getApp()
import { doPay, getSpec, getClothes } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
const base64 = require('../../utils/base64')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    scrollLeft: 0,
    preview_image_url:
      'https://doniai-mini.oss-cn-shenzhen.aliyuncs.com/20201202162253a53b3d58.jpg',
    preview_print_image_url: '',
    spec_id: '',
    spec: {},
    is_need_print: false,
    is_pay: false,
    pay_dialog: false,
    ph_id: '',
    checkbox: [
      {
        value: 0,
        name: '个性换装 | ￥5.99',
        price: '5.99',
        checked: false,
        hot: false,
      },
      {
        value: 1,
        name: '3种底色 | ￥1.99',
        price: '1.99',
        checked: false,
        hot: true,
      },
    ],
    total_price: '',
    hiddenWatermarkModalput: true,
    showMeiyanModal: false,
    showHuanzhuangModal: false,
    watermark: '',
    contrast: 0,  //对比度
    blur: 0,  //模糊效果
    sharpen: 100, //锐化
    bright: 0,  //亮度
    cardCur: 0,
    swiperList: [],
    cur_sex: 1,
    sexList: [
      {
        id: 1,
        name: '男装'
      },
      {
        id: 2,
        name: '女装'
      },
      {
        id: 3,
        name: '童装'
      },
    ]
  },

  onLoad() {
    this.towerSwiper('swiperList')
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromPhotoDetailPage', (data) => {
      this.setData({
        preview_image_url: data.data.image_url,
        preview_print_image_url: data.data.print_image_url,
        spec_id: data.data.spec_id,
        ph_id: data.data.ph_id,
      })
      this.getSpec()
    })
  },

  sexSelect(e) {
    this.setData({
      cur_sex: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getClothes()
  },

  bindWatermark(e) {
    this.setData({
      watermark: e.detail.value
    });
    console.log(e)
  },

  clickWatermark() {
    this.setData({
      hiddenWatermarkModalput: !this.data.hiddenWatermarkModalput
    });
  },

  cancelWatermark() {
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    this.setData({
      hiddenWatermarkModalput: true,
      preview_image_url: init_image_url
    });
  },

  confirmWatermark() {
    let str = this.data.watermark
    if(isEmpty(str)) {
      wx.showToast({
        title: '水印内容为空'
      });
      return
    }
    let base64_text = base64.encode(str)
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    let image_url = `${init_image_url}?x-oss-process=image/watermark,text_${base64_text},g_se,x_10,y_10,size_20,color_FFFFFF,type_d3F5LW1pY3JvaGVp`
    this.setData({
      hiddenWatermarkModalput: true,
      preview_image_url: image_url
    });
  },

  changeBlur(e) {
    let blur = e.detail.value
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    let image_url = `${init_image_url}?x-oss-process=image/blur,r_${blur},s_${blur}`
    this.setData({
      preview_image_url: image_url
    });
  },
  changeSharpen(e) {
    let sharpen = e.detail.value
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    let image_url = `${init_image_url}?x-oss-process=image/sharpen,${sharpen}`
    this.setData({
      preview_image_url: image_url
    });
  },
  changeContrast(e) {
    let contrast = e.detail.value
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    let image_url = `${init_image_url}?x-oss-process=image/contrast,${contrast}`
    this.setData({
      preview_image_url: image_url
    });
  },
  changeBright(e) {
    let bright = e.detail.value
    let url = this.data.preview_image_url
    let init_image_url = url.split("?")[0]
    let image_url = `${init_image_url}?x-oss-process=image/bright,${bright}`
    this.setData({
      preview_image_url: image_url
    });
  },

  showMeiyanModal() {
    this.setData({
      showMeiyanModal: !this.data.showMeiyanModal
    });
  },

  hideMeiyanModal() {
    this.setData({
      showMeiyanModal: false
    });
  },

  saveMeiyanImage() {
    this.setData({
      showMeiyanModal: false
    });
  },

  showHuanzhuangModal() {
    this.setData({
      showHuanzhuangModal: !this.data.showHuanzhuangModal
    });
    this.getClothes()
  },

  hideHuanzhuangModal() {
    this.setData({
      showHuanzhuangModal: false
    });
  },

  saveHuanzhuangImage() {
    this.setData({
      showMeiyanModal: false
    });
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  getWhitePic() {
    wx.showLoading({
      title: '加载中',
    })
    let file_path = app.globalData.tempFilePaths
    console.log(file_path)
    wx.uploadFile({
      url: 'https://api.id-photo-verify.com/official_web/bgcolor',
      filePath: file_path,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',
      },
      formData: {},
      success: (result) => {
        let res_data =
          typeof result.data === 'string'
            ? JSON.parse(result.data)
            : result.data
        if (res_data.code === 200) {
          this.setData({
            preview_image_url: res_data.result.url,
          })
        }
        wx.hideLoading()
      },
    })
  },

  doChangeBgColor(e) {
    let color = e.currentTarget.dataset.target
    //读取换背景后的图片
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },

  showPayDialog() {
    this.setData({
      pay_dialog: true,
    })
  },

  hidePayDialog() {
    this.setData({
      pay_dialog: false,
    })
  },

  getSpec() {
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = {
      spec_id: this.data.spec_id,
    }
    getSpec(request_data, headers).then((res) => {
      if (res.code === 0 && !isEmpty(res.data)) {
        this.setData({
          spec: res.data,
          total_price: res.data.price,
        })
      } else {
        wx.showToast({
          title: '规格获取失败',
        })
      }
    })
  },

  
  getClothes() {
    wx.showLoading({
      title: '加载中',
    });
    let auth_token = app.globalData.token || wx.getStorageSync('token')
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
    let request_data = {
      sex: this.data.cur_sex,
    }
    getClothes(request_data, headers).then((res) => {
      if (res.code === 0 && !isEmpty(res.data)) {
        console.log(res.data)
        this.setData({
          swiperList: res.data,
        })
        this.towerSwiper('swiperList')
        wx.hideLoading();
      } else {
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },

  pay() {
    try {
      let submit_nums = 0
      let auth_token = app.globalData.token || wx.getStorageSync('token')
      let spec_id = this.data.spec_id
      if (spec_id === null || spec_id === undefined || spec_id === '') {
        wx.showToast({ title: '未选择制作规格…', icon: 'none', duration: 2000 })
        return
      }
      let request_data = {
        spec_id: spec_id,
        pay_json: JSON.stringify([
          this.data.preview_print_image_url,
          this.data.preview_image_url,
        ]),
      }
      let headers = {
        Authorization: `Bearer ${auth_token}`,
      }

      submit_nums++
      if (submit_nums === 1) {
        doPay(request_data, headers)
          .then((res) => {
            console.log(res)
            let is_pay_success = false
            if (res.code === 0) {
              is_pay_success = true
              wx.showToast({ title: '支付成功' })
            } else {
              is_pay_success = false
              wx.showToast({ title: '支付失败' })
            }
            this.setData({
              is_pay: is_pay_success,
              pay_dialog: false,
              modalName: null,
            })
          })
          .catch((e) => {
            wx.showToast({ title: '请求失败' })
          })
      }
    } catch (err) {
      console.log(err)
    }
  },

  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox
    let values = e.currentTarget.dataset.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked
        break
      }
    }
    let sum = 0
    items.forEach(function (value) {
      console.log(value)
      if (value.checked) {
        sum += parseFloat(value.price)
      }
    })
    let spec_price = isEmpty(this.data.spec.price)
      ? 0
      : parseFloat(this.data.spec.price)
    let total_price = sum + spec_price
    console.log(total_price)
    this.setData({
      checkbox: items,
      total_price: total_price,
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
