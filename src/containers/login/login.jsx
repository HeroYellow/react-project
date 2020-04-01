import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveUserInfoAction } from "../../redux/actions/login";
import { Redirect } from "react-router-dom";

import "./css/login.less";
import login from "./img/logo.png";

// 引入登录模块
import { ajaxLogin } from "../../ajax";

class Login extends Component {
  // 密码验证
  pwdValidator = (_, password = "") => {
    let errmsg = [];
    if (!password.trim()) errmsg.push("密码不能为空！");
    if (password.trim().length < 4) errmsg.push("密码的长度不能小于4位！");
    if (password.trim().length > 12) errmsg.push("密码的长度不能大于12位");
    if (!/^\w+$/.test(password))
      errmsg.push("密码必须由英文、数字或下划线组成");
    if (errmsg.length) return Promise.reject(errmsg);
    return Promise.resolve();
  };

  // 提交表单
  onFinish = async loginObj => {
    // 调用 ajaxLogin 并传入 输入框的值
    let result = await ajaxLogin(loginObj);
    const { status, data, msg } = result;
    if (status === 0) {
      message.success("登录成功！", 1);
      this.props.svaeUserInfo(data);
    } else {
      message.error(msg);
    }
  };

  render() {
    if (this.props.isLogin) return <Redirect to="/admin" />;
    return (
      <div className="login">
        <header className="login-header">
          <img src={login} alt="login" />
          <h3>商品管理系统</h3>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空！"
                },
                {
                  min: 4,
                  message: "用户名必须大于等于4位！"
                },
                {
                  max: 12,
                  message: "用户名必须小于等于12位！"
                },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须是英文、数字或下划线组成！"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator: this.pwdValidator
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.userInfo.isLogin
  }),
  {
    svaeUserInfo: saveUserInfoAction
  }
)(Login);
