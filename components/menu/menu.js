// pages/menu/menu.js
let util = require('../../utils/util.js')
const api = require('../../utils/api.js')
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
      if (!wx.getStorageSync('name')) {
        util.toast('请先登录')
        return
      }
      wx.navigateTo({
        url: '../../pages/collection/collection',
      })
    },
    toSetting: function () {
      util.toast('设置')
    },
    toAbout: function () {
      util.toast('关于')
    },
    onLogout: function () {
      if (!wx.getStorageSync('name')) {
        return
      }
      wx.showModal({
        cancelText: '取消',
        confirmText: '确定',
        content: '您确认要退出吗？',
        showCancel: true,
        title: '提示',
        success: (result) => {
          api.logout().then(data => {
            util.toast('logout success');
            wx.clearStorage();
            this.setData({
              name: '登录'
            });
            setTimeout(() => {
              this.onCloseMenu();
            }, 300);
          }).catch(res => {

          });
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    },
    onLogin: function () {
      if (wx.getStorageSync('name')) {
        return
      }
      let that = this;
      wx.navigateTo({
        url: '/pages/login/login',
        events: {
          loginSuccess: (data) => {
            console.log('走到这里');
            that.setData({
              name: data.data
            })
          }
        }
      })
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