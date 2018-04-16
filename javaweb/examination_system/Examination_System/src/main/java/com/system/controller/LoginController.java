package com.system.controller;

import com.system.po.Userlogin;
import com.system.service.UserloginService;
import com.system.service.impl.UserloginServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Jacey on 2017/6/30.
 */
@Controller
public class LoginController {

    //登录跳转
    @RequestMapping(value = "/login", method = {RequestMethod.GET})
    public String loginUI() throws Exception {
        return "/login";
    }

    @RequestMapping(value="/logout",method = {RequestMethod.GET})
    public String logout() throws Exception{
        return "/login";
    }


    @RequestMapping(value = "/wxlogin", method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,String>  wxlogin(Userlogin userlogin, Model model) throws Exception{
//        UserloginServiceImpl userloginService = new UserloginServiceImpl();
//        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//        Userlogin userlogin = userloginService.findByName(username);
//        Map<String, String> map = new HashMap<>();
//        if(password.equals(userlogin.getPassword())){
//            map.put("username",username);
//        }else{
//           map.put("username",username);
//       }

//        return map;

        //Shiro实现登录
        Map<String,String> map = new HashMap<String, String>();
        UsernamePasswordToken token = new UsernamePasswordToken(userlogin.getUsername(),
                userlogin.getPassword());
        Subject subject = SecurityUtils.getSubject();

        //如果获取不到用户名就是登录失败，但登录失败的话，会直接抛出异常
        subject.login(token);

        if (subject.hasRole("admin")) {
            map.put("role","admin");
            map.put("username",userlogin.getUsername());
        } else if (subject.hasRole("teacher")) {
            map.put("role","teacher");
            map.put("username",userlogin.getUsername());
        } else if (subject.hasRole("student")) {
            map.put("role","student");
            map.put("username",userlogin.getUsername());
        }
        return map;

    }


    //登录表单处理
    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    public String login(Userlogin userlogin) throws Exception {

        //Shiro实现登录
        UsernamePasswordToken token = new UsernamePasswordToken(userlogin.getUsername(),
                userlogin.getPassword());
        Subject subject = SecurityUtils.getSubject();

        //如果获取不到用户名就是登录失败，但登录失败的话，会直接抛出异常
        subject.login(token);

        if (subject.hasRole("admin")) {
            return "redirect:/admin/showStudent";
        } else if (subject.hasRole("teacher")) {
            return "redirect:/teacher/showCourse";
        } else if (subject.hasRole("student")) {
            return "redirect:/student/showCourse";
        }

        return "/login";
    }

}
