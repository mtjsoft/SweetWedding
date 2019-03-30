// pages/invite/invite.js
var that = this
// 1. 获取数据库引用
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingState: 0,
    pageData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '邀请函',
    })
    that.getPageData()
  },

  /**
   * 获取页面数据
   */
  getPageData: function () {
    db.collection('inviteTab').get({
      success(res) {
        console.log(res)
        if (res.errMsg == "collection.get:ok") {
          that.setData({
            loadingState: 1,
            pageData: res.data[0],
          })
        } else {
          that.setData({
            loadingState: 3
          })
        }
      }
    })
  },

  /**
   * 点击重新加载
   */
  reload: function () {
    that.setData({
      loadingState: 0
    })
    that.getPageData()
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