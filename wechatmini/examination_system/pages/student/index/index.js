//index.js  
//获取应用实例  
var app = getApp()
var util = require('../../../utils/util.js');
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    clientHeight: 0,
    // tab切换  
    currentTab: 0,
    hasMoreData: true,
    isFromSearch: true,   // 用于判断courselist数组是不是空数组，默认true，空的数组
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    courselist: [],
    selectedCourseList: [],
    studentlist: [],
    username:0
  },
  onLoad: function (options) {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          clientHeight: res.windowHeight - 50,
          username:options.username
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 0) {

    } else if (e.target.dataset.current == 1) {

    }
  },
  showCourse: function () {
    var that = this;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxstudent/wxshowCourse",
      //     data: { 'page': pagenum },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.courseList != null) {
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            courselist: res.data.courseList
          })
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }
      }
    });
  },
  showSelectedCourse:function(){
    var that = this;
    var username = that.data.username;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxstudent/selectedCourse",
      data: { 'username': username },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.selectedCourseList);
        if (res.data.selectedCourseList != null) {
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            selectedCourseList: res.data.selectedCourseList
          })
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }
      }
    });
  },
  showOverCourse:function(){
    var that = this;
    var username = that.data.username;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxstudent/overCourse",
      data: { 'username': username },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.selectedCourseList);
        if (res.data.selectedCourseList != null) {
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            selectedCourseList: res.data.selectedCourseList
          })
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }
      }
    });
  },
  onShow: function () {
    var that = this;
    var isout = that.data.isOut;
    this.showCourse();
    this.showSelectedCourse();
  
  },
  formSubmit: function (e) {
    var that = this;
    var username = that.data.username;
    var oldpassword = e.detail.value.password;
    var password1 = e.detail.value.password1;
    var password2 = e.detail.value.password2;
    if (password1 != password2) {
      wx.showToast({
        title: '两次输入的密码不一致',
      })
      return
    }
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxpasswordRset",
      data: {
        'username': username, 'oldpassword': oldpassword, 'password': password1
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.password == "success") {
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
  },
  chooseCourse:function(e){
    var that = this;
    var username = that.data.username;
    var courseid = e.currentTarget.dataset.id;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxstudent/stuSelectedCourse",
      data:{
        'username':username,'courseid':courseid
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.stuSelectedCourse == "success"){
          that.showSelectedCourse();
          wx.showToast({
            title: '选课成功',
            duration: 3000
          })
        }else{
          wx.showToast({
            title: '该门课已经选了，不能再选',
            duration: 3000
          })
        }
      }
    })
  },
  outCourse:function(e){
    var that = this;
    var username = that.data.username;
    var courseid = e.currentTarget.dataset.id;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxstudent/outCourse",
      data: {
        'username': username, 'courseid': courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.sturemovecourse == "success") {
          that.showSelectedCourse();
          wx.showToast({
            title: '退课成功',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '退课失败',
            duration: 3000
          })
        }
      }
    })
  }
})  