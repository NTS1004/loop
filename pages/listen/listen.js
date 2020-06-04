// pages/listen/listen.js
const App = getApp();
const innerAudioContext = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: [],
    musicImg: "",
    position: 0,
    status: false,
    list: [],
    animation: "",
    transtion: false,
    name: "",
    index: 0,
    code: 0,
    rotate: "",
    play: false,
    ti: "",
    pors: false
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (e) {
    this.setData({
      list: App.data.list,
      index: App.data.index,
    })
    let that = this;
    this.ani = wx.createAnimation({
      duration:700,
      timingFunction:"ease"
    })
    innerAudioContext.onTimeUpdate(()=>{
      setTimeout(()=>{
        let currenTime = parseInt(innerAudioContext.currentTime)
        let duration = parseInt(innerAudioContext.duration)
        let time = currenTime/duration * 100;
        that.setData({
          position: time
        })
      },100)
    })
    innerAudioContext.onEnded(()=>{
      if(this.data.code == 0){
        console.log(this.data.code)
       let index = parseInt(Math.random() * this.data.list.length);
       let data = this.data.list[index];
       this.setData({
         musicImg: data.img,
         name: data.musicName,
         index: index
       })
       wx.setNavigationBarTitle({
         title: data.musicName,
        })
        innerAudioContext.title = data.musicName;
        innerAudioContext.src = data.music;
        App.data.name = data.musicName;
       }else if(this.data.code == 1){
        let index = parseInt(this.data.index) + 1;
        if(index >= this.data.list.length){
          index = 0
        }
        let data = this.data.list[index];
        this.setData({
          musicImg: data.img,
          name: data.musicName,
          index: index
        })
        wx.setNavigationBarTitle({
          title: data.musicName,
         })
         innerAudioContext.title = data.musicName;
         innerAudioContext.src = data.music;
         App.data.name = data.musicName;
       }else{
        let index =  parseInt(this.data.index);
        let data = this.data.list[index];
        this.setData({
          musicImg: data.img,
          name: data.musicName,
          index: index
        })
        wx.setNavigationBarTitle({
          title: data.musicName,
         })
         innerAudioContext.title = data.musicName;
         innerAudioContext.src = data.music;
         App.data.name = data.musicName;
       }
    })

      wx.request({
        url: "https://cjh1004.vip:800/listen",
        data: {name: e.id},
        dataType: "json",
        success(res){
          let data = res.data[0];
          wx.setNavigationBarTitle({
            title: data.musicName,
          })
          if(App.data.name !== data.musicName){
            innerAudioContext.title = data.musicName;
            innerAudioContext.src = data.music;
            App.data.name = data.musicName;
          }
          that.setData({
            music: data,
            musicImg: data.img,
            play: true,
            status: true,
            name: data.musicName
          })
        },
        fail(err){
          console.log(err)
        }
      })
      if(App.data.name !== e.id){}else{
      setTimeout(()=>{
        console.log(innerAudioContext.duration)
        console.log(innerAudioContext.currentTime)
      },1000)
    }
  },
  change(e){
    let time = e.detail.value / 100;
    let duration = parseInt(innerAudioContext.duration);
    let post = time * duration
    innerAudioContext.play()
    innerAudioContext.seek(post)
    this.setData({
      position: e.detail.value
    })
  },
  pop(){
    if(this.data.status){
      this.setData({
        pors: true
      })
      innerAudioContext.pause()
    }else{
      this.setData({
        pors: false
      })
      innerAudioContext.play()
    }
    this.setData({
      status: !this.data.status
    })
  },
  pst(){
    this.ani.bottom(0).step();
    this.setData({
      animation: this.ani.export(),
      transtion: true
    })
  },
  hide(){
    this.ani.bottom(-500).step();
    this.setData({
      animation: this.ani.export(),
      transtion: false
    })
  },
  listen(ev){
    let that = this;
    wx.request({
      url: "https://cjh1004.vip:800/listen",
      data: { name: ev.currentTarget.dataset.name },
      dataType: "json",
      success(res) {
        let data = res.data[0];
        wx.setNavigationBarTitle({
          title: data.musicName,
        })
        if (App.data.name !== data.musicName) {
          innerAudioContext.title = data.musicName;
          innerAudioContext.src = data.music;
          App.data.name = data.musicName;
        }
        that.setData({
          music: data,
          status: true,
          musicImg: data.img,
          name: data.musicName,
          index: ev.currentTarget.dataset.index
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  after(){
    this.setData({
      play: false,
      pors: false
    })
    if(this.data.ti != ""){
      this.setData({
        ti: clearTimeout(this.data.ti)
      })
    }
    let index = parseInt(this.data.index) - 1;
    if(index < 0){
      index = this.data.list.length-1
    }
    let data = this.data.list[index];
    let ti = setTimeout(()=>{
      this.setData({
        play: true
      })
    },500)
    this.setData({
      musicImg: data.img,
      name: data.musicName,
      index: index,
      ti: ti
    })
    wx.setNavigationBarTitle({
      title: data.musicName,
    })
    innerAudioContext.title = data.musicName;
    innerAudioContext.src = data.music;
    App.data.name = data.musicName;
  },
  befor(){
    this.setData({
      play: false,
      pors: false
    })
    
    let index = parseInt(this.data.index) + 1;
    if(index >= this.data.list.length){
      index = 0
    }
    let data = this.data.list[index];
    let ti = setTimeout(()=>{
      this.setData({
        play: true
      })
    },1000)
    this.setData({
      musicImg: data.img,
      name: data.musicName,
      index: index,
      ti: ti
    })
    wx.setNavigationBarTitle({
      title: data.musicName,
    })
    innerAudioContext.title = data.musicName;
    innerAudioContext.src = data.music;
    App.data.name = data.musicName;
  },
  code(){
    let code = parseInt(this.data.code) + 1;
    if(code > 2){
      code = 0
    }
    this.setData({
      code: code
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