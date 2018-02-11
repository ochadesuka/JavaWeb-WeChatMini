var app = getApp()
Page({
  data: {
    courseid:1,
    courselist: [
      { "courseid": "无", "coursename": "无", "teacherid": "无", "coursetime": "无", "classroom": "无", "courseweek": "无", "coursetype": "无" },
    ],
    teacherlist:[],
    collegeList:[]

  },
  onLoad:function(options){
    var that = this;
   
    that.setData({
      courseid:options.courseid
    })
  },
  onShow:function(){
    var that = this;
    var courseid = that.data.courseid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxeditCourse",
      data: { 'courseid': courseid },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          courselist: res.data.courselist,
          teacherlist: res.data.teacherlist,
          collegeList: res.data.collegeList
        });
      }
    })
  },
  formSubmit:function(e){
    var that = this;
    var courseid = e.detail.value.courseid;
    var coursename = e.detail.value.coursename;
    var teacherid = e.detail.value.teacherid;
    var coursetime = e.detail.value.coursetime;
    var classroom = e.detail.value.classroom;
    var courseweek = e.detail.value.courseweek;
    var coursetype = e.detail.value.coursetype;
    var collegeid = e.detail.value.collegeid;
    var score = e.detail.value.score;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxupdateCourse",
      data: { 'courseid': courseid, 'coursename': coursename, 'teacherid': teacherid,
        'coursetime': coursetime, 'classroom': classroom, 'courseweek': courseweek,
        'coursetype': coursetype, 'collegeid': collegeid, 'score': score},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.updatecourse == "true"){
          wx.showToast({
            title: '提交成功',
          })
        }
      }
    })
  }
})