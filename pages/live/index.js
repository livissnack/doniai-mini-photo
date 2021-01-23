// pages/live/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    liveList: [
      {
        live_url: 'http://223.110.243.173/PLTV/3/224/3221227215/index.m3u8',
        name: '浙江卫视',
        view_count: 10,
      },
      {
        live_url: 'http://223.110.243.171/PLTV/3/224/3221227211/index.m3u8',
        name: '湖北卫视',
        view_count: 20,
      },
      {
        live_url: 'http://223.110.243.138/PLTV/3/224/3221227208/index.m3u8',
        name: '东方卫视',
        view_count: 10,
      },
      {
        live_url: 'http://223.110.243.173/PLTV/3/224/3221227220/index.m3u8',
        name: '湖南卫视',
        view_count: 20,
      },
      {
        live_url: 'http://223.110.243.171/PLTV/3/224/3221227217/index.m3u8',
        name: '深圳卫视',
        view_count: 10,
      },
      {
        live_url: 'http://223.110.243.140/PLTV/3/224/3221225634/index.m3u8',
        name: '安徽卫视',
        view_count: 20,
      },
      {
        live_url:
          'https://nhkw-zh-hlscomp.akamaized.net/ixxemlzk1vqvy44o/playlist.m3u8',
        name: '日本NHK华语',
        view_count: 10,
      },
      {
        live_url: 'http://218.38.152.31:1935/klive/klive.stream/playlist.m3u8',
        name: '韩国电视剧',
        view_count: 20,
      },
      {
        live_url:
          'http://live-temp-litchi-hls-yf.jstv.com/live/zhibo-cctv1gq/online.m3u8',
        name: 'CCTV-1综合',
        view_count: 10,
      },
      {
        live_url:
          'https://cctvtxyh5ca.liveplay.myqcloud.com/live/cctv6_2/index.m3u8',
        name: 'CCTV-6电影',
        view_count: 20,
      },
      {
        live_url: 'https://cctvcnch5ca.v.wscdns.com/live/cctv8_2/index.m3u8',
        name: 'CCTV-8电视剧',
        view_count: 20,
      },
      {
        live_url:
          'https://cctvtxyh5ca.liveplay.myqcloud.com/live/cctv13_2/index.m3u8',
        name: 'CCTV-13新闻',
        view_count: 20,
      },
      {
        live_url: 'https://stream.chinasuntv.com/680k/mid_video_index.m3u8',
        name: '阳光卫视',
        view_count: 20,
      },
      {
        live_url: 'http://zhibo.hkstv.tv/livestream/mutfysrq/playlist.m3u8',
        name: '香港卫视',
        view_count: 20,
      },
      {
        live_url: 'http://m.567it.com/jade.m3u8',
        name: '翡翠台',
        view_count: 20,
      },
      {
        live_url:
          'http://192.154.103.75:8080/ZZ_dongsenyangpian/ZZ_dongsenyangpian.m3u8',
        name: '东森洋片',
        view_count: 20,
      },
      {
        live_url:
          'http://cbsnewshd-lh.akamaihd.net/i/CBSNHD_7@199302/master.m3u8',
        name: '美国CBS News',
        view_count: 20,
      },
      {
        live_url:
          'http://cdnapi.kaltura.com/p/931702/sp/93170200/playManifest/entryId/1_oorxcge2/format/applehttp/protocol/http/uiConfId/28428751/a.m3u8',
        name: '美国CBS News',
        view_count: 20,
      },
    ],
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

  jumpLiveDetailPage(e) {
    let live = e.currentTarget.dataset.live
    wx.navigateTo({
      url: `/pages/live/detail?live_url=${live.live_url}&name=${live.name}`,
    })
  },
})
