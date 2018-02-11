// pages/teacher/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentid:0,
    courseid:0,
    selectedCourse:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      studentid: options.studentid,
      courseid: options.courseid
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
    var that = this;
    var studentid = that.data.studentid;
    var courseid = that.data.courseid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxteacher/wxmark1",
      data: { 'studentid': studentid,
        'courseid': courseid },
        method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          selectedCourse: res.data.selectedCourse
        });
      }
    })
  },
  formSubmit:function(e){
    var that = this;
    var studentid = e.detail.value.studentid;
    var name = e.detail.value.name;
    var mark = e.detail.value.mark;
    var courseid = that.data.courseid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxteacher/wxmark2",
      data: {
        'studentid': studentid, 'name': name, 'mark': mark,'courseid':courseid
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.mark == "true") {
          wx.showToast({
            title: '打分成功',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '打分失败',
            duration: 3000
          })
        }
      }
    })

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