// pages/piclist/piclist.js
var that = this
var app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagetype: '',
    loadingState: 0,
    pagerList: [],
    pagersize: 16,
    pagernumber: 0,
    isloadmore: false,
    isRefresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      imagetype: options.imagetype
    })
    that.getPageData()
  },

  /**
   * 获取页面数据
   */
  getPageData: function() {
    var ye = that.data.pagersize * that.data.pagernumber
    var size = that.data.pagersize
    console.log(ye)
    db.collection('picListDetails').where({
        imagetype: that.data.imagetype
      }).skip(ye).limit(size)
      .get()
      .then(res => {
        let list = res.data
        if (that.data.isRefresh) {
          that.setData({
            pagerList: list,
            isRefresh: false,
            loadingState: 1
          })
          wx.stopPullDownRefresh()
        } else {
          var templist = that.data.pagerList
          var resultlist = templist.concat(list)
          that.setData({
            pagerList: resultlist,
            loadingState: 1
          })
        }
        if (list.length > 0){
          wx.setNavigationBarTitle({
            title: list[0].typename
          })
        }
        if (list.length >= that.data.pagersize) {
          that.setData({
            isloadmore: true
          })
        } else {
          that.setData({
            isloadmore: false
          })
        }
      })
      .catch(err => {
        if (that.data.pagernumber > 0) {
          wx.showToast({
            title: '加载失败了',
            icon: "none"
          })
        } else {
          that.setData({
            loadingState: 3
          })
        }
      })
  },

  /**
   * 点击重新加载
   */
  reload: function() {
    that.setData({
      loadingState: 0,
      pagernumber: 0,
      isRefresh: true
    })
    that.getPageData()
  },

  /**
   * 查看大图
   */
  lookbigPic: function(e) {
    let position = e.currentTarget.id
    var list = that.data.pagerList
    let current = list[position].imageurl
    var urls = []
    for (var i in list) {
      urls = urls.concat(list[i].imageurl)
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
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
    that.setData({
      pagernumber: 0,
      isRefresh: true
    })
    that.getPageData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (that.data.isloadmore) {
      let pager = that.data.pagernumber + 1
      that.setData({
        pagernumber: pager
      })
      that.getPageData()
    } else {
      wx.showToast({
        title: '暂无更多数据',
        icon: "none"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})