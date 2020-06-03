// pages/components/top.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mv: []
  },
  created(){
    var that = this;
    wx.request({
      url: 'https://cjh1004.vip:800/top',
      dataType: 'json',
      success(res){
        let data = res.data;
        that.setData({
          mv: data
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    play(ev){
      wx.navigateTo({
        url: '../play/play?name=' + ev.target.dataset.name
      })
    }
  }
})
