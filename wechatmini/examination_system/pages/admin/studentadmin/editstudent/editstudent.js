var app = getApp()
var util = require('../../../../utils/util.js');
Page({
  data: {
    userid: 1,
    student: [],
  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      userid: options.userid
    })
  },
  onShow: function () {
    var that = this;
    var userid = that.data.userid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxeditStudent",
      data: { 'userid': userid },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        res.data.student.birthyear = util.toDate(res.data.student.birthyear);
        res.data.student.grade = util.toDate(res.data.student.grade);
        that.setData({
          student: res.data.student
        });
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var userid = e.detail.value.userid;
    var username = e.detail.value.username;
    var sex = e.detail.value.sex;
    var birthyear = e.detail.value.birthyear;
    var grade = e.detail.value.grade;
    var collegeid = e.detail.value.collegeid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxupdateStudent",
      data: {
        'userid': userid, 'username': username, 'sex': sex,
        'birthyear': birthyear,  'grade': grade, 'collegeid': collegeid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.updatestudent == "true") {
          wx.showToast({
            title: '提交成功',
          })
        }
      }
    })
  }
})