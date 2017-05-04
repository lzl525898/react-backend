import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Select,
  Input,
  Button,
  Checkbox
} from 'antd';
export default class AddfilterItems extends Component {
  constructor(props){
    super(props);
    var filterItems = this.props.getFilterItem();
    var xing = filterItems.xing.content.length > 0;
    var ming = filterItems.ming.content.length > 0;
    var username = filterItems.username.content.length > 0;
    var allname = filterItems.allname.content.length > 0;
    this.state={
      xingStatus: xing,
      mingStatus: ming,
      usernameStatus: username,
      allnameStatus: allname
    };
  };
  onFilterChange(e){
    var targetCheck = e.target;
    var filterItem = this.props.getFilterCheck();
    if ( 'xing'==targetCheck.dataId ) {
      this.props.setFilterItemValue(filterItem, 'xing', 'checked', !filterItem.xing.checked);
      // filterChecks.xing.checked = !filterChecks.xing.checked;
    } else if ( 'ming'==targetCheck.dataId ) {
      this.props.setFilterItemValue(filterItem, 'ming', 'checked', !filterItem.xing.checked);
      // filterChecks.ming.checked = !filterChecks.ming.checked;
    } else if ( 'username'==targetCheck.dataId ) {
      this.props.setFilterItemValue(filterItem, 'username', 'checked', !filterItem.username.checked);
      // filterChecks.username.checked = !filterChecks.username.checked;
    } else if ( 'allname'==targetCheck.dataId ) {
      this.props.setFilterItemValue(filterItem, 'allname', 'checked', !filterItem.allname.checked);
      // filterChecks.allname.checked = !filterChecks.allname.checked;
    }
  };
  render(){
    var filterItem = this.props.getFilterItem();
    return(
      <div>
        <Row style={{ marginTop: 10}}>
          <Col span={3}></Col>
          <Col span={21} style={{ marginBottom: 5 }}>
            <div>
              { this.state.xingStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="xing">
               {filterItem.xing.title}&nbsp;{filterItem.xing.select}&nbsp;"{filterItem.xing.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.mingStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="ming">
               {filterItem.ming.title}&nbsp;{filterItem.ming.select}&nbsp;"{filterItem.ming.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.usernameStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="username">
               {filterItem.username.title}&nbsp;{filterItem.username.select}&nbsp;"{filterItem.username.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.allnameStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="allname">
               {filterItem.allname.title}&nbsp;{filterItem.allname.select}&nbsp;"{filterItem.allname.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div style={{ marginTop : 10 }}>
              <Row>
                <Col span={3}>
                  <Button type="primary" style={{ width: "100%" }} disabled={true} onClick={()=>{
                    //将选中的check去掉
                  }}>移除选择的过滤器</Button></Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Button type="primary" style={{ width: "100%" }} onClick={()=>{
                    this.props.setDefaultFilterItem(filterItem);
                    this.props.hideAddFilterShow();
                  }}>移除所有过滤器</Button></Col>
                <Col span={17}></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
};
