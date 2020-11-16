// pages/translate/index.js
import { getTranslate } from '../../utils/api'
import { isEmpty } from '../../utils/helper'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source_focus: false,
    source_text: '',
    source_lang: 'zh-CN',
    source_lang_text: '中文',

    target_focus: false,
    target_text: '',
    target_lang: 'en_US',
    target_lang_text: '英文',
    langs: [
      {name: '中文', code: 'zh-CN'},
      {name: '英文', code: 'en_US'}
    ]
  },

  doCopy(e) {
    let type = e.currentTarget.dataset.type
    let source_text = this.data.source_text
    let target_text = this.data.target_text
    console.log(type, source_text, target_text, isEmpty(source_text))
    if(type == 'source' && !isEmpty(source_text)) {
      wx.setClipboardData({
        data: source_text,
        success: function () {
          wx.showToast({
            title: '复制成功',
            duration: 3000
          })
          wx.getClipboardData({
            success: function (res) {
            }
          })
        }
      });
    }

    if(type == 'target' && !isEmpty(target_text)) {
      console.log('dsasda')
      wx.setClipboardData({
        data: target_text,
        success: function(res) {
          wx.showToast({
            title: '复制成功',
            duration: 3000
          })
          wx.getClipboardData({
            success: function (res) {
            }
          })
        }
      });
    }
  },

  sourcePickerChange(e) {
    let index = e.detail.value;
    let selectLang = this.data.langs[index].code
    let selectText = this.data.langs[index].name
    this.setData({
      source_lang: selectLang,
      source_lang_text: selectText
    })
  },
  source_focus: function() {
    this.setData({
      source_focus: true
    })
  },
  setSourceText: function(e) {
    let text = e.detail.value
    this.setData({
      source_text: text
    })
  },


  targetPickerChange(e) {
    let index = e.detail.value;
    let selectLang = this.data.langs[index].code
    let selectText = this.data.langs[index].name
    this.setData({
      target_lang: selectLang,
      target_lang_text: selectText
    })
  },
  target_focus: function() {
    this.setData({
      target_focus: true
    })
  },
  setTargetText: function(e) {
    let text = e.detail.value
    this.setData({
      target_text: text
    })
  },

  doTranslate() {
 
    let source_text = this.data.source_text;
    if(isEmpty(source_text)) {
      return wx.showToast({title: '翻译内容为空'});
    }
    wx.showLoading({title: '翻译中'});

    let trans_data = {
      q: source_text,
      from: this.data.source_lang,
      to: this.data.target_lang,
    };
    getTranslate(trans_data).then(res => {
      console.log(res);
      wx.hideLoading();
      this.setData({
        target_text: res.data.to_content === null ? '翻译结果为空' : res.data.to_content
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
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
    return {
      title: 'DoniaiMini-轻奢的智能证件照小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/translate/index'
    }
  }
})