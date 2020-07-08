// pages/menu/menu.js
let util = require('../../utils/util.js')
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    left: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    naviInfo: app.globalData.naviInfo,
    name: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCloseMenu: function () {
      this.setData({
        left: -app.globalData.naviInfo.naviWidth
      })
    },
    toCollectian: function () {
      if (this.data.name=='登录') {
        util.toast('请先登录')
        return
      }
      util.toast('进入收藏页面')
    },
    toSetting: function () {
      util.toast('设置')
    },
    toAbout: function () {
      util.toast('关于')
    },
    onLogout: function () {
      if ( this.data.name == '登录') {
        return
      }
      wx.showModal({
        cancelText: '取消',
        confirmText: '确定',
        content: '您确认要退出吗？',
        showCancel: true,
        title: '提示',
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },
    onLogin: function () {
      if ( this.data.name != '登录') {
        return
      }
      util.toast('去登录')
    }
  },
  pageLifetimes: {
    show: function () {
      let name = wx.getStorageSync('name');
      if (!name) {
        name = '登录'
      }
      this.setData({
        name: name
      })
    }
  }
})