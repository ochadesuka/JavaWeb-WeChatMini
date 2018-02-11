// pages/admin/teacheradmin/addteacher/addteacher.js
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
  formSubmit: function (e) {
    var that = this;
    var userid = e.detail.value.userid;
    var username = e.detail.value.username;
    var sex = e.detail.value.sex;
    var birthyear = e.detail.value.birthyear;
    var degree = e.detail.value.degree;
    var title = e.detail.value.title;
    var grade = e.detail.value.grade;
    var collegeid = e.detail.value.collegeid;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxaddTeacher",
      data: {
        'userid': userid, 'username': username, 'sex': sex,
        'birthyear': birthyear, 'degree': degree, 'title': title,
        'grade': grade, 'collegeid': collegeid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.addteacher == "true") {
          wx.showToast({
            title: '添加成功',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '添加失败',
            duration: 3000
          })
        }
      }
    })
  }
})