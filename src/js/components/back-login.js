import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Layout, Form, Icon, Input, Button, Checkbox, Alert, notification } from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class BackLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultName: '',
      defaultPwd:'',
      forgetPassword: false,
      showForgetPwdInfo: false,
      forgetAlertType: '',
      forgetAlertMsg: '',
    };
  };
  componentWillMount(){
    if ( localStorage.userInfo ) { //勾选过记住账户
      if ( JSON.parse(localStorage.userInfo).userPassword ) {
        this.setState({
          defaultName: JSON.parse(localStorage.userInfo).userName,
          defaultPwd: JSON.parse(localStorage.userInfo).userPassword,
        });
      }
    } else {
      console.log('未勾选记住密码');
    }
  };
  // 登录成功跳转至后台
  loginBackend(userName,password=''){
    var userInfo = {
      isLogin: true,
      userId: 0,
      userName: userName,
      userType: '管理员',
      userAvatar: './src/images/admin-avatar.png',
      userPassword:password,
    };
    localStorage.userInfo = JSON.stringify(userInfo);
    const { from } = this.props.location.state || { from: { pathname: '/stage' } }
    this.props.history.push(from.pathname);
  };
  // 点击忘记密码
  forgetPassword(){
    this.setState({
      forgetPassword: !this.state.forgetPassword
    });
  };
  // 点击关闭忘记密码提示
  onCloseForgetPwdInfo(event){
    this.setState({ showForgetPwdInfo:false });
  };
  // 忘记密码表单
  handleForgetPwdSubmit(event){
    event.preventDefault();
    var _that = this;
    this.props.form.validateFields((err, values)=>{
      var userPhone = values.userPhone;
      var userName = values.account;
      setTimeout(()=>{
        // // 输入错误
        // _that.setState({
        //   showForgetPwdInfo:true,
        //   forgetAlertType: 'warning',
        //   forgetAlertMsg: '使用此手机用户不存在，不能使用取回密码功能'
        // });
        // 输入正确
        notification.open({
          message: '提示消息',
          description: '取回密码的方法已经通过Email发送到您的信箱中，请在3天内修改您的密码',
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
          duration: 3,
        });
        _that.forgetPassword();
      }, 300);
    });
  };
  // 提交登录表单
  handleLoginSubmit(event){
    event.preventDefault();
    var _that = this;
    this.props.form.validateFields((err, values)=>{
      var isRemember = values.remember;
      var userPassWord = values.passWord;
      var userName = values.userName;
      if(!err){
        var fetchOption = {
          method: "GET",
        };
        fetch("http://172.16.50.225/api?action=login&userName="+values.userName+"&passWord="+values.passWord,fetchOption)
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
            console.error(json.error);
          } else {
            // 账户名 账户id   coding
            if (isRemember) {
              _that.loginBackend(userName,userPassWord);
            } else {
              _that.loginBackend(userName);
            }
          }
        }).catch(function(error) {
          if (isRemember) {// 临时
            _that.loginBackend(userName,userPassWord);
          } else {
            _that.loginBackend(userName);
          }
          console.error('request failed', error);
        });
      } else {
        console.error(err);
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const styles = {
      content : {
        backgroundColor:"#ffffff",
        minHeight:460,
        maxHeight:460,
        minWidth:760,
        display:"flex",
        flexDirection:"row"
      },
      contentLeftdiv : {
        flex:1,
      },
      contentRightdiv : {
        flex:1,
      },
      leftDivImg : {
        width:240,
        height:240,
        marginTop:110,
        marginRight:20,
        float:"right"
      },
      rightDivContent :{
        marginLeft:20,
      }
    };
    const forgetPwdInfo = this.state.showForgetPwdInfo
    ?
      <Alert
        message={ this.state.forgetAlertType }
        type={ this.state.forgetAlertMsg }
        closable="true"
        onClose={ this.onCloseForgetPwdInfo.bind(this) }
        style={{ minWidth: 200, maxWidth: 300, marginTop: 140, marginBottom: -120 }}
      />
    :
      <div></div>
    const rightContent = this.state.forgetPassword
    ?
      <Form onSubmit={ this.handleForgetPwdSubmit.bind(this)} style={{ maxWidth: 300, marginTop: 140 }}>
        <FormItem>
          {getFieldDecorator('userPhone', {
            rules: [{ required: true, message: '请输入你的手机！' }],
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="Phone"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: false, message: '请输入你的账户！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username"/>
          )}
        </FormItem>
        <div>
          <Button type="dashed" onClick={()=>{this.forgetPassword()}} style={{ width: "40%" }}>
            返回
          </Button>
          <Button type="primary" htmlType="submit" style={{ width: "40%", float: 'right'}}>
            提交
          </Button>
        </div>

      </Form>
    :
      <Form onSubmit={ this.handleLoginSubmit.bind(this)} style={{ maxWidth: 300, marginTop: 140 }}>
        <FormItem>
          {getFieldDecorator('userName', {
            initialValue: [ this.state.defaultName ],
            rules: [{ required: true, message: '请输入你的账户！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passWord', {
            initialValue: [ this.state.defaultPwd ],
            rules: [{ required: true, message: '请输入你的密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#" onClick={ this.forgetPassword.bind(this) }>忘记密码</a>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登录
          </Button>
        </FormItem>
      </Form>;
    return(
      <Layout style={{ heigth: "100%", width: "100%" }}>
        <Header style={{ backgroundColor: "#ffffff" }}>
        </Header>
        <Content style={ styles.content }>
          <div style={ styles.contentLeftdiv }>
            <img src="./src/images/logo.png" style={ styles.leftDivImg }/>
          </div>
          <div style={{ border: "1px solid #cccccc", height: 220, marginTop: 120 }}></div>
          <div style={ styles.contentRightdiv }>
            <div style={ styles.rightDivContent }>
              { forgetPwdInfo }
              { rightContent }
            </div>
          </div>
        </Content>
        <Footer style={{ backgroundColor: "#ffffff", textAlign: 'center', color: '#cccccc' }}>
          React Backend ©2017 Created by Liangzelei
        </Footer>
      </Layout>
    )
  }
}

export default BackLogin = Form.create()(BackLogin);
