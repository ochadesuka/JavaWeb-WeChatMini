package com.system.controller;

import com.system.exception.CustomException;
import com.system.po.*;
import com.system.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/wxadmin")
public class WxAdminController {
    @Resource(name = "studentServiceImpl")
    private StudentService studentService;

    @Resource(name = "teacherServiceImpl")
    private TeacherService teacherService;

    @Resource(name = "courseServiceImpl")
    private CourseService courseService;

    @Resource(name = "collegeServiceImpl")
    private CollegeService collegeService;

    @Resource(name = "userloginServiceImpl")
    private UserloginService userloginService;

    @RequestMapping(value="/wxshowCourse",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,List<CourseCustom>> wxshowCourse()throws Exception{
        List<CourseCustom> list = null;
        Map<String,List<CourseCustom>> map = new HashMap<String, List<CourseCustom>>();
     /*   PagingVO pagingVO = new PagingVO();
        //设置总页数
        pagingVO.setTotalCount(courseService.getCountCouse());
        if (page == null || page == 0) {
            pagingVO.setToPageNo(1);
            list = courseService.findByPaging(1);
        } else {
            pagingVO.setToPageNo(page);
            list = courseService.findByPaging(page);
        }*/
        list = courseService.findAll();
        map.put("courselist",list);
        return map;

    }

    @RequestMapping(value = "/wxeditCourse",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxeditcourse(Integer courseid,Model model) throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        if(courseid == null){
            throw new CustomException("课程id不存在");
        }
        CourseCustom courseCustom = courseService.findById(courseid);
        if (courseCustom == null) {
            throw new CustomException("未找到该课程");
        }
        List<TeacherCustom> list = teacherService.findAll();
        List<College> collegeList = collegeService.finAll();

        map.put("teacherlist",list);
        map.put("collegeList", collegeList);
        map.put("courselist", courseCustom);

        return map;

    }
    @RequestMapping(value = "/wxupdateCourse",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,String> wxupdateCourse(CourseCustom courseCustom)throws Exception{
        courseService.upadteById(courseCustom.getCourseid(), courseCustom);
        Map<String,String> map = new HashMap<String, String>();
        map.put("updatecourse","true");
        return map;
    }
    @RequestMapping(value = "/wxremoveCourse",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,String> wxremoveCourse(Integer courseid)throws Exception{
        Map<String,String> map = new HashMap<String, String>();
        if (courseid == null) {
            //加入没有带教师id就进来的话就返回教师显示页面
            map.put("removecourse","false");
        }else{
            courseService.removeById(courseid);
            map.put("removecourse","true");
        }
        return map;

    }
    @RequestMapping(value = "/wxaddCourse",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,String> wxaddcourse(CourseCustom courseCustom)throws Exception{
        Boolean result = courseService.save(courseCustom);
        Map<String,String> map = new HashMap<String, String>();
        if (!result) {
           map.put("addcourse","false");
        }else {
            map.put("addcourse","true");
        }
        return map;
    }
    @RequestMapping(value = "/wxshowTeacher",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxshowteacher()throws Exception{
        List<TeacherCustom> list = null;
        Map<String,Object> map = new HashMap<String, Object>();
        list = teacherService.findAll();
        map.put("teacherlist",list);
        return map;
    }
    @RequestMapping(value = "/wxaddTeacher",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxaddteacher(TeacherCustom teacherCustom)throws Exception{
        Boolean result = teacherService.save(teacherCustom);
        Map<String,Object> map = new HashMap<String,Object>();

        if (!result) {
            map.put("addteacher","false");
        }else {
            //添加成功后，也添加到登录表
            Userlogin userlogin = new Userlogin();
            userlogin.setUsername(teacherCustom.getUserid().toString());
            userlogin.setPassword("123");
            userlogin.setRole(1);
            userloginService.save(userlogin);
            map.put("addteacher","true");
        }

        return map;
    }
    @RequestMapping(value = "/wxeditTeacher",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxeditteacher(Integer userid)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        if (userid == null) {
            throw new CustomException("工号不能为空");
        }
        TeacherCustom teacherCustom = teacherService.findById(userid);
        if (teacherCustom == null) {
            throw new CustomException("未找到该名老师");
        }
       map.put("teacher", teacherCustom);
        return map;
    }
    @RequestMapping(value = "/wxupdateTeacher",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxupdateteacher(TeacherCustom teacherCustom)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        teacherService.updateById(teacherCustom.getUserid(), teacherCustom);
        map.put("updateteacher","true");
        return map;
    }
    @RequestMapping(value = "/wxremoveTeacher",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxremoveteacher(Integer userid)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        if (userid == null) {
            throw new CustomException("未找到该名老师");
        }
        teacherService.removeById(userid);
        userloginService.removeByName(userid.toString());
        map.put("removeteacher","true");
        return map;
    }
    @RequestMapping(value = "/wxshowStudent",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxshowstudent()throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        List<StudentCustom> list = null;
        list = studentService.findAll();
        map.put("studentlist",list);
        return map;

    }
    @RequestMapping(value = "/wxaddStudent",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxaddstudent(StudentCustom studentCustom)throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        Boolean result = studentService.save(studentCustom);

        if (!result) {
            map.put("addstudent","false");
        }else {
            //添加成功后，也添加到登录表
            Userlogin userlogin = new Userlogin();
            userlogin.setUsername(studentCustom.getUserid().toString());
            userlogin.setPassword("123");
            userlogin.setRole(2);
            userloginService.save(userlogin);
            map.put("addstudent","true");
        }
        return map;
    }
    @RequestMapping(value = "/wxremoveStudent",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,String> wxremovestudent(Integer userid)throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        if (userid == null) {
            //加入没有带学生id就进来的话就返回学生显示页面
            throw new CustomException("查询该学生失败");
        }
        studentService.removeById(userid);
        userloginService.removeByName(userid.toString());
        map.put("removestudent","true");
        return map;
    }
    @RequestMapping(value = "/wxeditStudent",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxeditstudent(Integer userid)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        if (userid == null) {
            throw new CustomException("学号不能为空");
        }
        StudentCustom studentCustom = studentService.findById(userid);
        if (studentCustom == null) {
            throw new CustomException("未找到该名老师");
        }
        map.put("student", studentCustom);
        return map;
    }
    @RequestMapping(value = "/wxupdateStudent",method ={RequestMethod.POST,RequestMethod.GET} )
    @ResponseBody
    public Map<String,Object> wxupdatestudent(StudentCustom studentCustom)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        studentService.updataById(studentCustom.getUserid(), studentCustom);
        map.put("updatestudent","true");
        return map;
    }
    @RequestMapping(value = "/wxuserPasswordRest", method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxuserPasswordRest(Userlogin userlogin) throws Exception {
        Map<String,Object> map = new HashMap<String, Object>();
        Userlogin u = userloginService.findByName(userlogin.getUsername());

        if (u != null) {
            if (u.getRole() == 0) {
                throw new CustomException("该账户为管理员账户，没法修改");
            }
            u.setPassword(userlogin.getPassword());
            userloginService.updateByName(userlogin.getUsername(), u);
        } else {
            throw new CustomException("没找到该用户");
        }
        map.put("userPasswordRest","true");
        return map;
    }
}
