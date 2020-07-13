const api = require("../../../utils/api");
const util = require("../../../utils/util");

// pages/tree/treeDetail/treeDetail.js
Page({
  // categoryList:[{id,name}]
  // articleList:[{datas:[],curPage,pageCount}]
  /**
   * 页面的初始数据
   */
  data: {
    categoryItems: [],
    scrollWidth: 0,
    scrollLeft: 0,
    categoryList: [],
    swiperIndex: 0,
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    let categoryList = JSON.parse(decodeURIComponent(options.categoryList))
    categoryList.forEach(item => {
      this.data.articleList.push({
        datas: [],
        curPage: 0
      })
    });
    this.setData({
      categoryList: categoryList,
      articleList: this.data.articleList
    })
    this.getArticleList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 计算每个item测尺寸
    util.getViewSize('.item')
      .then(res => {
        res.forEach((item) => {
          this.data.categoryItems.push(item);
        })
      })

    // 计算分类滚动区域尺寸
    util.getViewSize('.category')
      .then(res => {
        this.data.scrollWidth = res[0].width;
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
  getArticleList: function () {
    let index = this.data.swiperIndex
    let cid = this.data.categoryList[index].id
    let pageIndex = this.data.articleList[index].curPage
    api.treeList(pageIndex, {
      cid: cid
    }).then(data => {
      this.saveArticleList(index, data)
    })
  },
  saveArticleList: function (index, data) {
    this.data.articleList[index].datas.push(...data.datas);
    this.data.articleList[index].curPage = data.curPage
    this.data.articleList[index].pageCount = data.pageCount
    let key = 'articleList[' + index + ']'
    this.setData({
      [key]: this.data.articleList[index]
    })
  },
  tabItemClick: function (event) {
    let index = event.currentTarget.dataset.index
    this.setData({
      swiperIndex: index
    })
  },
  onSwiperChange: function (event) {
    let index = event.detail.current;
    let item = this.data.categoryItems[index];
    let distance = item.left - (this.data.scrollWidth / 2 - item.width / 2);
    this.setData({
      swiperIndex: index,
      scrollLeft: distance
    })
    if (this.data.articleList[index].datas.length > 0) {
      return
    }
    this.getArticleList()
  },
  onLoadMore: function () {
    if (this.data.articleList[swiperIndex].curPage < this.data.articleList[swiperIndex].pageCount) {
      this.getArticleList()
    } else {
      util.toast('no more')
    }
  },
  onItemClick: function (event) {
    let link = event.currentTarget.dataset.link
    util.toast('item click')
  },
  onClickCollect: function (event) {
    // id,index,collect
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    let isCollect = event.currentTarget.dataset.collect
    let key = 'articleList[' + this.data.swiperIndex + '].datas[' + index + '].collect';
    api.doCollect(id, null, isCollect).then(data => {
      this.setData({
        [key]: !isCollect
      })
    })
  }
})