import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Layout, Form, Icon, Input, Button, Checkbox} from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class BackLogin extends Component {
  constructor(props){
    super(props);
  };
  // 登录成功跳转至后台
  loginBackend(password=''){
    var userInfo = {
      userId: 0,
      userName: 'admin',
      userType: '管理员',
      userAvatar: './src/images/admin-avatar.png',
      userPassword:password,
    };
    localStorage.userInfo = JSON.stringify(userInfo);
    console.log(JSON.stringify(userInfo));
    const { from } = this.props.location.state || { from: { pathname: '/stage' } }
    this.props.history.push(from.pathname);
  };
  // 提交登录表单
  handleSubmit(event){
    event.preventDefault();
    var _that = this;
    this.props.form.validateFields((err, values)=>{
      var isRemember = values.remember;
      var passWord = values.passWord;
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
            console.log(json.error);
          } else {
            // 账户名 账户id   coding
            if (isRemember) {
              _that.loginBackend(passWord);
            } else {
              _that.loginBackend();
            }
          }
        }).catch(function(error) {
          if (isRemember) {   // 临时
            _that.loginBackend(passWord);
          } else {
            _that.loginBackend();
          }
          console.log('request failed', error);
        });
      } else {
        console.log(err);
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
              <Form onSubmit={ this.handleSubmit.bind(this)} style={{ maxWidth: 300, marginTop: 140 }}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入你的账户！' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('passWord', {
                    rules: [{ required: true, message: '请输入你的密码！' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
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
                  <a href="">忘记密码</a>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    登录
                  </Button>
                </FormItem>
              </Form>
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
