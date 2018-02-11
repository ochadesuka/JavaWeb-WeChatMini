// pages/admin/addcourse/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxaddCourse",
      data: {
        'courseid': courseid, 'coursename': coursename, 'teacherid': teacherid,
        'coursetime': coursetime, 'classroom': classroom, 'courseweek': courseweek,
        'coursetype': coursetype, 'collegeid': collegeid, 'score': score
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.addcourse == "true") {
          wx.showToast({
            title: '添加成功',
            duration:3000
          })
          }else{
          wx.showToast({
            title: '添加失败',
            duration: 3000
          })
          }
        }
    })
  }
})