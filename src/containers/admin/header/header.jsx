import React, { Component } from "react";
import { connect } from "react-redux";
import screenfull from "screenfull";

import { deleteUserAction } from "../../../redux/actions/login";

import "./css/header.less";

import { Layout, Button, Modal } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
const { Header } = Layout;

class AdminHeader extends Component {
  state = {
    isFullScreen: false
  };

  fullScreen = () => {
    screenfull.toggle();
  };

  componentDidMount() {
    screenfull.onchange(() => {
      this.setState({
        isFullScreen: screenfull.isFullscreen
      });
    });
  }

  deleteUser = () => {
    const { confirm } = Modal;
    confirm({
      title: "确定退出？",
      icon: <QuestionCircleOutlined />,
      content: "若退出需要重新登录",
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        this.props.deleteUser();
      }
    });
  };

  render() {
    return (
      <Header className="admin-header">
        <div className="header-hd">
          <Button size="small" onClick={this.fullScreen}>
            {this.state.isFullScreen ? (
              <FullscreenExitOutlined />
            ) : (
              <FullscreenOutlined />
            )}
          </Button>
          <span className="welcome-user">欢迎，{this.props.username}</span>
          <Button size="small" type="link" onClick={this.deleteUser}>
            退出登录
          </Button>
        </div>
        <div className="header-bd">
          <div className="header-bd-left">
            <span>首页</span>
          </div>
          <div className="header-bd-right">
            <span className="timer">2020年4月1日 00:00:00</span>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585672068509&di=23279d7f814fbcc5cf0a4d170a9eb561&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F68%2F34%2F58ac3c7364e65_610.jpg"
              alt="天气"
            />
            <span className="weather">小雨转多云 温度：0~1℃</span>
          </div>
        </div>
      </Header>
    );
  }
}

export default connect(
  state => ({
    username: state.userInfo.user.username
  }),
  {
    deleteUser: deleteUserAction
  }
)(AdminHeader);
