import React, { Component } from 'react';
import RichEditor from './rich-editor';
import {
  Collapse,
  Button,
  Row,
  Col,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Card,
  Upload
} from 'antd';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

export default class BackContentUser extends Component {
  render(){
    const contents = ( selectKey )=>{
      if ( "addUser"==selectKey ) { // 点击添加用户
        return <WrappedAddUserCard/>
      } else if ( "browse"==selectKey ) { // 点击浏览用户
        return <BrowseUserCard/>
      } else {
        return <div>Content</div>
      }
    };
    return(
      <div>
      { contents( this.props.currentSelectMenuItem ) }</div>
    )
  }
};

class BrowseUserCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      userTotalNumbers: 102,
    };
  };
  render(){
    return(
      <div>
        <div style={{ fontSize: "24px", color: "#000000", fontWeight: "bold" }}>{ this.state.userTotalNumbers }&nbsp;用户</div>

      </div>
    );
  }
};

class AddUserCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenWithaddUser: true,
      addUserActiveKey: ['1','2','3','4'],
      defaultAvatar: 'http://image.qiluyidian.mobi/43053508139910678747.jpg'
    };
  };
  // 提交添加用户回调
  handlSubmit(e){
    console.log(e);
  };
  // 点击折叠面饭回调
  callback(key) {
    this.setState({ addUserActiveKey : key });
  };
  // 检查用户名格式是否正确
  handleCheckAccount(rule, value, callback) {
        const { getFieldValue } = this.props.form
        if ( value.length >= 6) {
          if (value && value == getFieldValue('account')) {
            // callback('输入的值:'+value)
          }
        } else {
          // callback('请至少输入6位字符...')
        }
        // 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback();
 };
 // 检查用户密码格式是否正确
 handleCheckPassword(rule, value, callback) {
   const { getFieldValue } = this.props.form;
   callback();
 };
 // 上传文件回调函数
 handleUploadFile(e){
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
    const formItemLayoutWithCheckBox = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6, offset: 5 },
      },
    };
    const formItemLayoutWithRichText = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
                    账户&nbsp;
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
                    required: true, message : '必须的'
                  }, {
                    validator: this.handleCheckAccount.bind(this),
                  }, {
                    min: 6, message : '请至少输入6位字符'
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    身份认证方法&nbsp;
                    <Tooltip title="此设置确定用户登录时的验证方式">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
                hasFeedback
              >
                {getFieldDecorator('validator', {
                  rules: [{
                    required: true, message : '请选择你的账户登录验证方式'
                  }],
                })(
                  <Select defaultValue="人工注册">
                    <OptGroup label="已启用">
                      <Option value="人工注册">人工注册</Option>
                      <Option value="禁止登陆">禁止登陆</Option>
                    </OptGroup>
                    <OptGroup label="已禁用">
                      <Option value="CAS服务器（单点登录）">CAS服务器（单点登录）</Option>
                    </OptGroup>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    新密码&nbsp;
                    <Tooltip title="输入一个新密码">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
                hasFeedback
              >
                {getFieldDecorator('password', {
                  rules: [{
                    type: 'string', message: '输入一个新密码',
                  }, {
                    required: true, message : '密码不能为空'
                  }, {
                    validator: this.handleCheckPassword.bind(this),
                  }, {
                    min: 6, message : '请至少输入6位字符'
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayoutWithCheckBox}
              >
                {getFieldDecorator('forcepwd', {
                  valuePropName: 'checked',
                })(
                  <Checkbox style={{ margin: "-15px 0"}}>强制修改密码&nbsp;
                    <Tooltip title="如果此复选框被勾选，那么用户在下次登陆时被要求修改面">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </Checkbox>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    邮箱&nbsp;
                    <Tooltip title="用于账户找回密码时使用">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '输入无效电子邮件',
                  }, {required: false}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayoutWithRichText}
                label={(
                  <span>
                    自述&nbsp;
                    <Tooltip title="可以在此框中输入一些关于您自己的文字，它会在您的个人资料页中显示给其他人">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                <RichEditor/>
              </FormItem>
            </Panel>
            <Panel header={'用户头像'} key="2">
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    当前图片&nbsp;
                    <Tooltip title="用户默认照片">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                <img src={ this.state.defaultAvatar } style={{ width: 150,height: 150, marginTop: 10 }}/>
              </FormItem>
              <FormItem
                {...formItemLayoutWithRichText}
                label={(
                  <span>
                    新照片&nbsp;
                    <Tooltip title="添加新头像，图片会剪切为正方形，尺寸修改为100x100像素">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.handleUploadFile.bind(this),
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
                    <p className="ant-upload-hint">支持单个文件上传。严禁上传黄色信息</p>
                  </Upload.Dragger>
                )}
              </FormItem>
            </Panel>
            <Panel header={'附加名称'} key="3">
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    姓的拼音&nbsp;
                    <Tooltip title="用户姓的全拼">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('surname', {
                  rules: [{required: false}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    名的拼音&nbsp;
                    <Tooltip title="用户名的全拼">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('name', {
                  rules: [{required: false}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    别名&nbsp;
                    <Tooltip title="用户的别名">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('alias',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
            </Panel>
            <Panel header={'可选项'} key="4">
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    QQ&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              >
                {getFieldDecorator('qq',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    MSN&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              >
                {getFieldDecorator('msn',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    SKYPE&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              >
                {getFieldDecorator('skype',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    电话&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              >
                {getFieldDecorator('phone',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    手机&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              >
                {getFieldDecorator('mobile',{
                  rules: [{required: false}],
                })(
                  <Input/>
                )}
              </FormItem>
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
};

const WrappedAddUserCard = Form.create()(AddUserCard);

BackContentUser.propTypes = {
    currentSelectMenuItem : React.PropTypes.string.isRequired,
};
