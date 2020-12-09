const app = getApp()
import {getAllMenu} from '../../utils/api'
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
    request: {
      keyword: ''
    },
    nav_menus: []
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
    })
  },

  onLoad(options) {
    this.getMenus()
  },

  changeSearchValue(e) {
    let search_value = e.detail.value
    this.setData({
      'request.keyword': search_value
    })
  },

  
  doSearch() {
    let request_data = this.data.request
    getAllMenu(request_data).then(res => {
      this.setData({
        nav_menus: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
    })
  },

  getMenus() {
    getAllMenu({}).then(res => {
      console.log(res);
      this.setData({
        nav_menus: res.data
      })
    }).catch(e => {
      wx.showToast({title: '请求失败'});
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

  jumpVillagePage() {
    wx.navigateTo({
      url: '/pages/village/index',
    })
  },

  jumpOcrPlantPage() {
    wx.navigateTo({
      url: '/pages/ocr/plant',
    })
  },

  jumpFarmingPage() {
    wx.navigateTo({
      url: '/pages/farming/index',
    })
  },

  jumpNewsPage() {
    wx.navigateTo({
      url: '/pages/news/index',
    })
  },

  jumpJobPage() {
    wx.showToast({
      title: '该功能尚未开发'
    });
  },

  jumpCalendarPage() {
    wx.navigateTo({
      url: '/pages/calendar/index',
    })
  },

  jumpQrcodePage() {
    wx.navigateTo({
      url: '/pages/qrcode/index',
    })
  },

  jumpFucaiPage() {
    wx.navigateTo({
      url: '/pages/fucai/index',
    })
  },

  jumpPage(e) {
    let url = e.currentTarget.dataset.jumpurl
    wx.navigateTo({
      url: url,
    })
  }
})
