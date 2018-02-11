//index.js
//获取应用实例

  var util = require('../../utils/util.js');
  var app = getApp();

  Page({
  data: {
    username:function(e) {
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
    password:function(e) {
      var that = this;
      that.setData({
        password: e.detail.value
      })
    },
    showTopTips: false,
    errorMsg: ""
  },
    onLoad: function () {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth
          })
        }
      });
    },

    formSubmit: function (e) {
      // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
      var that = this;
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      // 判断账号是否为空和判断该账号名是否被注册  
      wx.request({
        url: "http://120.79.73.27:8080/Examination_System/wxlogin",
        data:{'username':username,'password':password},
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.role == "admin"){
            wx.navigateTo({
              url: '/pages/admin/index/index?username='+res.data.username,
            })
          }else if(res.data.role == "teacher"){
            wx.navigateTo({
              url: '/pages/teacher/index/index?username=' + res.data.username,
            })
          } else if (res.data.role == "student"){
            wx.navigateTo({
              url: '/pages/student/index/index?username=' + res.data.username,
            })
          }
        }
      })
    }

})  



