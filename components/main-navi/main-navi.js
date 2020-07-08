// components/main-navi/main-navi.js

let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    naviInfo: app.globalData.naviInfo,
    left: -app.globalData.naviInfo.naviWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMine:function(){
      this.setData({
        left:0
      })
    },
    toSearch:function(){

    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        left: -app.globalData.naviInfo.naviWidth
      })
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
