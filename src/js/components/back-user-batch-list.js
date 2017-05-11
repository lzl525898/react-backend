import React, { Component } from 'react';

import {
  Icon,
  Transfer
} from 'antd';

export default class BatcgUserlist extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowUserList: true,
      mockData: [],
      targetKeys: [],
    };
  };
  componentDidMount() {
    this.getMock();
  }
  getMock(){
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `张三${i + 1}`,
        description: `普通用户${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({
      mockData: mockData,
      targetKeys: targetKeys
    });
  };
  handleChange(targetKeys, direction, moveKeys){
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys: targetKeys});
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
  }
  render(){
    const userlist = this.state.isShowUserList
    ?
      <div>
        <div style={{marginTop:5}}></div>
        <Transfer
          dataSource={this.state.mockData}
          listStyle={{
            width: 300,
            height: 300,
          }}
          notFoundContent={'未选择任何用户'}
          titles={['所有用户','所有已选用户']}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange.bind(this)}
          render={this.renderItem.bind(this)}
        />
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
      </div>
    )
  }
}
