var app = getApp()
Page({
  data: {
    userid: 0,
    isremove: false
  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      userid: options.userid
    })

    var userid = that.data.userid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxremoveStudent",
      data: { 'userid': userid },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.removestudent == "true") {
          that.setData({
            isremove: true
          })
          wx.showToast({
            title: '删除成功',
            duration: 3000
          });
          //   wx.navigateTo({
          //     url: '../core/core',
          //   });
        } else {
          wx.showToast({
            title: '删除失败',
            duration: 3000
          });
          that.setData({
            isremove: false
          })
        }
      }
    })
  }
})