import React, { Component } from 'react';
import { Row, Col, Menu, Dropdown, Button, Icon, message } from 'antd';

const defaultProps = {
  height: 50,
};

export default class BackHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentDate : '',
      unreadMail: true,
      mailColor: '',
      mailSzie: 0
    };
  };
  componentWillMount(){
    this.getCurrentDate();
    this.setState({
      mailColor: this.state.unreadMail ? "#FF8888" : "#000000",
      mailSzie: parseInt(this.props.height/3*1.5)
    });
  };
  // 获取当前时间
  getCurrentDate(){
    var date = new Date();
    var week;
    switch (date.getDay())
    {
      case 1: week="星期一"; break;
      case 2: week="星期二"; break;
      case 3: week="星期三"; break;
      case 4: week="星期四"; break;
      case 5: week="星期五"; break;
      case 6: week="星期六"; break;
      default: week="星期天";
    }
    var ndate = date.getFullYear() +"年"
              + this.add_zero(date.getMonth()+1) +"月"
              + this.add_zero(date.getDate()) +"日 "
    this.setState({
      currentDate: ( ndate + week )
    });
  };
  add_zero( temp )
  {
    if(temp<10) return "0"+temp;
    else return temp;
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
    } else if ('user'==e.key) {
      message.info('user.');
    } else {
      message.info('Click on menu item.');
    }
  };

  render(){
    const menu = (
      <Menu onClick={ this.handleMenuClick.bind(this) }>
        <Menu.Item key="user"><Icon type="user" style={{ marginRight: 5 }}/>账户</Menu.Item>
        <Menu.Item key="quit"><Icon type="poweroff" style={{ marginRight: 5 }}/>退出</Menu.Item>
      </Menu>
    );
    return(
      <div style={{ height: this.props.height }}>
        <Row>
          <Col span={9}></Col>
          <Col span={7}>
            <div style={{ fontSize: "16px", color: "#ffffff", lineHeight: `${this.props.height}px`, width: 230 }}>
              今天是 : { this.state.currentDate }
            </div>
          </Col>
          <Col span={4}></Col>
          <Col span={3}>
            <div style={{
              display: "flex", flexDirection: "row", justifyContent: "flex-end",
              height: this.props.height }}>
              <Icon type="mail" style={{
                fontSize: `${ this.state.mailSzie }px`,
                lineHeight: `${ this.props.height }px`,
                color: `${ this.state.mailColor }`,
                marginRight: 10
              }}/>
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
