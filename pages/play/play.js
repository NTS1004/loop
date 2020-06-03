// pages/play/play.js
import moment from "moment"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    Vname: "",
    Vcount: null,
    Vtime: "",
    singer: "",
    vi: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    wx.request({
      url: 'https://cjh1004.vip:800/video',
      data: {name: e.name},
      dataType: 'json',
      success(res){
        let data = res.data[0];
        data.date = moment(data.date).format("YYYY-MM-DD")
        that.setData({
          url: data.video,
          Vname: data.title,
          Vcount: data.count,
          singer: data.singer,
          Vtime: data.date
        })
      },
      fail(err){
        console.log(err)
      }
    })
    wx.request({
      url: 'https://cjh1004.vip:800/who',
      data: {name: e.name},
      dataType: "json",
      success(res){
        let data = res.data;
        for(let i = 0;i < data.length;i++){
          data[i].date = moment(data[i].date).format("YYYY-MM-DD")
        }
        that.setData({
          vi: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  upda(ev){
    wx.redirectTo({
      url: '../play/play?name=' + ev.currentTarget.dataset.name
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