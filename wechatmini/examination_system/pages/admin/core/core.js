var app = getApp()
Page({
  data: {
    navbar: ['课程管理', '教师管理', '学生管理','修改用户密码'],
    currentTab: 0,
    pagenum: 1,
    hasMoreData: true,
    isFromSearch: true,   // 用于判断courselist数组是不是空数组，默认true，空的数组
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    courselist:[
      { "courseid": "无", "coursename": "无", "teacherid": "无", "coursetime": "无", "classroom": "无", "courseweek": "无","coursetype":"无"}
    ],
    teacherlist:[]
  },
/*  navbarTap: function (e) {
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
  },*/
  
  onShow:function(){
    var that = this;
    var pagenum = that.data.pagenum;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxshowCourse",
      data: { 'page': pagenum},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.courselist != null){
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            courselist: res.data.courselist
          }) 
        }else{
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }     
      }
    });
    that.showCourse;
  },
  searchScrollLower: function () {
    var that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pagenum: that.data.pagenum + 1,  //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.showCourse();
      console.log(pagenum);
    }
  },
  addCourse:function(){
    wx.navigateTo({
      url: '../addcourse/add',
    })
  },
  showTeacher:function(){
    var that = this;
    var pagenum = that.data.pagenum;
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxshowTeacher",
   //   data: { 'page': pagenum },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.teacherlist != null) {
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            teacherlist: res.data.teacherlist
          })
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }
      }
    })
  }  
})  