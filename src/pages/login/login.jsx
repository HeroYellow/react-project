import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./css/login.less";
import login from "./img/logo.png";

export default class Login extends Component {
  onFinish = values => {
    console.log("Received values of form: ", values);
  };
  render() {
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
                  message: "用户名不能为空!"
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
                  required: true,
                  message: "密码不能为空!"
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
