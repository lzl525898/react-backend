import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Layout, Form, Icon, Input, Button, Checkbox} from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class BackLogin extends Component {
  constructor(props){
    super(props);
  };
  // 提交登录表单
  handleSubmit(event){
    event.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if(!err){
        var fetchOption = {
          mode: 'cors',
          method: "GET",
          credentials: 'include'
        };
        // fetch("http://172.16.50.225/api?action=login&userName="+values.userName+"&passWord="+values.passWord,fetchOption)
        // .then(response=>{
        //   if (response.status >= 200 && response.status < 300) {
        //     return response.json();
        //   } else {
        //     var error = new Error(response.statusText);
        //     error.response = response
        //     return {"error":error}
        //   }
        // })
        // .then(json=>{
        //   if (json.error) {
        //     console.log(json.error);
        //   }
        // });
        setTimeout(()=>{
          localStorage.userId = 0;
          localStorage.userName = 'admin';
          Router.push("/stage");
        },1000);
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
        <Footer style={{ backgroundColor: "#ffffff" }}>
        </Footer>
      </Layout>
    )
  }
}

export default BackLogin = Form.create()(BackLogin);
