package com.system.controller;

import com.system.po.CourseCustom;
import com.system.po.SelectedCourseCustom;
import com.system.po.Userlogin;
import com.system.service.CourseService;
import com.system.service.SelectedCourseService;
import com.system.service.TeacherService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/wxteacher")
public class WxTeacherController {
    @Resource(name = "teacherServiceImpl")
    private TeacherService teacherService;

    @Resource(name = "courseServiceImpl")
    private CourseService courseService;

    @Resource(name = "selectedCourseServiceImpl")
    private SelectedCourseService selectedCourseService;

    @RequestMapping(value="/wxshowCourse",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxshowcourse(String username)throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
     //   Subject subject = SecurityUtils.getSubject();
     //   String username = (String) subject.getPrincipal();

        List<CourseCustom> list = courseService.findByTeacherID(Integer.parseInt(username));
        map.put("courseList", list);
        return map;
    }
    @RequestMapping(value="/wxgradeCourse",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxgradecourse(Integer courseid)throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        if (courseid == null) {
            map.put("teachergrade","false");
        }
        List<SelectedCourseCustom> list = selectedCourseService.findByCourseID(courseid);
        map.put("selectedCourseList", list);
        return map;
    }
    @RequestMapping(value="/wxmark1",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxmark1(SelectedCourseCustom scc)throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        SelectedCourseCustom selectedCourseCustom = selectedCourseService.findOne(scc);

        map.put("selectedCourse", selectedCourseCustom);

        return map;
    }
    @RequestMapping(value="/wxmark2",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxmark2(SelectedCourseCustom scc)throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        selectedCourseService.updataOne(scc);
        map.put("mark","true");
        return map;
    }

}
