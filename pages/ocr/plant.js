// pages/ocr/plant.js
const app = getApp()
import { API_ROOT } from '../../utils/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagePath: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    answer: [],
    isShow: false,
    baikedata: '',
    hidden: true,
    btnShow: false,
    noplant: false,
    noflowers: '',
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

  // 函数定义
  selectImage() {
    wx.chooseImage({
      count: 1,
      // 指定只能上传压缩图
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const file_path = res.tempFilePaths[0]
        // 解码图片base64
        // let imgbase = wx.getFileSystemManager().readFileSync(path, 'base64')
        let auth_token = app.globalData.token || wx.getStorageSync('token')
        wx.showLoading({ title: '上传中,请稍等…' })
        wx.uploadFile({
          url: `${API_ROOT}/api/ai/ocr_plant`,
          filePath: file_path,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth_token}`,
          },
          success: (res) => {
            wx.hideLoading()
            let answer1 =
              typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            answer1 = answer1.data.result
            console.log(answer1, typeof answer1)
            // map遍历
            let answer = answer1.map((item) => {
              const name = item.name
              const score = (item.score * 100).toFixed(2) + '%'
              const baike = item.baike_info
              return {
                name,
                score,
                baike,
              }
            })
            // console.log(answer);
            // 判断是否为植物
            if (answer[0].name.indexOf('非植物') != -1) {
              this.setData({
                hidden: true,
                btnShow: false,
                noplant: true,
                noflowers: '没有识别到植物',
              })
            } else {
              this.setData({
                answer,
                hidden: false,
                btnShow: false,
                noplant: false,
              })
            }
            this.setData({
              imagePath: file_path
            })
          },
          fail: (e) => {
            wx.showLoading({ title: '上传失败…' })
            this.setData({
              hidden: true,
              btnShow: false,
              noplant: true,
              noflowers: '网络错误 请重新上传',
            })
          },
          complete: (e) => {
            wx.hideLoading()
          },
        })
      },
      fail: (err) => {
        console.log(err)
      },
    })
  },

  baikeShow(event) {
    // console.log(event.currentTarget.dataset.itemdes);
    const baikedata = event.currentTarget.dataset.itemdes
    this.setData({
      isShow: true,
      baikedata: baikedata,
    })
  },

  cancelShow() {
    this.setData({
      isShow: false,
    })
  },

  toshare() {
    let share_img = this.data.imagePath
    let share_name = this.data.answer[0].name
    wx.navigateTo({
      url:
        '../poster/poster?share_img=' + share_img + '&share_name=' + share_name,
    })
  },
})
