Page({
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video',
    }
  },

  onReady() {},

  onHide() {},

  tabSelect(e) {
    console.log(e)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },

  data: {
    TabCur: 1,
    scrollLeft: 0,
    nav_top_menus: [
      {
        id: 1,
        menu_text: '全部'
      },
      {
        id: 2,
        menu_text: '待付款'
      },
      {
        id: 3,
        menu_text: '待收货'
      },
      {
        id: 4,
        menu_text: '已完成'
      }
    ]
  },

  jumpLogisticPage() {
    wx.navigateTo({
      url: '/pages/order/logistic',
    })
  },

  jumpOrderDetailPage() {
    console.log('dadsa')
    wx.navigateTo({
      url: '/pages/order/detail',
    })
  },

  delOrder() {
    wx.showModal({
      title: '提示',
      content: '你确定要删除该订单？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
