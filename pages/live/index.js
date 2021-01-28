// pages/live/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    liveList: [
      {
        live_url: 'http://223.110.243.173/PLTV/3/224/3221227215/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/p3YLujGXT4VIvEQ.png',
        name: '浙江卫视',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/hbhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/EgqpKxSXTD1yNUW.jpg',
        name: '湖北卫视',
        view_count: 20,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/dfhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/reFh2p8NQyvGM69.png',
        name: '东方卫视',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/gdhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/sUFuxGpPdwTNrKC.png',
        name: '广东卫视',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/hunanhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/3Spo5LzFUJOluCB.jpg',
        name: '湖南卫视',
        view_count: 20,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/szhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/RmlSprUNDn7zgdu.png',
        name: '深圳卫视',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/ahhd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/MophHXqLynBiYzW.jpg',
        name: '安徽卫视',
        view_count: 20,
      },
      {
        live_url:
          'https://nhkw-zh-hlscomp.akamaized.net/ixxemlzk1vqvy44o/playlist.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/WNCMO2AJzjgHBwp.jpg',
        name: '日本NHK华语',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/UjeFi2ZSARNdoc1.png',
        name: 'CCTV-1综合',
        view_count: 10,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/URtWnecaENmkyLP.png',
        name: 'CCTV-6电影',
        view_count: 20,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/cctv8hd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/NwmubOeSaFU6jpt.png',
        name: 'CCTV-8电视剧',
        view_count: 20,
      },
      {
        live_url: 'http://223.110.241.130:6610/gitv/live1/G_CCTV-13-HQ/.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/MDRzITV5ebBCJcf.png',
        name: 'CCTV-13新闻',
        view_count: 20,
      },
      {
        live_url: 'https://stream.chinasuntv.com/680k/mid_video_index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/MJmT3QYu2LfoFnv.png',
        name: '阳光卫视',
        view_count: 20,
      },
      {
        live_url: 'http://zhibo.hkstv.tv/livestream/mutfysrq/playlist.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/uWOmQjaHzvPVb5T.jpg',
        name: '香港卫视',
        view_count: 20,
      },
      {
        live_url: 'http://m.567it.com/jade.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/DqFBI4cvEM8jOsd.jpg',
        name: '翡翠台',
        view_count: 20,
      },
      {
        live_url: 'http://223.110.245.138/PLTV/3/224/3221226922/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/UjeFi2ZSARNdoc1.png',
        name: '凤凰卫视中文',
        view_count: 20,
      },
      {
        live_url:
          'http://112.17.40.140/PLTV/88888888/224/3221226825/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/VJaF4ZtMlYGb8eR.jpg',
        name: '都市剧场',
        view_count: 20,
      },
      {
        live_url:
          'http://39.135.135.81:80/wh7f454c46tw1744894462_1818032107/ottrrs.hl.chinamobile.com/PLTV/88888888/224/3221225742/index.m3u8?icpid=88888888&RTS=1554599517&from=1&hms_devid=690',
        cover_url: 'https://i.loli.net/2021/01/28/n6MoB32NceyrgTi.png',
        name: 'NewTV-欢乐剧场',
        view_count: 20,
      },
      {
        live_url:
          'http://223.110.243.211/PLTV/3/224/3221227600/index.m3u8?servicetype=1&icpid=88888888&from=1&hms_devid=143',
        cover_url: 'https://i.loli.net/2021/01/28/n6MoB32NceyrgTi.png',
        name: 'NewTV-家庭剧场',
        view_count: 20,
      },
      {
        live_url: 'http://ivi.bupt.edu.cn/hls/chchd.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/dbu8GqxTeZrwf3j.jpg',
        name: 'CHC高清电影',
        view_count: 20,
      },
      {
        live_url:
          'http://cbsnewshd-lh.akamaihd.net/i/CBSNHD_7@199302/master.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: '美国CBS News',
        view_count: 20,
      },
      {
        live_url:
          'http://39.134.65.162/PLTV/88888888/224/3221225562/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/fUEL8iP2opY7dle.png',
        name: '卡酷少儿',
        view_count: 20,
      },
      {
        live_url:
          'http://112.17.40.150/hwltc.tv.cdn.zj.chinamobile.com/PLTV/88888888/224/3221230049/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: 'IHOT爱怀旧',
        view_count: 20,
      },
      {
        live_url:
          'http://112.17.40.150/hwltc.tv.cdn.zj.chinamobile.com/PLTV/88888888/224/3221230106/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: 'IHOT爱科学',
        view_count: 20,
      },
      {
        live_url:
          'http://112.17.40.140/PLTV/88888888/224/3221226179/index.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: '高清美剧',
        view_count: 20,
      },
      {
        live_url:
          'http://221.179.136.139/otttv.bj.chinamobile.com/PLTV/88888888/224/3221226553/1.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: '北京IPTV淘剧场',
        view_count: 20,
      },
      {
        live_url:
          'http://221.179.136.144/otttv.bj.chinamobile.com/PLTV/88888888/224/3221226552/1.m3u8',
        cover_url: 'https://i.loli.net/2021/01/28/HrYC49LeKb5SDlJ.jpg',
        name: '北京IPTV淘电影',
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
