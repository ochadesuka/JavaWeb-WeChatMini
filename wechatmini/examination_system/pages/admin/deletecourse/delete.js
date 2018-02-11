var app = getApp()
Page({
  data:{
    courseid:0,
    isremove:false
  },
  onLoad:function(options){
    var that = this;

    that.setData({
      courseid: options.courseid
    })
    
    var courseid = that.data.courseid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxremoveCourse",
      data:{'courseid':courseid},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.removecourse == "true"){
          that.setData({
            isremove: true
          })
          wx.showToast({
            title: '删除成功',
            duration:3000
          });
       //   wx.navigateTo({
       //     url: '../core/core',
       //   });
        }else{
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