// component/imageLoad/image-loader.js
/**
 * 图片预加载组件
 */
Component({
  properties: {
    //默认图片
    defaultImage: {
      type: String,
      value: "default_head.png"
    },
    //原始图片
    originalImage: {
      type: String,
      value: ""
    },
    widthNumber: {
      type: Number,
      value: 100
    },
    heightNumber: {
      type: Number,
      value: 100
    },
    //图片剪裁mode，同Image组件的mode
    modeImage: {
      type: String,
      value: "scaleToFill"
    },
    //图片圆角
    radiusNumber: {
      type: Number,
      value: 50
    }
  },
  data: {
    finishLoadFlag: false
  },
  methods: {
    finishLoad: function(e) {
      this.setData({
        finishLoadFlag: true
      })
    },
    errorLoad: function(e) {
      this.setData({
        finishLoadFlag: false
      })
    }
  }
})