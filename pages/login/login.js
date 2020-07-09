// pages/login/login.js
let util = require('../../utils/util.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    nameFocus: true,
    passwordFocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  inputName: function (event) {
    console.log(event.detail.value);
    this.data.name = event.detail.value
  },
  inputPassword: function (event) {
    console.log(event.detail.value);
    this.data.password = event.detail.value
  },
  nameBindFocus: function () {
    this.setData({
      nameFocus: true,
      passwordFocus: false
    })
  },
  passwordFocus: function () {
    this.setData({
      nameFocus: false,
      passwordFocus: true
    })
  },
  login: function () {
    if (this.data.name.length == 0) {
      util.toast('please input user name');
      return;
    }
    if (this.data.name.length < 3) {
      util.toast('user name length must more then 3 char')
      return;
    }
    if (this.data.password.length == 0) {
      util.toast('please input password');
      return;
    }
    if (this.data.password.length < 3) {
      util.toast('password length must more then 3 char')
      return;
    }
    let param = {
      username: this.data.name,
      password: this.data.password,
    }
    api.login(param).then(data => {
      util.toast('login success');
      let eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('loginSuccess', {
        data: this.data.name
      });
      wx.setStorage({
        data: this.data.name,
        key: 'name',
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 500)
    }).catch(res => {

    })
  },
  register: function () {
    util.toast('register')
  }
})