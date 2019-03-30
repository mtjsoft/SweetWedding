// pages/address/address.js
var that = this
// 1. 获取数据库引用
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingState: 0,
    pageData: null,
    latitude: 32.0140575463,
    longitude: 114.9210906029,
    markers: [{
      iconPath: '../../static/images/address.png',
      id: 0,
      latitude: 32.0140575463,
      longitude: 114.9210906029,
      width: 40,
      height: 40
    }],
  },

  /**
   * 获取页面数据
   */
  getPageData: function() {
    db.collection('inviteTab').get({
      success(res) {
        console.log(res)
        if (res.errMsg == "collection.get:ok") {
          var marks = that.data.markers
          marks[0].latitude = res.data[0].latitude
          marks[0].longitude = res.data[0].longitude
          that.setData({
            loadingState: 1,
            pageData: res.data[0],
            latitude: res.data[0].latitude,
            longitude: res.data[0].longitude,
            markers: marks
          })
          that.go()
        } else {
          that.setData({
            loadingState: 3
          })
        }
      }
    })
  },

  /**
   * 导航前往
   */
  go: function() {
    wx.showModal({
      title: '导航',
      content: '立即导航前往吗？',
      confirmText: "立即前往",
      confirmColor: "#d4237a",
      success(res) {
        if (res.confirm) {
          if (that.data.loadingState == 1) {
            wx.openLocation({
              latitude: that.data.latitude,
              longitude: that.data.longitude,
              scale: 18,
              name: '',
              address: that.data.pageData.address
            })
          }
        } else if (res.cancel) {
          wx.showToast({
            title: '下次点击图标即可开启导航',
            icon: "none"
          })
        }
      }
    })
  },

  /**
   * marker点点击
   */
  markertap(e) {
    that.go()
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }
})