const wxRequest = require('../utils/wxRequest.js');
//获取公众号列表
let chapter = () => wxRequest.get('/wxarticle/chapters/json');

//登录
let login =(params) => wxRequest.post('/user/login',params);
//退出
let logout = () => wxRequest.get('/user/logout/json');
//注册
let register = (params) => wxRequest.post('/user/register',params);
//体系
let tree =()=>wxRequest.get('/tree/json');
module.exports = {
  chapter,
  login,
  logout,
  register,
  tree,
}