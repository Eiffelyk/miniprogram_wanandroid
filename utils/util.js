const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toast = (title, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon
  })
}

const getViewSize = selector => {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    query.selectAll(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      resolve(res[0])
    });
  })
}
const getViewSizeWidth = selector => {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    query.selectAll(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      resolve(res[0].width)
    });
  })
}
module.exports = {
  formatTime: formatTime,
  toast: toast,
  getViewSize: getViewSize,
  getViewSizeWidth: getViewSizeWidth
}