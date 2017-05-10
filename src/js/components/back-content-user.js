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

import UserFilter from './back-user-filter';
import UserNewFilter from './back-user-newfilter';
import UserTable from './back-user-table';
import BatchHandleCard from './back-user-batch';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

var filterItems = {};

export default class BackContentUser extends Component {
  constructor(props){
    super(props);
  };
  // 改变当前点选的菜单项
  changeCurrentSelectMenuItem(selectKey){
    this.props.setPropsValue(selectKey);
  };
  // 重新绘制菜单至增加用户
  repaintMenuWithAddUser(status){
    this.props.repaintMenu(status);
  };
  // 设置过滤项对象
  setFilterItem(filterItem=null){
    filterItems = filterItem;
  };
  getFilterItem(){
    return filterItems;
  };
  // 设置过滤项默认值
  setDefaultFilterItems(filterItem){
    filterItem = {
      xing:{
        title: '姓',
        select: '包含',
        checked: false,
        content: ''
      },
      ming:{
        title: '名',
        select: '包含',
        checked: false,
        content: ''
      },
      username:{
        title: '用户名',
        select: '包含',
        checked: false,
        content: ''
      },
      allname:{
        title: '用户全名',
        select: '包含',
        checked: false,
        content: ''
      }
    }
    filterItems = filterItem;
    return filterItems;
  };
  // 设置过滤项的信息
  setFilterItemValue(filterItem, node=null, type=null , value=null){ // 1过滤源 2指定对象 3指定节点 4修改值
    // console.log("node="+node+", type="+type+" , value="+value);
    if ( 'xing'==node ) {
      if ( 'content'==type ) {
        filterItem.xing.content = value;
      } else if ( 'select'==type ) {
        filterItem.xing.select = value;
      } else if ( 'checked'==type ) {
        filterItem.xing.checked = value;
      }
    } else if ( 'ming'==node ) {
      if ( 'content'==type ) {
        filterItem.ming.content = value;
      } else if ( 'select'==type ) {
        filterItem.ming.select = value;
      } else if ( 'checked'==type ) {
        filterItem.ming.checked = value;
      }
    } else if ( 'username'==node ) {
      if ( 'content'==type ) {
        filterItem.username.content = value;
      } else if ( 'select'==type ) {
        filterItem.username.select = value;
      } else if ( 'checked'==type ) {
        filterItem.username.checked = value;
      }
    } else if ( 'allname'==node ) {
      if ( 'content'==type ) {
        filterItem.allname.content = value;
      } else if ( 'select'==type ) {
        filterItem.allname.select = value;
      } else if ( 'checked'==type ) {
        filterItem.allname.checked = value;
      }
    };
    filterItems = filterItem;
    return filterItems;
  };
  // 删除已经checkbox的过滤器
  deleteCheckBoxFilter(filterItem){
    var updateValueArray = new Array();
    if ( filterItem.xing.checked ) {
      filterItem.xing.content = '';
      filterItem.xing.checked = false;
      updateValueArray.push('xing');
    };
    if ( filterItem.ming.checked ) {
      filterItem.ming.content = '';
      filterItem.ming.checked = false;
      updateValueArray.push('ming');
    };
    if ( filterItem.allname.checked ) {
      filterItem.allname.content = '';
      filterItem.allname.checked = false;
      updateValueArray.push('allname');
    };
    if ( filterItem.username.checked ) {
      filterItem.username.content = '';
      filterItem.username.checked = false;
      updateValueArray.push('username');
    };
    filterItems = filterItem;
    return updateValueArray;
  };
  render(){
    const contents = ( selectKey )=>{
      if ( "addUser"==selectKey ) { // 点击添加用户
        return <WrappedAddUserCard/>
      } else if ( "browse"==selectKey ) { // 点击浏览用户
        return <BrowseUserCard
                  repaintMenu={ this.repaintMenuWithAddUser.bind(this) }
                  handleAddUser={ this.changeCurrentSelectMenuItem.bind(this) }
               />
      } else if ( "batch"==selectKey ) { // 点击批量处理
        return <BatchHandleCard
                  filterItem = {filterItems}
                  getFilterItem = {this.getFilterItem}
                  setFilterItem = {this.setFilterItem}
                  setFilterItemValue = {this.setFilterItemValue.bind(filterItems)}
                  deleteCheckBoxFilter = {this.deleteCheckBoxFilter.bind(this)}
                  setDefaultFilterItems = {this.setDefaultFilterItems.bind(filterItems)}
               />
      } else {
        return <div>Content</div>
      }
    };
    return(
      <div>
        { contents( this.props.currentSelectMenuItem ) }
      </div>
    )
  }
};

class BrowseUserCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      userTotalNumbers: 102,
      isOpenFilter: false,
      hasAddFilter: false, // 是否添加过滤器标题
      isShowAddFilters: false, //是否显示添加的过滤器
      isShowUserTables: true // 是否显示用户table
    };
    this.setDefaultFilterItems(filterItems);

  };
  // 点击添加用户按钮回调
  onClickAddUserBtn(selectKey){
    this.props.handleAddUser(selectKey);
    this.props.repaintMenu(true);
  };
  // 改变是否显示 用户列表
  updateUserTablesShow(){
    this.setState({ isShowUserTables:false});
    var _that = this;
    setTimeout(()=>{
      _that.setState({ isShowUserTables:true});
    },100);
  };
  // 判断是否可以添加过滤器
  checkAddNewFilters(){
    if ( filterItems.xing.content.length>0
       ||filterItems.ming.content.length>0
       ||filterItems.username.content.length>0
       ||filterItems.allname.content.length>0 ) {
      return true;
    } else {
      return false;
    }
  };
  // 改变是否显示 活动过滤器
  changeAddFilterShowStatus(){
    if ( this.state.hasAddFilter ) {//用于重复刷新
      this.setState({
        hasAddFilter : false,
        isShowAddFilters : false
      });
    }
    var _that = this;
    setTimeout(()=>{
      _that.setState({
        hasAddFilter : true,
        isShowAddFilters : true
      });
    },100);
  };
  // 隐藏有关 新活动过滤器 的状态
  hideAddFilterShow(){
    this.setState({
      hasAddFilter : false,
      isShowAddFilters : false
    });
  };
  // 删除已经checkbox的过滤器
  deleteCheckBoxFilter(filterItem){
    var updateValueArray = new Array();
    if ( filterItem.xing.checked ) {
      filterItem.xing.content = '';
      filterItem.xing.checked = false;
      updateValueArray.push('xing');
    };
    if ( filterItem.ming.checked ) {
      filterItem.ming.content = '';
      filterItem.ming.checked = false;
      updateValueArray.push('ming');
    };
    if ( filterItem.allname.checked ) {
      filterItem.allname.content = '';
      filterItem.allname.checked = false;
      updateValueArray.push('allname');
    };
    if ( filterItem.username.checked ) {
      filterItem.username.content = '';
      filterItem.username.checked = false;
      updateValueArray.push('username');
    };
    filterItems = filterItem;
    return updateValueArray;
  };
  // 获取过滤项对象
  getFilterItem(){
    return filterItems;
  };
  // 设置过滤项的信息
  setFilterItem(filterItem, node=null, type=null , value=null){ // 1过滤源 2指定对象 3指定节点 4修改值
    // console.log("node="+node+", type="+type+" , value="+value);
    if ( 'xing'==node ) {
      if ( 'content'==type ) {
        filterItem.xing.content = value;
      } else if ( 'select'==type ) {
        filterItem.xing.select = value;
      } else if ( 'checked'==type ) {
        filterItem.xing.checked = value;
      }
    } else if ( 'ming'==node ) {
      if ( 'content'==type ) {
        filterItem.ming.content = value;
      } else if ( 'select'==type ) {
        filterItem.ming.select = value;
      } else if ( 'checked'==type ) {
        filterItem.ming.checked = value;
      }
    } else if ( 'username'==node ) {
      if ( 'content'==type ) {
        filterItem.username.content = value;
      } else if ( 'select'==type ) {
        filterItem.username.select = value;
      } else if ( 'checked'==type ) {
        filterItem.username.checked = value;
      }
    } else if ( 'allname'==node ) {
      if ( 'content'==type ) {
        filterItem.allname.content = value;
      } else if ( 'select'==type ) {
        filterItem.allname.select = value;
      } else if ( 'checked'==type ) {
        filterItem.allname.checked = value;
      }
    };
    filterItems = filterItem;
    return filterItems;
  };
  // 设置过滤项的信息
  setFilterCheck(filteritem, node=null){ // 1过滤源 2指定对象 3指定节点 4修改值
    if ( 'xing'==node ) {
      filteritem.xing.checked = !filteritem.xing.checked;
    } else if ( 'ming'==node ) {
      filteritem.ming.checked = !filteritem.ming.checked;
    } else if ( 'username'==node ) {
      filteritem.username.checked = !filteritem.username.checked;
    } else if ( 'allname'==node ) {
      filteritem.allname.checked = !filteritem.allname.checked;
    };
    filterItems = filteritem;
    return filterItems;
  };
  // 设置操作完后过滤项的值
  setNewFilterItems(filterItem){
    var filterItems = filterItem;
    filterItems.xing.checked = false;
    filterItems.ming.checked = false;
    filterItems.username.checked = false;
    filterItems.allname.checked = false;
    return filterItems;
  };
  // 设置过滤项默认值
  setDefaultFilterItems(filterItem){
    filterItem = {
      xing:{
        title: '姓',
        select: '包含',
        checked: false,
        content: ''
      },
      ming:{
        title: '名',
        select: '包含',
        checked: false,
        content: ''
      },
      username:{
        title: '用户名',
        select: '包含',
        checked: false,
        content: ''
      },
      allname:{
        title: '用户全名',
        select: '包含',
        checked: false,
        content: ''
      }
    }
    filterItems = filterItem;
    return filterItems;
  };
  render(){
    const userFilterContent = this.state.isOpenFilter
    ?
      <UserFilter
        getFilterItem={this.getFilterItem}
        setFilterItemValue={this.setFilterItem.bind(filterItems)}
        checkAddNewFilters={this.checkAddNewFilters}
        updateUserTablesShow={this.updateUserTablesShow.bind(this)}
        setDefaultFilterItems={this.setDefaultFilterItems.bind(filterItems)}
        changeAddFilterShowStatus={this.changeAddFilterShowStatus.bind(this)}/>
    :
      <div></div>;
    const userAddFilteTitle = this.state.hasAddFilter
    ?
      <div>
        <div style={{ lineHeight: "18px", marginTop: "5px"}}>
          <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}
            onClick={()=>{
              this.setState({
                isShowAddFilters:!this.state.isShowAddFilters
              });
            }}>
            <Icon type={ this.state.isShowAddFilters ? 'caret-down' : 'caret-right' } style={{ fontSize: "6px"}}/>
            &nbsp;&nbsp;活动过滤器
          </a>
        </div>
      </div>
    :
      <div></div>;
    const userAddFilterChecks = this.state.isShowAddFilters
    ?
      <UserNewFilter
        getFilterItem={this.getFilterItem}
        setFilterItemValue={this.setFilterItem.bind(filterItems)}
        deleteCheckBoxFilter={this.deleteCheckBoxFilter.bind(filterItems)}
        setDefaultFilterItem={this.setDefaultFilterItems.bind(filterItems)}
        hideAddFilterShow={this.hideAddFilterShow.bind(this)}
        updateUserTablesShow={this.updateUserTablesShow.bind(this)}
        changeAddFilterShowStatus={this.changeAddFilterShowStatus.bind(this)}
      />
    :
      <div></div>;
    const userTables = this.state.isShowUserTables
    ?
      <UserTable userinfo='data' handleAddUser={this.onClickAddUserBtn.bind(this)}/>
    :
      <div></div>
    return(
      <div>
        <div style={{ fontSize: "24px", color: "#000000", fontWeight: "bold" }}>{ this.state.userTotalNumbers }&nbsp;用户</div>
        <div style={{ marginTop: "10px"}}>
          <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}
            onClick={()=>{
              this.setState({
                isOpenFilter:!this.state.isOpenFilter
              });
              this.setState({
                addUserActiveKey: !this.state.isOpenFilter ? ['1','2','3','4'] : []
              });
            }}>
            <Icon type={ this.state.isOpenFilter ? 'caret-down' : 'caret-right' } style={{ fontSize: "6px"}}/>
            &nbsp;&nbsp;新过滤器
          </a>
        </div>
        { userFilterContent }
        <div style={{ borderBottom: "1px solid #cecece", marginTop: 5 }}></div>
        { userAddFilteTitle }
        { userAddFilterChecks }
        { userTables }
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
