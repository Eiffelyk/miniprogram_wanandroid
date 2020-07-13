const api = require("../../utils/api")
const util = require("../../utils/util")
let app = getApp()
// pages/nav/nav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviData: [],
    selectIndex: 0,
    naviList: [],
    websites: [],
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNaviData()
    this.getHotWeb()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          scrollHeight: result.windowHeight - app.globalData.naviInfo.naviHeight,
        })
      },
    })
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

  },
  getNaviData: function () {
    api.navi().then(data => {
      let naviList = ['热门']
      data.forEach((item) => {
        naviList.push(item.name)
      })
      this.setData({
        naviList: naviList,
        naviData: data
      })
      this.getHotWeb()
    })
  },
  /**
   * 获取热门网站（导航的第一项）
   */
  getHotWeb: function () {
    api.hotWeb().then(data => {
      let list = []
      data.forEach((item) => {
        list.push({
          link: item.link,
          title: item.name
        })
      })
      this.data.naviData.unshift({
        articles:list
      })
      this.setData({
        websites: this.data.naviData[this.data.selectIndex].articles
      })
    })
  },
  onLeftItemClick: function (event) {
    let index = event.currentTarget.dataset.index
    this.setData({
      selectIndex: index,
      websites: this.data.naviData[index].articles
    })
  },
  onRightItemClick: function (event) {
    let link = event.currentTarget.dataset.link
    util.toast('item click')
  }
})