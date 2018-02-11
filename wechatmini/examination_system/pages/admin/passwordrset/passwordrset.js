var app = getApp()
Page({
  data: {
    navbar: ['课程管理', '教师管理', '学生管理', '修改用户密码'],
    currentTab: 3,
    pagenum: 1,
    hasMoreData: true,
    isFromSearch: true,   // 用于判断courselist数组是不是空数组，默认true，空的数组
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    courselist: [
      { "courseid": "无", "coursename": "无", "teacherid": "无", "coursetime": "无", "classroom": "无", "courseweek": "无", "coursetype": "无" }
    ],
    teacherlist: []
  },
  navbarTap: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var currentTab = that.data.currentTab;
    console.log(currentTab);
    if (currentTab == 0) {
      wx.navigateTo({
        url: '../core/core',
      })
    } else if (currentTab == 1) {
      wx.navigateTo({
        url: '../teacheradmin/showteacher/showteacher',
      })
    } else if (currentTab == 2) {
      wx.navigateTo({
        url: '../studentadmin/showstudent/showstudent',
      })
    } else if (currentTab == 3) {
      wx.navigateTo({
        url: '../passwordrset/passwordrset',
      })
    }
  },

  formSubmit: function (e) {
    var that = this;
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var password2 = e.detail.value.password2;
    if(password != password2){
      wx.showToast({
        title: '两次输入的密码不一致',
      })
      return 
    }
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxuserPasswordRest",
      data: {
        'username': username, 'password': password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.userPasswordRest == "true") {
          wx.showToast({
            title: '修改成功',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '修改失败',
            duration: 3000
          })
        }
      }
    })
  }
})  