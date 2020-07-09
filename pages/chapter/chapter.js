// pages/chapter/chapter.js
let api = require('../../utils/api.js')
Page({
  /**
   * 组件的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    this.getChapterList();
  },
  getChapterList: function () {
    api.chapter().then(data => {
      this.setData({
        chapterList: data
      });
      wx.stopPullDownRefresh();
    }).catch(res => {
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    this.getChapterList();
  }
})