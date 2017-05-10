import React, { Component } from 'react';

import {
  Icon
} from 'antd';

export default class BatcgUserlist extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowUserList: false
    };
  };
  render(){
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
      </div>
    )
  }
}
