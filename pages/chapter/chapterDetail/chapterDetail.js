const api = require("../../../utils/api")
const util = require("../../../utils/util")

// pages/chapter/chapterDetail/chapterDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterId: -1,
    articleList: [],
    curPage: 1,
    pageCount: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.data.chapterId = options.id
    this.getArticleList()
  },
  getArticleList: function () {
    api.chapterArticles(this.data.chapterId, this.data.curPage)
      .then(data => {
        this.data.curPage = this.data.curPage + 1
        this.data.articleList.push(...data.datas)
        this.setData({
          articleList: this.data.articleList,
          pageCount: data.pageCount,
        })
        wx.stopPullDownRefresh()
      }).catch(err => {
        wx.stopPullDownRefresh()
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
    util.toast('itemClick')
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
    this.setData({
      articleList: [],
      pageCount: -1,
      curPage: 1
    })
    this.getArticleList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.curPage < this.data.pageCount) {
      this.getArticleList()
    } else {
      util.toast('no more data')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})