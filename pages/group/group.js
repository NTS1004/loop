// pages/group/group.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    name: "",
    group: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    this.setData({
      img: app.data.cover,
      name: app.data.name
    })
    wx.request({
      url: 'https://cjh1004.vip:800/group',
      data: {id: e.id},
      dataType: 'json',
      success(res){
        let data = res.data
        that.setData({
          group: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  listen(ev){
    app.data.list = this.data.group;
    app.data.index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: "../listen/listen?id=" + ev.currentTarget.dataset.name
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 
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