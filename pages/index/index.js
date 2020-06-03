//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiper: [],
    scroll: [],
    music:[]
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: "https://cjh1004.vip:800/swiper",
      dataType: "json",
      success(res){
        let data = res.data;
        that.setData({
          swiper: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
    wx.request({
      url: "https://cjh1004.vip:800/scroll",
      dataType: "json",
      success(res){
        let data = res.data;
        that.setData({
          scroll: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
    wx.request({
      url: "https://cjh1004.vip:800/music",
      dataType: "json",
      success(res){
        let data = res.data;
        that.setData({
          music: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  scroll(ev){
    app.data.cover = ev.currentTarget.dataset.img;
    app.data.name = ev.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../group/group?id=' + ev.currentTarget.dataset.id
    })
  },
  swiper(ev){
    app.data.list = this.data.swiper;
    app.data.index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: "../listen/listen?id=" + ev.currentTarget.dataset.name
    })
  },
  listen(ev){
    app.data.list = this.data.music;
    app.data.index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: "../listen/listen?id=" + ev.currentTarget.dataset.name
    })
  }
})
