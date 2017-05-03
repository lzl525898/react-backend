import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

var filterItems = {};
var filterChecks = {};

class AddfilterItems extends Component {
  constructor(props){
    super(props);
    this.state={
      xingStatus: this.props.xing,
      mingStatus: this.props.ming,
      usernameStatus: this.props.username,
      allnameStatus: this.props.allname
    };
  };
  onFilterChange(e){
    var targetCheck = e.target;
    if ( 'xing'==targetCheck.dataId ) {
      filterChecks.xing.checked = !filterChecks.xing.checked;
    } else if ( 'ming'==targetCheck.dataId ) {
      filterChecks.ming.checked = !filterChecks.ming.checked;
    } else if ( 'username'==targetCheck.dataId ) {
      filterChecks.username.checked = !filterChecks.username.checked;
    } else if ( 'allname'==targetCheck.dataId ) {
      filterChecks.allname.checked = !filterChecks.allname.checked;
    }
  };
  render(){
    return(
      <div>
        <Row style={{ marginTop: 10}}>
          <Col span={3}></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div>
              { this.state.xingStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="xing">
               {filterItems.xing.title}&nbsp;{filterItems.xing.select}&nbsp;"{filterItems.xing.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.mingStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="ming">
               {filterItems.ming.title}&nbsp;{filterItems.ming.select}&nbsp;"{filterItems.ming.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.usernameStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="username">
               {filterItems.username.title}&nbsp;{filterItems.username.select}&nbsp;"{filterItems.username.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div>
              { this.state.allnameStatus ?
              <Checkbox onChange={ this.onFilterChange.bind(this) } dataId="allname">
               {filterItems.allname.title}&nbsp;{filterItems.allname.select}&nbsp;"{filterItems.allname.content}"
              </Checkbox> : <div></div>
              }
            </div>
            <div style={{ marginTop : 10 }}>
              <Row>
                <Col span={3}>
                  <Button type="primary" style={{ width: "100%" }} disabled={true} onClick={()=>{
                    //将选中的check去掉
                    if ( !filterChecks.xing.checked ) {
                      filterItems.xing.content = "";
                      this.setState({ xingStatus:false });
                    }
                    if ( !filterChecks.ming.checked ) {
                      filterItems.ming.content = "";
                      this.setState({ mingStatus:false });
                    }
                    if ( !filterChecks.username.checked ) {
                      filterItems.username.content = "";
                      this.setState({ usernameStatus:false });
                    }
                    if ( !filterChecks.allname.checked ) {
                      filterItems.allname.content = "";
                      this.setState({ allnameStatus:false });
                    }
                    this.props.setFilterCheck();
                  }}>移除选择的过滤器</Button></Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Button type="primary" style={{ width: "100%" }} onClick={()=>{
                    this.props.setFilterItems();
                    this.props.handleShowFilter();
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
export default class UserFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowMoreFilter: false, // 是否显示更多
      hasAddFilter: false, // 是否添加过滤器标题
      isShowAddFilters: true, //是否显示添加的过滤器
    };
    this.setDefaultFilterCheck();
    this.setDefaultFilterItems();
  };
  // 修改是否显示活动过滤器状态
  changeFilterShowStatus(){
    this.setState({ hasAddFilter:!this.state.hasAddFilter});
  };
  // 设置check默认值
  setDefaultFilterCheck(){
    filterChecks = {
      xing: {
        checked: false,
        id: 'xing'
      },
      ming: {
        checked: false,
        id: 'ming'
      },
      username: {
        checked: false,
        id: 'username'
      },
      allname: {
        checked: false,
        id: 'allname'
      }
    }
  };
  // 设置过滤项默认值
  setDefaultFilterItems(){
    filterItems = {
      xing:{
        title: '姓',
        select: '包含',
        content: ''
      },
      ming:{
        title: '名',
        select: '包含',
        content: ''
      },
      username:{
        title: '用户名',
        select: '包含',
        content: ''
      },
      allname:{
        title: '用户全名',
        select: '包含',
        content: ''
      }
    };
  };
  // 点选过滤器时的回调
  handleChange(value, type){
    if ( 'xing'==value ) {
      filterItems.xing.select = type;
    } else if ( 'ming'==value ){
      filterItems.ming.select = type;
    } else if ( 'username'==value ){
      filterItems.username.select = type;
    } else if ( 'allname'==value ){
      filterItems.allname.select = type;
    }
  };
  // 添加活动过滤器
  onClickAddFilter(){
    if ( filterItems.xing.content.length>0
       ||filterItems.ming.content.length>0
       ||filterItems.username.content.length>0
       ||filterItems.allname.content.length>0 ) {
      // 清空input value
      try {
        this.refs.allnameInput.refs.input.value = '';
        this.refs.usernameInput.refs.input.value = '';
        this.refs.xingInput.refs.input.value = '';
        this.refs.mingInput.refs.input.value = '';
      } catch (err) {
        // console.log(err);
      }
      this.setState({ hasAddFilter:true });
    }
  };
  // 过滤器项目有改变时调用
  handleContentChange(e){
    // console.log('id=>'+e.target.id+'  value=>'+e.target.value);
    var value = e.target.value;
    if ( 'allnameInput'==e.target.id ) {
        filterItems.allname.content = value;
    } else if ( 'usernameInput'==e.target.id ) {
        filterItems.username.content = value;
    } else if ( 'xingInput'==e.target.id ) {
        filterItems.xing.content = value;
    } else if ( 'mingInput'==e.target.id ) {
        filterItems.ming.content = value;
    }
  }
  render(){
    const addfilterItems =  this.state.isShowAddFilters// true 显示 fakse 隐藏
        ?
        <AddfilterItems
          xing={filterItems.xing.content.length>0}
          ming={filterItems.ming.content.length>0}
          username={filterItems.username.content.length>0}
          allname={filterItems.allname.content.length>0}
          setFilterItems={ this.setDefaultFilterItems.bind(this) }
          setFilterCheck={ this.setDefaultFilterCheck.bind(this) }
          handleShowFilter={ this.changeFilterShowStatus.bind(this) }
        />
        :
        <div></div>;
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
          { addfilterItems }
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
        <div style={{ borderBottom: "1px solid #cecece"}}></div>
        { addFiltes }
      </div>
    )
  }
}
