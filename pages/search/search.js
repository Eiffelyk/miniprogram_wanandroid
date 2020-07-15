const api = require("../../utils/api")
const util = require("../../utils/util")
const KEY = 'queryHistoryList'
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeys: [],
    searchHistories: [],
    showResult: false,
    pageIndex: 0,
    pageCount: 0,
    resultList: [],
    inputText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotKeys()
    this.getHistory()
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
  getHotKeys: function () {
    api.hotKey().then(data => {
      this.setData({
        hotKeys: data
      })
    })
  },
  onSearch: function () {
    let key = this.data.inputText
    api.search(this.data.pageIndex, {
      k: key
    }).then(data => {
      if (data.datas.length > 0) {
        // 有结果
        this.data.resultList.push(...data.datas)
        this.setData({
          resultList: this.data.resultList,
          showResult: true,
          pageIndex: data.curPage,
          pageCount: data.pageCount
        })
        this.saveHistory(key)
      } else {
        // 无结果
        if (this.data.pageIndex > 0) {
          util.toast('no more')
        } else {
          util.toast('search no result')
        }
      }
    })
  },
  inputChange: function (event) {
    this.setData({
      inputText: event.detail.value
    })
  },
  confirmSearch: function () {
    if (this.data.inputText.length == 0) {
      util.toast('input query key')
      return
    }
    this.onSearch()
  },
  onClickClear: function () {
    this.setData({
      inputText: ''
    })
  },
  onClickCancle: function () {
    this.setData({
      inputText: '',
      showResult: false,
      resultList: [],
      pageIndex: 0,
      pageCount: 0,
    })
  },
  getHistory: function () {
    let that = this
    wx.getStorage({
      key: KEY,
      success: res => {
        that.setData({
          searchHistories: res.data
        })
      }
    })
  },
  onHistoryClearClick: function () {
    let _this = this
    wx.removeStorage({
      key: KEY,
      success: res => {
        _this.setData({
          searchHistories: []
        })
      }
    })
  },
  onHistoryItemClick: function (event) {
    let key = event.currentTarget.dataset.key
    this.setData({
      inputText: key
    })
    this.onSearch()
  },
  /**
   * 删除掉historyList中和当前key相同的记录
   * @param {array} historyList 
   * @param {string} key 
   */
  removeRepeatKey: function (historyList, key) {
    historyList.every((event, index, array) => {
      if (event == key) {
        historyList.splice(index, 1)
        return false
      } else {
        return true
      }
    })
  },
  saveHistory: function (key) {
    let historyList = this.data.searchHistories
    this.removeRepeatKey(historyList, key)
    historyList.unshift(key)
    if (historyList.length > 20) {
      historyList = historyList.slice(0, 20)
    }
    let _this = this
    wx.setStorage({
      data: historyList,
      key: KEY,
      success: (res) => {
        _this.setData({
          searchHistories: historyList
        })
      }
    })
  },
  onResultItemClick: function (event) {
    let link = event.currentTarget.dataset.link
    util.toast(`click ${link}`)
  },
  onCollect: function (event) {
    // id，index，collect
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    let isCollect = event.currentTarget.dataset.collect
    let key = 'resultList[' + index + '].collect'
    api.doCollect(id, null, isCollect).then(data => {
      this.setData({
        [key]: !isCollect
      })
    })
  }
})