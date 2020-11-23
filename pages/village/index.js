// pages/village/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
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

    SortMenu: [
      { id: 0, name: '综合' },
      { id: 1, name: '销量' },
      { id: 2, name: '新品' },
      { id: 3, name: '价格' },
    ],
    ShopList: [
      {
        index: 1,
        image: 'https://image.weilanwl.com/img/4x3-1.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '100',
        sales: '2.2万',
      },
      {
        index: 2,
        image: 'https://image.weilanwl.com/img/4x3-2.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '1000',
        sales: '85',
      },
      {
        index: 3,
        image: 'https://image.weilanwl.com/img/4x3-3.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '39.9',
        sales: '2000',
      },
      {
        index: 4,
        image: 'https://image.weilanwl.com/img/4x3-4.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '100',
        sales: '2.2万',
      },
      {
        index: 5,
        image: 'https://image.weilanwl.com/img/4x3-3.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '39.9',
        sales: '2000',
      },
      {
        index: 6,
        image: 'https://image.weilanwl.com/img/4x3-4.jpg',
        title: '商品名称商品名称商品名称商品名称',
        price: '100',
        sales: '2.2万',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
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

  tabSelect(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  btnback: function () {
    wx.navigateBack()
  },

  search: function () {
    wx.navigateTo({
      url: '/pages/shop/search/index',
    })
  },
})
