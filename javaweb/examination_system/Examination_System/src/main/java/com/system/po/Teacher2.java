package com.system.po;

import java.util.Date;

public class Teacher2 {
    private Integer userid;

    private String username;

    private String sex;

    private String birthyear;

    private String degree;

    private String title;

    private String grade;

    private Integer collegeid;

    private String collegeName;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthyear() {
        return birthyear;
    }

    public void setBirthyear(String birthyear) {
        this.birthyear = birthyear;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getCollegeid() {
        return collegeid;
    }

    public void setCollegeid(Integer collegeid) {
        this.collegeid = collegeid;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public Teacher2(Integer userid, String username, String sex, String birthyear, String degree, String title, String grade, Integer collegeid, String collegeName) {
        this.userid = userid;
        this.username = username;
        this.sex = sex;
        this.birthyear = birthyear;
        this.degree = degree;
        this.title = title;
        this.grade = grade;
        this.collegeid = collegeid;
        this.collegeName = collegeName;
    }
}
