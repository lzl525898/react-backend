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
    };
  };
  // 点选过滤器时的回调
  handleChange(value, type){
    if ( 'xing'==value ) {
      this.props.setFilterItemValue(this.props.getFilterItem(), 'xing', 'select', type );
      // filterItems.xing.select = type;
    } else if ( 'ming'==value ){
      this.props.setFilterItemValue(this.props.getFilterItem(), 'ming', 'select', type );
      // filterItems.ming.select = type;
    } else if ( 'username'==value ){
      this.props.setFilterItemValue(this.props.getFilterItem(), 'username', 'select', type );
      // filterItems.username.select = type;
    } else if ( 'allname'==value ){
      this.props.setFilterItemValue(this.props.getFilterItem(), 'allname', 'select', type );
      // filterItems.allname.select = type;
    }
  };
  // 添加活动过滤器
  onClickAddFilter(){
    if ( this.props.checkAddNewFilters() ) {
      // 清空input value
      try {
        this.refs.allnameInput.refs.input.value = '';
        this.refs.usernameInput.refs.input.value = '';
        this.refs.xingInput.refs.input.value = '';
        this.refs.mingInput.refs.input.value = '';
      } catch (err) {
        // console.log(err);
      }
      this.props.changeAddFilterShowStatus();
      try {
        this.props.updateUserTablesShow();
      } catch (err) {
        // console.log('未定义')
      }
    }
  };
  // 过滤器项目有改变时调用
  handleContentChange(e){
    // console.log('id=>'+e.target.id+'  value=>'+e.target.value);
    var value = e.target.value;
    if ( 'allnameInput'==e.target.id ) {
        this.props.setFilterItemValue(this.props.getFilterItem(), 'allname', 'content', value );
        // filterItems.allname.content = value;
    } else if ( 'usernameInput'==e.target.id ) {
        this.props.setFilterItemValue(this.props.getFilterItem(), 'username', 'content', value );
        // filterItems.username.content = value;
    } else if ( 'xingInput'==e.target.id ) {
        this.props.setFilterItemValue(this.props.getFilterItem(), 'xing', 'content', value );
        // filterItems.xing.content = value;
    } else if ( 'mingInput'==e.target.id ) {
        this.props.setFilterItemValue(this.props.getFilterItem(), 'ming', 'content', value );
        // filterItems.ming.content = value;
    }
  };
  render(){
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
                <Option value="包含">包含</Option>
                <Option value="不包含">不包含</Option>
                <Option value="等于">等于</Option>
                <Option value="已...开始">已...开始</Option>
                <Option value="已...结束">已...结束</Option>
                <Option value="为空">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="xingInput" ref="xingInput"/>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>名</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'ming') }>
                <Option value="包含">包含</Option>
                <Option value="不包含">不包含</Option>
                <Option value="等于">等于</Option>
                <Option value="已...开始">已...开始</Option>
                <Option value="已...结束">已...结束</Option>
                <Option value="为空">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="mingInput" ref="mingInput"/>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>用户名</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Select defaultValue="包含" style={{ width: 80 }} onChange={ this.handleChange.bind(this, 'username') }>
                <Option value="包含">包含</Option>
                <Option value="不包含">不包含</Option>
                <Option value="等于">等于</Option>
                <Option value="已...开始">已...开始</Option>
                <Option value="已...结束">已...结束</Option>
                <Option value="为空">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="usernameInput" ref="usernameInput"/>
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
                <Option value="包含">包含</Option>
                <Option value="不包含">不包含</Option>
                <Option value="等于">等于</Option>
                <Option value="已...开始">已...开始</Option>
                <Option value="已...结束">已...结束</Option>
                <Option value="为空">为空</Option>
              </Select>
            </div>
            <div style={{ float: "left", marginLeft: "10px", width: "180px" }}>
              <Input onChange={ this.handleContentChange.bind(this) } id="allnameInput" ref="allnameInput"/>
            </div>
          </Col>
        </Row>
        { filters }
        <Row style={{ marginTop: 10, marginBottom: 5}}>
          <Col span={1}></Col>
          <Col span={2}></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{ float: "left" }}>
              <Button type="primary" onClick={ this.onClickAddFilter.bind(this) }>添加过滤器</Button>
            </div>
          </Col>
        </Row>
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
      </div>
    )
  }
}
