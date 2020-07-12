const api = require("../../utils/api")
const util = require("../../utils/util")

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    bannerList: [],
    curPage: 0,
    pageCount: -1,
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getArticleList(0)
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
    this.getBanner()
    this.getArticleList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.curPage<this.data.pageCount) {
      this.getArticleList(this.data.curPage)
    } else {
      util.toast('no more')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getBanner: function () {
    api.banner().then(data => {
      this.setData({
        bannerList: data
      })
    })
  },
  getArticleList: function (curPage) {
    api.articleList(curPage).then(data => {
      curPage = curPage + 1
      this.data.articleList.push(...data.datas)
      this.setData({
        curPage: curPage,
        articleList: this.data.articleList,
        pageCount: data.pageCount
      })
      wx.stopPullDownRefresh()
    }).catch(res => {
      wx.stopPullDownRefresh()
    })
  },
  onBannerChange: function (event) {
    this.setData({
      swiperIndex: event.detail.current
    })
  },
  onClickCollect: function (event) {
    //id,collect,index
    let id = event.currentTarget.dataset.id
    let isCollect = event.currentTarget.dataset.collect
    let index = event.currentTarget.dataset.index
    let key = 'articleList[' + index + '].collect'
    api.doCollect(id, null, isCollect).then(data => {
      this.setData({
        [key]: !isCollect
      })
    })
  },
  onItemClick: function (event) {
    //link
    util.toast('item click')
  },
})