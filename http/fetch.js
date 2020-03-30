const util = require('../utils/util.js');
 
export default class  Common() {
  let that = this;
  // session定时器
  static sessionIsExpire = (resolve) => {
    const session = wx.getStorageSync('session');
    const deadLine = wx.getStorageSync('deadline');
    const nowDate = new Date().getTime();
    if (session && deadLine) {
      if (nowDate - deadLine >= 1000 * 60 * 60 * 24) {
        that.login(resolve)
      } else {
        wx.checkSession({
          success() {
            // session_key 未过期，并且在本生命周期一直有效
            resolve(session)
          },
          fail() {
            // session_key 已经失效，需要重新执行登录流程
            that.login(resolve)
          }
        })
      }
    } else {
      that.login(resolve)
    }
  }
  // wx.login
  that.login = (resolve) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          that.loginRequest(res.code, resolve);
        }
      },
    })
  }
  // 请求login.do接口得到session
  that.loginRequest = (code, resolve) => {
    var url = '/program/login';
    var data = {
      code,
      minipId: 'worder'
    };
    util.request(url, 'post', data,'', (res) => {
      console.log('登录了')
      if (res.data.success == true) {
        const session = res.data.module.session;
        resolve(session)
        wx.setStorageSync('session', session);
        wx.setStorageSync('deadline', new Date().getTime())
      } else {
        resolve(1)
      }
    }, (fail) => {
      resolve(1)
    })
  }
  // 获取session
  that.pro_getSession = new Promise((resolve) => {
    Common.sessionIsExpire(resolve)
  })
  // 成功的提示
  that.showToast_scss = (e) => {
    wx.showToast({
      title: e
    })
  }
  // 失败的提示
  that.showToast_fail = (e) => {
    wx.showToast({
      title: e,
      icon: 'none'
    })
  }
  // 跳转小程序
  that.to_rel = (appId,path,extraData='') => {
    console.log('跳转小程序')
    wx.navigateToMiniProgram({
      appId,
      path,
      extraData,
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  }
  //获取formid
  that.formSubmit = function(e) {
    var date = Date.parse(new Date());
    var if_date = wx.getStorageSync('formId_time')
    if ((date - if_date) > 1000 * 3) {
      wx.setStorageSync('formId_time', date);
      if (e && e.detail && e.detail.formId) {
        let data = {
          session: wx.getStorageSync("session"),
          formId: e.detail.formId,
          btnName: 'btn'
        };
        util.request('/v1/customermanager/saveFormid.do', 'post', data, '', (res) => {
          wx.setStorageSync('formId_time', new Date())
        });
      }
    }
  }
}


 