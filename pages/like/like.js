// pages/like/like.js
var util = require('../../utils/util.js')

var that = this
var app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: ['#d4237a', '#FFA827', '#AA47BC', '#42A5F6', '#66BB6A', '#FFA500', '#FF4500'],
    userInfo: null,
    pageCount: 0,
    loadingState: 0,
    inputValue: '',
    pagerList: [],
    pagersize: 16,
    pagernumber: 0,
    isloadmore: false,
    isRefresh: false,
    isInput: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res.userInfo) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          if (res.userInfo) {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo
            })
          }
        }
      })
    }
    that.getPageData()
  },

  /**
   * 获取页面数据
   */
  getPageData: function() {
    //获取祝福总条数
    db.collection('friendMsgList').count({
      success(res) {
        if (res.total > 0) {
          that.setData({
            pageCount: res.total
          })
        } else {
          that.setData({
            pageCount: 0
          })
        }
      }
    })

    var ye = that.data.pagersize * that.data.pagernumber
    var size = that.data.pagersize
    db.collection('friendMsgList').skip(ye).limit(size).orderBy('msgtime', 'desc')
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

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
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
        title: '暂无更多祝福,快送上您真挚的祝福吧',
        icon: "none"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取用户信息
   */
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo
      })
      that.foo()
    } else {
      wx.showToast({
        title: '请授权登录',
        icon: 'none'
      })
    }
  },

  /**
   * 提交祝福
   */
  foo: function() {
    if (that.data.inputValue) {
      wx.showLoading({
        title: '祝福发送中...',
      })
      //留言内容不是空值
      //定义要新增的数据
      var addData = {
        headimage: that.data.userInfo.avatarUrl,
        name: that.data.userInfo.nickName,
        msgcontent: that.data.inputValue,
        msgtime: util.formatTime(new Date()),
      }
      db.collection('friendMsgList').add({
          // data 字段表示需新增的 JSON 数据
          data: addData
        })
        .then(res => {
          wx.hideLoading()
          //将新增数据，插入的原有数组的第一条，
          var oldlist = that.data.pagerList
          var newlist = []
          newlist = newlist.concat(addData)
          newlist = newlist.concat(oldlist)
          var newpageCount = that.data.pageCount + 1
          that.setData({
            inputValue: '',
            pagerList: newlist,
            pageCount: newpageCount,
            isInput: false
          });
          wx.showToast({
            title: '祝福已送达！',
            icon: "success"
          })
        })
        .catch(res => {
          wx.hideLoading()
          wx.showToast({
            title: '抱歉，您的祝福没有送达哦！请稍后再试。',
            icon: "none"
          })
        })
    } else {
      //Catch Error
      wx.showModal({
        title: '提示',
        content: '您还没有填写内容,赶快写上您真挚的祝福吧！',
        confirmText: "送祝福",
        confirmColor: "#d4237a",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              isInput: true
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})