//index.js
//获取应用实例
const app = getApp()
// 1. 获取数据库引用
const db = wx.cloud.database()
var that = this
Page({
  data: {
    loadingState: 0,
    showTitle: ''
  },

  onLoad: function() {
    that = this
    that.getStartTitle()
  },

  /**
   * 点击重新加载
   */
  reload: function() {
    that.setData({
      loadingState: 0
    })
    that.getStartTitle()
  },

  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 获取展示的标题
   */
  getStartTitle: function() {
    db.collection('indexTitle').get({
      success(res) {
        console.log(res)
        if (res.errMsg == "collection.get:ok") {
          that.setData({
            loadingState: 1,
            showTitle: res.data[0].startTitle,
          })
        } else {
          that.setData({
            loadingState: 3
          })
        }
      }
    })
  },

  jumpIndexPage: function() {
    wx.switchTab({
      url: '../../pages/pics/pics',
    })
  }
})