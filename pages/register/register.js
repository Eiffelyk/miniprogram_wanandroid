const util = require("../../utils/util")
const api = require("../../utils/api")

// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameFocus: true,
    passwordFocus: false,
    password2Focus: false,
    name: '',
    password: '',
    password2: '',
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
  onRegister: function () {
    if (this.data.name.length == 0) {
      util.toast('please input user name')
      return
    }
    if (this.data.name.length < 3) {
      util.toast('user name must more then 3 char')
      return
    }
    if (this.data.password.length == 0) {
      util.toast('please input password')
      return
    }
    if (this.data.password.length < 3) {
      util.toast('password must more then 3 char')
      return
    }
    if (this.data.password != this.data.password2) {
      util.toast('input twice passwords are defferent')
      return
    }
    let param = {
      username: this.data.name,
      password: this.data.password,
      repassword: this.data.password2,
    }
    api.register(param).then(data => {
        util.toast('register success')
        setTimeout(() => {
          wx.navigateBack({})
        }, 1000);
    }).catch(res => {

    })
  },
  inputName: function (event) {
    this.data.name = event.detail.value
  },
  inputPassword: function (event) {
    this.data.password = event.detail.value
  },
  inputPassword2: function (event) {
    this.data.password2 = event.detail.value
  },
  nameBindfocus: function () {
    console.log('nameBindfoucs');
    this.setData({
      nameFocus: true,
      passwordFocus: false,
      password2Focus: false,
    })
  },
  passwordBindfocus: function () {
    console.log('passwordBindfoucs');
    
    this.setData({
      nameFocus: false,
      passwordFocus: true,
      password2Focus: false,
    })
  },
  password2Bindfocus: function () {
    console.log('password2Bindfoucs');
    
    this.setData({
      nameFocus: false,
      passwordFocus: false,
      password2Focus: true,
    })
  },
})