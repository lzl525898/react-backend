import React, { Component } from 'react';

import {
  Row,
  Col,
  Tooltip,
  Icon,
  Button,
  Modal,
  Select,
  message
} from 'antd';

const Option = Select.Option;

import UserFilter from './back-user-filter';
import UserNewFilter from './back-user-newfilter';
import BatcgUserlist from './back-user-batch-list';
import RichEditor from './rich-editor';

class HandleBackUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenMsg: true,
      isShowMsgModal:this.props.type=='password' ? true : false,
      confirmLoading:false,
      currentType:this.props.type
    };
  };
  handleOk(){
    this.setState({
      confirmLoading: true,
    });
    this.props.setTargetArray([]);
    setTimeout(() => {
      this.setState({
        isShowMsgModal: false,
        confirmLoading: false,
      });
      this.props.changeShowBatch('');
    }, 500);
  };
  handleCancel(){
    this.setState({
      isShowMsgModal: false,
    });
  };
  handleSelectChange(value){
    message.warning('value=>'+value);
  };
  genCurrentContent(){
    if ( 'message'==this.state.currentType ) {
      var userNames = ()=>{
        var names = '';
        this.props.targetArray.map(value=>{
          names = names + value + ','
        });
        return names;
      };
      return(
        <div>
          <div style={{ marginTop: "10px"}}>
            <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}
              onClick={()=>{
                this.setState({
                  isOpenMsg:!this.state.isOpenMsg
                });
              }}>
              <Icon type={ this.state.isOpenMsg ? 'caret-down' : 'caret-right' } style={{ fontSize: "6px"}}/>
              &nbsp;&nbsp;消息
            </a>
          </div>
          <Row>
            <Col span={3} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消息正文
            </span></Col>
            <Col span={21}>
              <div>
                <RichEditor defaultString={'请输入消息...'}/>
              </div>
            </Col>
          </Row>
          <div style={{ borderBottom: "1px solid #cecece", marginTop: 5}}></div>
          <Row>
            <Col span={3}></Col>
            <Col span={21}>
              <div style={{marginTop:5}}>
                <Button type='primary' onClick={()=>{
                  this.setState({isShowMsgModal:true});
                }}>保存更改</Button>
                <Button style={{marginLeft:5}} onClick={()=>{
                  this.props.changeShowBatch('');
                }}>取消</Button>
              </div>
            </Col>
          </Row>
          <Modal title="确认"
            visible={this.state.isShowMsgModal} onOk={this.handleOk.bind(this)}
            style={{textAlign: 'center', whiteSpace: 'nowrap', top: 300}}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel.bind(this)}>
            <p>{`您确定想发送消息给所有这些用户吗?`}</p>
            <p>{ userNames() }</p>
          </Modal>
        </div>
      )
    } else if ( 'password'==this.state.currentType ) {
      return(
        <div>
          <div style={{ marginTop: "10px"}}>
            <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}>确认
            </a>
          </div>
          <Modal title="确认"
            visible={this.state.isShowMsgModal} onOk={this.handleOk.bind(this)}
            style={{textAlign: 'center', whiteSpace: 'nowrap', top: 150}}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel.bind(this)}>
            <p>{`您十分确定要将密码强行修改为 'admin' 吗?`}</p>
          </Modal>
        </div>
      )
    } else if ( 'download'==this.state.currentType ) {
      return(
        <div>
          <div style={{ marginTop: "10px"}}>
            <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}>下载
            </a>
          </div>
          <Row>
            <Col span={3}></Col>
            <Col span={21}>
              <span style={{fontSize:'14px'}}>导出用户如&nbsp;&nbsp;</span>
              <Select
                defaultValue="json" style={{ width: 200 }} onChange={this.handleSelectChange.bind(this)}>
                <Option value="csv">CSV文件</Option>
                <Option value="excel">Excel文件</Option>
                <Option value="json">Json文件</Option>
              </Select>
              <Button type='primary' style={{marginLeft:5}} onClick={()=>{
                this.props.setTargetArray([]);
                this.props.changeShowBatch('');
                message.success('下载成功');
              }}>下载</Button>
            </Col>
          </Row>
        </div>
      )
    }
  }
  render(){
    return(
      <div>
        { this.genCurrentContent() }
      </div>
    )
  }
}

export default class BatchHandleCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenFilter : false,
      addUserActiveKey : false,
      hasAddFilter : false,
      isShowAddFilters :　false,
      showUserlist : false,
      targetArray: [], // 默认选中的用户
      showPageName: '', // message发消息 password修改密码 download下载
      showSelectContent : false // true 展示其它页面 false 展示批量操作
    };
    this.props.setDefaultFilterItems(this.props.getFilterItem());
  };
  setTargetArray(target){
    this.setState({
      targetArray: target
    });
  };
  // 改变是否显示批量操作页面的状态
  changeBatchStatus(pageName){
    this.setState({
      showSelectContent:!this.state.showSelectContent,
      showPageName:pageName
    });
  };
  setFilterItem(filterItem){
    this.props.setFilterItem(filterItem);
  };
  // 隐藏有关 新活动过滤器 的状态
  hideAddFilterShow(){
    this.setState({
      hasAddFilter : false,
      isShowAddFilters : false
    });
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
  // 判断是否可以添加过滤器
  checkAddNewFilters(){
    var filterItems = this.props.getFilterItem();
    if ( filterItems.xing.content.length>0
       ||filterItems.ming.content.length>0
       ||filterItems.username.content.length>0
       ||filterItems.allname.content.length>0 ) {
      return true;
    } else {
      return false;
    }
  };
  render(){
    const userFilterContent = this.state.isOpenFilter
    ?
      <UserFilter
        getFilterItem={this.props.getFilterItem}
        setFilterItemValue={this.props.setFilterItemValue.bind(this.props.getFilterItem())}
        checkAddNewFilters={this.checkAddNewFilters.bind(this)}
        setDefaultFilterItems={this.props.setDefaultFilterItems.bind(this.props.getFilterItem())}
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
        getFilterItem={this.props.getFilterItem}
        setFilterItemValue={this.props.setFilterItemValue.bind(this.props.getFilterItem())}
        deleteCheckBoxFilter={this.props.deleteCheckBoxFilter.bind(this.props.getFilterItem())}
        setDefaultFilterItem={this.props.setDefaultFilterItems.bind(this.props.getFilterItem())}
        hideAddFilterShow={this.hideAddFilterShow.bind(this)}
        changeAddFilterShowStatus={this.changeAddFilterShowStatus.bind(this)}
      />
    :
      <div></div>;
    const userListWithBatch = this.state.showUserlist
    ?
      <BatcgUserlist isOpen={true} targetArray={this.state.targetArray}
                     setTargetArray={this.setTargetArray.bind(this)}
                     changeShowBatch={this.changeBatchStatus.bind(this)}/>
    :
      <BatcgUserlist isOpen={false}  targetArray={this.state.targetArray}
                     setTargetArray={this.setTargetArray.bind(this)}
                     changeShowBatch={this.changeBatchStatus.bind(this)}/>;
    const showBatchContent = this.state.showSelectContent
    ?
      <HandleBackUser type={this.state.showPageName}
                      targetArray={this.state.targetArray}
                      setTargetArray={this.setTargetArray.bind(this)}
                      changeShowBatch={this.changeBatchStatus.bind(this)}/>
    :
      <div>
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
        { userListWithBatch }
      </div>;
    return(
      <div>
        { showBatchContent }
      </div>
    )
  }
}
