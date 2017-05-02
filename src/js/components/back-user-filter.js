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
const Option = Select.Option;

export default class UserFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowMoreFilter: false, // 是否显示更多
      hasAddFilter: true, // 是否添加过滤器
      isShowAddFilters: false, //是否显示添加的过滤器
      xingInput: 'contain', // select 当前选中项
      mingInput: 'contain', // select 当前选中项
      usernameInput: 'contain', // select 当前选中项
      allnameInput: 'contain', // select 当前选中项
      xingInputValue: '',
      mingInputValue: '',
      usernameInputValue: '',
      allnameInputValue: '',

    };
  };
  // 点选过滤器时的回调
  handleChange(value, type){
    if ( 'xing'==value ) {
      this.setState({ xingInput:type });
    } else if ( 'ming'==value ){
      this.setState({ mingInput:type });
    } else if ( 'username'==value ){
      this.setState({ usernameInput:type });
    } else if ( 'allname'==value ){
      this.setState({ allnameInput:type });
    }
  };
  // 添加活动过滤器
  onClickAddFilter(){
    if ( this.state.xingInputValue.length>0
       ||this.state.mingInputValue.length>0
       ||this.state.usernameInputValue.length>0
       ||this.state.allnameInputValue.length>0 ) {
      this.setState({ isShowAddFilters:true });
    }
  };
  onFilterChange(){

  };
  // 过滤器项目有改变时调用
  handleContentChange(e){
    console.log('id=>'+e.target.id+'  value=>'+e.target.value);
    var value = e.target.value;
    if ( 'allnameInput'==e.target.id ) {
      if (value.length>0) {
        this.setState({ allnameInputValue:value });
      }
    } else if ( 'usernameInput'==e.target.id ) {
      if (value.length>0) {
        this.setState({ usernameInputValue:value });
      }
    } else if ( 'xingInput'==e.target.id ) {
      if (value.length>0) {
        this.setState({ xingInputValue:value });
      }
    } else if ( 'mingInput'==e.target.id ) {
      if (value.length>0) {
        this.setState({ mingInputValue:value });
      }
    }
  }
  render(){
    // 添加的过滤器项目
    const filterItem = ( info ) => (
      <Row style={{ marginTop: 10}}>
        <Col span={3}></Col>
        <Col span={21} style={{ height: "20px" }}>
          <div style={{ float: "left" }}>
            <Checkbox onChange={ this.onFilterChange.bind(this) }>学号&nbsp;包括&nbsp;'2017'</Checkbox>
          </div>
        </Col>
      </Row>
    );
    // 添加的顾虑器集合
    const addFiltes = this.state.hasAddFilter
    ?
      <div>
        <div style={{ lineHeight: "18px", marginTop: "10px"}}>
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
        <div>
          { filterItem(123) }
        </div>
      </div>
    :
      <div></div>;
    // 过滤器
    const filters = this.state.isShowMoreFilter
    ?
      <div>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>姓</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'xing') }>
                <Option value="contain">包含</Option>
                <Option value="exclusive">不包含</Option>
                <Option value="equal">等于</Option>
                <Option value="start">已...开始</Option>
                <Option value="end">已...结束</Option>
                <Option value="null">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="xingInput"/>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>名</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'ming') }>
                <Option value="contain">包含</Option>
                <Option value="exclusive">不包含</Option>
                <Option value="equal">等于</Option>
                <Option value="start">已...开始</Option>
                <Option value="end">已...结束</Option>
                <Option value="null">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="mingInput"/>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>用户名</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'username') }>
                <Option value="contain">包含</Option>
                <Option value="exclusive">不包含</Option>
                <Option value="equal">等于</Option>
                <Option value="start">已...开始</Option>
                <Option value="end">已...结束</Option>
                <Option value="null">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="usernameInput"/>
            </div>
          </Col>
        </Row>
      </div>
    :
      <div></div>;
    return(
      <div>
        <Row style={{ marginTop: 10}}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>用户全名</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'allname') }>
                <Option value="contain">包含</Option>
                <Option value="exclusive">不包含</Option>
                <Option value="equal">等于</Option>
                <Option value="start">已...开始</Option>
                <Option value="end">已...结束</Option>
                <Option value="null">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="allnameInput"/>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 15, marginBottom: 15}}>
          <Col span={1}></Col>
          <Col span={2}></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Button type="primary" onClick={ this.onClickAddFilter.bind(this) }>添加过滤器</Button>
            </div>
          </Col>
        </Row>
        { filters }
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={23} style={{ height: "20px", lineHeight: "20px" }}>
            <a href="#" style={{ textDecoration: "none" }} onClick={()=>{
              this.setState({ isShowMoreFilter: !this.state.isShowMoreFilter});
            }}>
              { this.state.isShowMoreFilter ? '显示较少...' : '显示更多...' }
            </a>
          </Col>
        </Row>
        <div style={{ borderBottom: "1px solid #cecece"}}></div>
        { addFiltes }
      </div>
    )
  }
}
