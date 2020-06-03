// pages/search/search.js
import moment from "moment";
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    name: [],
    music: [],
    text: ["歌曲","视频"],
    current: 0
  },
  search(ev){
    let that = this;
    this.setData({
      value: ev.target.dataset.name
    })
    wx.request({
      url: 'https://cjh1004.vip:800/body',
      data: {value: ev.target.dataset.name},
      dataType: 'json',
      success(res){
        let data = res.data[0];
        let done = res.data[1];
        if(done.length > 0){
          for(let i = 0;i < done.length;i++){
            done[i].date = moment(done[i].date).format("YYYY-MM-DD")
          }
        }
        that.setData({
          music: data,
          mv: done
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://cjh1004.vip:800/search',
      dataType: "json",
      success(res){
        let data  = res.data;
        that.setData({
          name: data
        })
      }
    })
  },
  val(event){
    if(event.detail.value == ""){
      this.setData({
        music: [],
        mv: []
      })
    }
  },
  input(event){
    let that = this;
    if(event.detail.value !== ""){
      wx.request({
        url: 'https://cjh1004.vip:800/body',
        data: {value: event.detail.value},
        dataType: 'json',
        success(res){
          let data = res.data[0];
          let done = res.data[1];
          if(done.length > 0){
            for(let i = 0;i < done.length;i++){
              done[i].date = moment(done[i].date).format("YYYY-MM-DD")
            }
          }
          that.setData({
            music: data,
            mv: done
          })
        }
      })
    }else{
      that.setData({
        music: []
      })
    }
  },
  listen(ev){
    App.data.list = this.data.music;
    App.data.index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: "../listen/listen?id=" + ev.currentTarget.dataset.name
    })
  },
  shiperTab(ev){
    this.setData({
      current: ev.detail.current
    })
  },
  swiperIndex(ev){
    this.setData({
      current: ev.target.dataset.index
    })
  },
  upda(ev){
    wx.navigateTo({
      url: '../play/play?name=' + ev.currentTarget.dataset.name
    })
  },
  null(){
    this.setData({
      value: ""
    })
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

  }
})