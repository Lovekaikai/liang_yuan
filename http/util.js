 
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 网络请求
const request = function(url, method, data, msg, succ, fail, com) {
  // 小程序顶部显示Loading
  wx.showNavigationBarLoading();
  if (msg != "") {
    wx.showLoading({
      title: msg
    })
  }
  wx.request({
    url: 'http://39.101.192.128/'+url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: res => {
      if (succ) succ(res);
    },
    fail: err => {
      wx.showToast({
        title: '网络错误，请稍后再试···',
        icon:'none'
      })
      if (fail) fail(err);
    },
    complete: com => {
      wx.hideNavigationBarLoading();
      if (msg != "") {
        wx.hideLoading();
      }
      console.log(url + ' 返回的data:', com.data);
    }
  })
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 
module.exports = {
  formatTime: formatTime,
  request: request
}
 