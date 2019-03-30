// pages/pics/pics.js
var that = this
// 1. 获取数据库引用
const db = wx.cloud.database()
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: wx.getSystemInfoSync().windowHeight,
    loadingState: 0,
    pageData: null,
    isPlayingMusic: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.getPageData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    innerAudioContext.onPlay(() => {
      console.log('录音播放开始');
      that.setData({
        isPlayingMusic: true
      })
    })

    innerAudioContext.onStop(() => {            
      console.log('录音播放停止');   
      that.setData({
        isPlayingMusic: false
      })     
    })

    innerAudioContext.onEnded(() => {            
      console.log('录音播放结束');    
      that.setData({
        isPlayingMusic: false
      })    
    })

    innerAudioContext.onPause(() => {
      console.log('录音播放暂停');
      that.setData({
        isPlayingMusic: false
      }) 
    })
  },

  /**
   * 获取页面数据
   */
  getPageData: function() {
    db.collection('indexHunShaList').get({
      success(res) {
        console.log(res)
        if (res.errMsg == "collection.get:ok") {
          that.setData({
            loadingState: 1,
            pageData: res.data[0],
          })
          //设置背景音乐
          innerAudioContext.autoplay = true
          innerAudioContext.loop = true
          if (that.data.pageData.backMusic) {
            innerAudioContext.src = that.data.pageData.backMusic
          }
        } else {
          that.setData({
            loadingState: 3
          })
        }
      }
    })
  },

  /**
   * banner的照片点击
   */
  bannerimageClick: function(e) {
    let imagetype = e.currentTarget.id
    wx.navigateTo({
      url: '../piclist/piclist?imagetype=' + imagetype,
    })
  },

  /**
   * banner的照片点击
   */
  listimageClick: function(e) {
    let imagetype = e.currentTarget.id
    wx.navigateTo({
      url: '../piclist/piclist?imagetype=' + imagetype,
    })
  },

  /**
   * 点击重新加载
   */
  reload: function() {
    that.setData({
      loadingState: 0
    })
    that.getPageData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (innerAudioContext.paused) {
      innerAudioContext.play();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  play: function(event) {
    if (this.data.isPlayingMusic) {
      that.setData({
        isPlayingMusic: false
      })
      innerAudioContext.pause();
    } else {
      that.setData({
        isPlayingMusic: true
      })
      innerAudioContext.play();
    }
  }
})