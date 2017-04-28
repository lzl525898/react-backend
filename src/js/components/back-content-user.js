import React, { Component } from 'react';
import { Collapse, Button, Row, Col, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox } from 'antd';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

export default class BackContentUser extends Component {
  render(){
    const contents = ( selectKey )=>{
      if ( "addUser"==selectKey ) { // 点击添加用户
        return <WrappedAddUserCard/>
      } else {
        return <div>Content</div>
      }
    };
    return(
      <div>
      { contents( this.props.currentSelectMenuItem ) }</div>
    )
  }
}

class AddUserCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenWithaddUser: true,
      addUserActiveKey: ['1','2','3','4']
    };
  };
  // 提交添加用户回调
  handlSubmit(e){
    console.log(e);
  };
  callback(key) {
    console.log(key);
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    };
    return(
      <div>
        <Row style={{ marginBottom: 5 }}>
          <Col span={21}></Col>
          <Col span={3}>
            <div style={{ float: "right"}}><a href="#" style={{ textDecoration: "none" }}
              onClick={()=>{
                this.setState({
                  isOpenWithaddUser:!this.state.isOpenWithaddUser
                });
                this.setState({
                  addUserActiveKey: !this.state.isOpenWithaddUser ? ['1','2','3','4'] : []
                });
              }}>
              <Icon type={ this.state.isOpenWithaddUser ? 'caret-down' : 'caret-right' } />
              { this.state.isOpenWithaddUser ? '  全部折叠' : '  展开全部' }
              </a>
            </div>
          </Col>
        </Row>
        <Form onSubmit={ this.handlSubmit.bind(this) }>
          <Collapse activeKey={ this.state.addUserActiveKey } onChange={ this.callback.bind(this) }>
            <Panel header={'常规项'} key="1">
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  用户名&nbsp;
                  <Tooltip title="你想用什么账号进行登录？">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
              hasFeedback
            >
              {getFieldDecorator('account', {
                rules: [{
                  type: 'string', message: '请输入您的账户！',
                }, {
                  required: true, message: '必需的',
                }],
              })(
                <Input />
              )}
            </FormItem>
            </Panel>
            <Panel header={'用户头像'} key="2">
              <p>"Text Text Text Text Text Text Text Text Text Text Text"</p>
            </Panel>
            <Panel header={'附加名称'} key="3">
              <p>"Text Text Text Text Text Text Text Text Text Text Text"</p>
            </Panel>
            <Panel header={'可选项'} key="4">
              <p>"Text Text Text Text Text Text Text Text Text Text Text"</p>
            </Panel>
          </Collapse>
          <div style={{
            display: "flex", justifyContent: "center", alignItem: "center", height: 50 }}>
            <Button type="primary" htmlType="submit" style={{ height: 30, marginTop: 20 }}>创建用户</Button>
          </div>
        </Form>
     </div>
    )
  }
}

const WrappedAddUserCard = Form.create()(AddUserCard);

BackContentUser.propTypes = {
    currentSelectMenuItem : React.PropTypes.string.isRequired,
};
