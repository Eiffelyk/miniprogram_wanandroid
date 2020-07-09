const wxRequest = require('../utils/wxRequest.js');
//获取公众号列表
let chapter = () => wxRequest.get('/wxarticle/chapters/json');

//登录
let login =(params) => wxRequest.post('/user/login',params);
module.exports = {
  chapter,
  login,
}