const app = getApp()
Page({
  data: {
    PageCur: 'basics',
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      },
      {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      },
      {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      },
      {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      },
      {
        id: 4,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
      },
      {
        id: 5,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
      },
      {
        id: 6,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
      },
    ],
    iconList: [
      {
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
      },
      {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
      },
      {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
      },
    ],
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
    })
  },
  onShareAppMessage() {
    return {
      title: 'DoniaiMini-轻奢的智能证件照小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index',
    }
  },
  jumpOcr() {
    wx.navigateTo({
      url: '/pages/ocr/index',
    })
  },
  jumpQuestionPage() {
    wx.navigateTo({
      url: '/pages/question/index',
    })
  },

  jumpTrsanlatePage() {
    wx.navigateTo({
      url: '/pages/translate/index',
    })
  },

  jumpCropPage() {
    wx.navigateTo({
      url: '/pages/ocr/text',
    })
  },

  jumpPhotoPage() {
    wx.navigateTo({
      url: '/pages/photo/index',
    })
  },
})
