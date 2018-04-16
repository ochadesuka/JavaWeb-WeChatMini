package com.system.controller;

import com.system.exception.CustomException;
import com.system.po.Userlogin;
import com.system.service.UserloginService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Jacey on 2017/7/6.
 */
@Controller
public class RestPasswordController {

    @Resource(name = "userloginServiceImpl")
    private UserloginService userloginService;

    // 本账户密码重置
    @RequestMapping(value = "/passwordRest", method = {RequestMethod.POST})
    public String passwordRest(String oldPassword, String password1) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();

        Userlogin userlogin = userloginService.findByName(username);

        if (!oldPassword.equals(userlogin.getPassword())) {
            throw new CustomException("旧密码不正确");
        } else {
            userlogin.setPassword(password1);
            userloginService.updateByName(username, userlogin);
        }

        return "redirect:/logout";
    }
    @RequestMapping(value = "/wxpasswordRset",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Map<String,Object> wxpasswordrset(String username,String oldpassword,String password) throws Exception{
        Map<String,Object> map = new HashMap<String, Object>();
        Userlogin userlogin = userloginService.findByName(username);

        if (!oldpassword.equals(userlogin.getPassword())) {
            map.put("password","oldexception");
        } else {
            userlogin.setPassword(password);
            userloginService.updateByName(username, userlogin);
            map.put("password","success");
        }
        return map;
    }

}
