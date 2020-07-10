const util = require("../../utils/util")
const api = require("../../utils/api")

// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage: 0,
    collectionList: [],
    pageCount: -1
  },
  getCollectionList: function () {
    api.collectList(this.data.curPage).then(data => {
      this.data.curPage = this.data.curPage + 1
      this.data.collectionList.push(...data.datas)
      this.setData({
        collectionList: this.data.collectionList,
        pageCount: data.pageCount
      })
    })
  },
  onItemClick: function (event) {
    let link = event.currentTarget.dataset.link
    util.toast(`to article ${link}`)
  },
  onClickCollect: function (event) {
    // originId ,id,index
    let originId = event.currentTarget.dataset.originid
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    let param = {
      originId,
    }
    api.doCollect(id, param, true).then(data => {
      util.toast('取消收藏')
      this.data.collectionList.splice(index,1)
      this.setData({
        collectionList: this.data.collectionList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectionList()
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
    if (this.data.curPage < this.data.pageCount) {
      this.getCollectionList()
    } else {
      util.toast('no more')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})