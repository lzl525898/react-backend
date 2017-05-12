import React, { Component } from 'react';

import {
  Row,
  Col,
  Tooltip,
  Icon,
} from 'antd';

import UserFilter from './back-user-filter';
import UserNewFilter from './back-user-newfilter';
import BatcgUserlist from './back-user-batch-list';

export default class BatchHandleCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenFilter : false,
      addUserActiveKey : false,
      hasAddFilter : false,
      isShowAddFilters :　false,
      showUserlist : false
    };
    this.props.setDefaultFilterItems(this.props.getFilterItem());
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
      <BatcgUserlist isOpen={true}/>
    :
      <BatcgUserlist isOpen={false}/>
    return(
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
      </div>
    )
  }
}
