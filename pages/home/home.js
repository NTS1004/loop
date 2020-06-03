// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ["推荐","Mv"],
    current: 0,
    top: []
  },
  swiperTab(ev) {
    this.setData({
      current: ev.detail.current
    })
  },
  swiperIndex(ev){
    this.setData({
      current: ev.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://cjh1004.vip:800/top',
      dataType: 'json',
      success(res){
        let data = res.data;
        that.setData({
          top: data
        })
      }
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