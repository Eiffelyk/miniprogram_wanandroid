const api = require("../../utils/api")
const util = require("../../utils/util")

// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: 0,
    scrollItems: [],
    scrollWidth: 0,
    articleList: [],
    swiperIndex: 0,
    scrollList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProject()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 计算分类滚动区域尺寸
    util.getViewSize('.category')
      .then(res => {
        this.data.scrollWidth = res[0].width;
      })
    // 计算每个item测尺寸
    util.getViewSize('.item')
      .then(res => {
        res.forEach((item) => {
          this.data.scrollItems.push(item);
        })
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
  getProject() {
    api.project().then(data => {
      data.unshift({
        name: '最新项目'
      })
      data.forEach(item => {
        this.data.articleList.push({
          datas: [],
          curPage: 0
        })
      })
      this.setData({
        scrollList: data,
        articleList: this.data.articleList
      })
      this.getHotProject()
      this.onReady()
    })
  },
  getHotProject() {
    let index = this.data.articleList[0].curPage
    api.projectHot(index).then(data => {
      this.saveProjectList(0, data)
    })
  },
  getProjectList() {
    let index = this.data.swiperIndex
    let curPage = this.data.articleList[index].curPage
    let cid = this.data.scrollList[index].id
    let params = {
      cid: cid
    }
    api.projectList(curPage + 1, params).then(data => {
      this.saveProjectList(index, data)
    })
  },
  saveProjectList(index, data) {
    this.data.articleList[index].datas.push(...data.datas)
    this.data.articleList[index].curPage = data.curPage
    this.data.articleList[index].pageCount = data.pageCount
    let key = 'articleList[' + index + ']'
    this.setData({
      [key]: this.data.articleList[index]
    })
  },
  onTabItemClick: function (event) {
    //index
    let index = event.currentTarget.dataset.index
    this.setData({
      swiperIndex: index
    })
  },
  onSwiperChange: function (event) {
    let index = event.detail.current
    let item = this.data.scrollItems[index]
    let distance = item.left - (this.data.scrollWidth / 2 - item.width / 2)
    this.setData({
      swiperIndex: index,
      scrollLeft: distance
    })
    if (this.data.articleList[index].datas.length > 0) {
      return
    }
    if (index == 0) {
      this.getHotProject()
    } else {
      this.getProjectList()
    }
  },
  onLoadMore: function () {
    let index = this.data.swiperIndex
    if (this.data.articleList[index].curPage < this.data.articleList[index].pageCount) {
      if (index == 0) {
        this.getHotProject()
      } else {
        this.getProjectList()
      }
    } else {
      util.toast('no more')
    }
  },
  onClickCollect: function (event) {
    //index,id,collect
    let id = event.currentTarget.dataset.id;
    let isCollect = event.currentTarget.dataset.collect;
    let index = event.currentTarget.dataset.index;
    let key = 'articleList[' + this.data.swiperIndex + '].datas[' + index + '].collect'
    api.doCollect(id, null, isCollect).then(data => {
      this.setData({
        [key]: !isCollect
      })
    })
  }
})