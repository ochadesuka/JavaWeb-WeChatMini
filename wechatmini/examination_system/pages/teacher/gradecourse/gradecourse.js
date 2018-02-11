// pages/teacher/gradecourse/gradecourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseid:0,
    selectedcourselist:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      courseid:options.courseid
    })
  },
  showCourseStudent:function(){
    var that = this;
    var courseid = that.data.courseid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxteacher/wxgradeCourse",
      data:{
        'courseid': courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.selectedCourseList);
        if (res.data.selectedCourseList != null){
          that.setData({
            selectedcourselist: res.data.selectedCourseList
          })
        }else{
          wx.showToast({
            title: '未查询到有学生选择该课程',
          })
        }
      }
    })

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
    this.showCourseStudent();
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
  
  }
})