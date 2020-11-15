// pages/crop/index.js
const app = getApp()
Page({
  data: {
      src: '',
      width: 250,//宽度
      height: 250,//高度
  },
  onLoad: function (options) {
//获取到image-cropper实例
      this.cropper = this.selectComponent("#image-cropper");
      //开始裁剪
      console.log(App.globalData.tempFilePaths)
      this.setData({
          src: App.globalData.tempFilePaths,
      });
      wx.showLoading({
          title: '加载中'
      })
  },
  cropperload(e){
      console.log("cropper初始化完成");
  },
  loadimage(e){
      console.log("图片加载完成",e.detail);
      wx.hideLoading();
      //重置图片角度、缩放、位置
      this.cropper.imgReset();
  },
  clickcut(e) {
      console.log(e.detail);
      //点击裁剪框阅览图片
      wx.previewImage({
          current: e.detail.url, // 当前显示图片的http链接
          urls: [e.detail.url] // 需要预览的图片http链接列表
      })
  },
  submit(){
    this.cropper.getImg((obj)=>{
      app.globalData.imgSrc = obj.url;
      wx.navigateBack({
        delta: -1
      })
    });
  },
  upload(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
        App.globalData.tempFilePaths = tempFilePaths
      }
    })
  },
  rotate(){
    //在用户旋转的基础上旋转90°
    this.cropper.setAngle(this.cropper.data.angle+=90);
  },
  end(e) {
    clearInterval(this.data[e.currentTarget.dataset.type]);
  },
  cancel() {
    wx.navigateBack({
      delta: -1
    })
  }
})