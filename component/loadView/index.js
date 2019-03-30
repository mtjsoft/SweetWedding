// component/loadView/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loadingState: {
      type: Number,
      value: 0
    },
    loadIngStateImg: {
      type: Object,
      value: ["", "", "https://shop.hani.cn/local/no_data.png", "https://shop.hani.cn/local/net_error.png"]
    },
    loadIngStateText: {
      type: Object,
      value: ["", "", "暂无数据", "加载失败，点击重试"]
    },
    loadIngStateTextDsc: {
      type: Object,
      value: ["", "", "亲，暂无数据，点击刷新再试试吧", "服务器开小差了，点击刷新再试试吧"]
    },
    optionDec: {
      type: Object,
      value: ["", "", "刷新", "刷新"]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: wx.getSystemInfoSync().windowHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reLoad() {
      this.triggerEvent("reload", {
        loadingState: this.data.loadingState
      })

    }

  }
})