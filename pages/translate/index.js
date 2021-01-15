// pages/translate/index.js
const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

import { getTranslate } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
Page({
  data: {
    source_focus: false,
    source_text: '',
    source_lang: 'zh_CN',
    source_lang_text: '中文',

    target_focus: false,
    target_text: '',
    target_lang: 'en_US',
    target_lang_text: '英文',
    langs: [
      { name: '中文', code: 'zh_CN' },
      { name: '英文', code: 'en_US' },
    ],
    recordState: false, //录音状态
  },

  onLoad() {
    this.initRecord()
  },

  onShareAppMessage() {
    return {
      title: 'DoniaiMini-心声Lite，让爱发声',
      imageUrl: '/images/share.jpg',
      path: '/pages/translate/index',
    }
  },

  doCopy(e) {
    let type = e.currentTarget.dataset.type
    let source_text = this.data.source_text
    let target_text = this.data.target_text
    if (type == 'source' && !isEmpty(source_text)) {
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
    }

    if (type == 'target' && !isEmpty(target_text)) {
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
    }
  },

  sourcePickerChange(e) {
    let index = e.detail.value
    let selectLang = this.data.langs[index].code
    let selectText = this.data.langs[index].name
    this.setData({
      source_lang: selectLang,
      source_lang_text: selectText,
    })
  },
  source_focus: function () {
    this.setData({
      source_focus: true,
    })
  },
  setSourceText: function (e) {
    let text = e.detail.value
    this.setData({
      source_text: text,
    })
  },

  targetPickerChange(e) {
    let index = e.detail.value
    let selectLang = this.data.langs[index].code
    let selectText = this.data.langs[index].name
    this.setData({
      target_lang: selectLang,
      target_lang_text: selectText,
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
    let source_text = this.data.source_text
    if (isEmpty(source_text)) {
      return wx.showToast({ title: '翻译内容为空' })
    }
    wx.showLoading({ title: '翻译中' })

    let trans_data = {
      q: source_text,
      from: this.data.source_lang,
      to: this.data.target_lang,
    }
    getTranslate(trans_data)
      .then((res) => {
        console.log(res)
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

  /**
   * 按住开始录音
   */
  handleTouchStart() {
    wx.authorize({
      scope: 'scope.record',
      success: () => {
        this.setData({
          recordState: true,
        })
        manager.start({
          lang: this.data.source_lang,
        })
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '您未授权录音，功能将无法使用',
          showCancel: true,
          confirmText: '授权',
          confirmColor: '#52a2d8',
          success: (result) => {
            if (result.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (!res.authSetting['scope.record']) {
                    wx.showModal({
                      title: '提示',
                      content: '您未授权录音，功能将无法使用',
                      showCancel: false,
                      success: function (res) {},
                    })
                  }
                },
              })
            } else {
              this.setData({
                recordState: true,
              })
              manager.start({
                lang: this.data.source_lang,
              })
            }
          },
          fail: (e) => {
            console.log(e)
          },
        })
      },
    })
  },

  /**
   * 松开结束路由并识别内容
   */
  handleTouchEnd() {
    this.setData({
      recordState: false,
    })
    manager.stop()
  },

  /**
   * 初始化--语音识别
   */
  initRecord() {
    manager.onRecognize = (res) => {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = (res) => {
      console.log('成功开始录音识别', res)
    }
    // 识别错误事件
    manager.onError = (res) => {
      console.error('error msg', res)
    }
    //识别结束事件
    manager.onStop = (res) => {
      if (isEmpty(res.result)) {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
        })
        return
      }
      let text = this.data.source_text + res.result
      this.setData({
        source_text: text,
      })
    }
  },
})
