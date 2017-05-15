import React, { Component } from 'react';

import {
  Row,
  Col,
  Icon,
  Transfer,
  Button,
  Select,
  message
} from 'antd';

const Option = Select.Option;

export default class BatcgUserlist extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowUserList: true,
      mockData: [],
      targetKeys: [],
      targetSelect: ''
    };
  };
  componentWillMount() {
    this.getMock(this.props.targetArray);
  }
  getMock(target){
    var targetKeys = [];
    var mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `张三${i + 1}`,
        description: `普通用户`,
        chosen: Math.random() * 2 > 1,
      };
      // if (data.chosen) {
      //   targetKeys.push(data.key);
      // }
      mockData.push(data);
      if (target.length>0) {
        targetKeys = target;
      }
    }
    this.setState({
      mockData: mockData,
      targetKeys: targetKeys
    });
  };
  handleChange(targetKeys, direction, moveKeys){
    // console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys: targetKeys});
    this.props.setTargetArray(targetKeys);
  };
  renderItem(item){
    const customLabel = (
        <span className="custom-item">
          {item.title} - {item.description}
        </span>
    );
    return {
      label: customLabel,  // for displayed item
      value: item.title,   // for title and filter matching
    };
  };
  handleSelectChange(value){
    this.setState({targetSelect:value});
  };
  renderFooter(props){
    if ('所有用户'==props.titleText) {
      return (
        <div>
          <Button size="small" style={{ float: 'right', margin: 5 }}
            onClick={this.getMock.bind(this)}
          >
            数据还原
          </Button>
        </div>
      );
    } else { //
      return (
        <div>
          <Button size="small" style={{ float: 'right', margin: 5 }}
            onClick={this.getMock.bind(this)}
          >
            数据还原
          </Button>
        </div>
      );
    }
  };
  handleClickBtn(){
    var targetSelect = this.state.targetSelect;
    if ('message'==targetSelect || 'password'==targetSelect || 'download'==targetSelect ) { // 发送消息
      if ( this.state.targetKeys.length>0 ) { //证明有点选用户
        this.props.changeShowBatch(targetSelect);
      }else{
        message.warning('您还没有选择任何要操作的用户！');
      };
    } else { // 没有选择任何操作
      console.log('targetSelect=>'+targetSelect);
    };
  };
  render(){
    const userlist = this.state.isShowUserList
    ?
      <div style={{height: 320}}>
        <Row style={{ marginTop: 10 }}>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>用户</span></Col>
          <Col span={21} style={{ height: "20px" }}>
            <div style={{marginTop:5}}></div>
            <div>
              <Transfer
                dataSource={this.state.mockData}
                listStyle={{
                  width: 300,
                  height: 300,
                }}
                notFoundContent={'未选择任何用户'}
                titles={['所有用户','所有已选用户']}
                targetKeys={this.state.targetKeys}
                footer={this.renderFooter.bind(this)}
                onChange={this.handleChange.bind(this)}
                render={this.renderItem.bind(this)}
              />
            </div>
          </Col>
        </Row>
      </div>
    :
      <div></div>;
    return(
      <div style={{ marginTop: 5 }}>
        <div style={{ lineHeight: "18px", marginTop: "5px"}}>
          <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}
            onClick={()=>{
              this.setState({
                isShowUserList:!this.state.isShowUserList
              });
            }}>
            <Icon type={ this.state.isShowUserList ? 'caret-down' : 'caret-right' } style={{ fontSize: "6px"}}/>
            &nbsp;&nbsp;列表中的用户
          </a>
        </div>
        { userlist }
        <div style={{ borderBottom: "1px solid #cecece"}}></div>
        <div>
          <Row style={{ marginTop: 10 }}>
            <Col span={3} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}>
              <span><a style={{ textDecoration: "none", fontSize: "18px" }}>
                对选中的用户...
                </a></span>
            </Col>
            <Col span={21} style={{ height: "20px" }}>
              <div>
              <Select defaultValue="选择..." style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                <Option value="message">发消息</Option>
                <Option value="password">强制修改密码</Option>
                <Option value="download">下载</Option>
              </Select>
              <Button style={{marginLeft: 20}} type='primary' onClick={this.handleClickBtn.bind(this)}>继续</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
