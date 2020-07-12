const wxRequest = require('../utils/wxRequest.js');
const util = require('./util.js');
//首页banner 
let banner = () => wxRequest.get('/banner/json');
//首页文章列表
let articleList=(pageIndex)=>wxRequest.get(`/article/list/${pageIndex}/json`);
//获取公众号列表
let chapter = () => wxRequest.get('/wxarticle/chapters/json');
//查看某个公众号历史数据｜｜在某个公众号中搜索历史文章
let chapterArticles = (chapterId, pageCurrent, params) => wxRequest.get(`/wxarticle/list/${chapterId}/${pageCurrent}/json`, params);
//登录
let login = (params) => wxRequest.post('/user/login', params);
//退出
let logout = () => wxRequest.get('/user/logout/json');
//注册
let register = (params) => wxRequest.post('/user/register', params);
//体系
let tree = () => wxRequest.get('/tree/json');
//收藏站内文章
let collectMe = (id) => wxRequest.post(`/lg/collect/${id}/json`);
//收藏站外文章
let collectOther = (params) => wxRequest.post('/lg/collect/add/json', params);
//取消收藏（文章页面）
let unCollectOutCollectList = (id) => wxRequest.post(`/lg/uncollect_originId/${id}/json`);
//取消收藏（收藏列表中）
let unCollectInCollectList = (id, params) => wxRequest.post(`/lg/uncollect/${id}/json`, params);
//收藏列表
let collectList = (pageIndex) => wxRequest.get(`/lg/collect/list/${pageIndex}/json`);
//收藏操作
let doCollect = (id = null, params = null, isCollect) => {
  if (!wx.getStorageSync('name')) {
    return new Promise((resolve, reject) => {
      util.toast('please login')
      reject(null)
    })
  }
  return new Promise((resolve, reject) => {
    if (isCollect) {
      cancelCollect(id, params).then(data => {
        util.toast('取消成功')
        resolve(data)
      }).catch(res => {
        util.toast('取消失败')
        reject(res)
      })
    } else {
      collect(id, params).then(data => {
        util.toast('收藏成功')
        resolve(data)
      }).catch(res => {
        util.toast('收藏失败')
        reject(res)
      })
    }
  })
};
//收藏（封装站内站外）
let collect = (id = null, params = null) => {
  return new Promise((resolve, reject) => {
    if (id) {
      collectMe(id).then(data =>
        resolve(data)
      ).catch(res =>
        reject(res)
      )
    } else {
      collectOther(params).then(data =>
        resolve(data)
      ).catch(res =>
        reject(res)
      )
    }
  })
};
//取消收藏（封装收藏列表和文章列表）
let cancelCollect = (id, params = null) => {
  return new Promise((resolve, reject) => {
    if (params) {
      unCollectInCollectList(id, params).then(data =>
        resolve(data)
      ).catch(res =>
        reject(res)
      )
    } else {
      unCollectOutCollectList(id, params).then(data =>
        resolve(data)
      ).catch(res =>
        reject(res)
      )
    }
  })
};
module.exports = {
  banner,
  articleList,
  chapter,
  login,
  logout,
  register,
  tree,
  chapterArticles,
  doCollect,
  collectList,
}