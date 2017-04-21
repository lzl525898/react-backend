import React, { Component } from 'react';
import { Row, Col, Menu, Dropdown, Button, Icon, message } from 'antd';

const defaultProps = {
  height: 50,
};

export default class BackHeader extends Component {
  constructor(props){
    super(props);
  };
  // 退出操作，设置本地数据
  handleLogout(){
    var userObj = JSON.parse(localStorage.userInfo);
    userObj.isLogin = false;
    localStorage.userInfo = JSON.stringify(userObj);
    // console.log(localStorage.userInfo);
  };

  // 点击下拉菜单回调
  handleMenuClick(e) {
    var _that = this;
    if ('quit'==e.key) {
      const fetchOptions = {
        method : 'GET'
      };
      fetch("http://172.16.50.225/api?action=login&userName=", fetchOptions)
      .then(response=>{
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          return {"error":error}
        }
      })
      .then(json=>{
        if (json.error) {
          console.log(json.error);
        } else { // 登出操作
          _that.handleLogout();
          _that.props.history.push('/login');
        }
      }).catch(function(error) {
        console.log('request failed', error);
        // 临时
        _that.handleLogout();
        _that.props.history.push('/login');
      });
    } else if ('change'==e.key) {
      message.info('change.');
    } else {
      message.info('Click on menu item.');
    }
  };

  render(){
    const menu = (
      <Menu onClick={ this.handleMenuClick.bind(this) }>
        <Menu.Item key="change">账户切换</Menu.Item>
        <Menu.Item key="quit">退出</Menu.Item>
      </Menu>
    );
    return(
      <div style={{ height: this.props.height }}>
        <Row>
          <Col span={12}></Col>
          <Col span={1}></Col>
          <Col span={7}></Col>
          <Col span={3}>
            <div style={{
              display: "flex", flexDirection: "row", justifyContent: "flex-end",
              height: this.props.height }}>
              <div style={{ height: "100%", display: "flex", alignItem: "center" }}>
                <img style={{
                  width: 30, height: 30, marginTop: 10, borderRadius: "50%"
                }} src={ this.props.userAvatar }/>
              </div>
              <div style={{ height: "100%", display: "flex", alignItem: "center" }}>
                <Dropdown overlay={menu}>
                  <a href="#" style={{
                    color: "#fff", fontSize: "16px", marginTop: -8, marginLeft: 8,
                    width: 80, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    { this.props.userNick } <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

BackHeader.propTypes = {
  height: React.PropTypes.number,
  userNick: React.PropTypes.string.isRequired,
  userAvatar: React.PropTypes.string.isRequired,
};

BackHeader.defaultProps = defaultProps;
