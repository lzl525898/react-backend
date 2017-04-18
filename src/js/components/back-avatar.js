import React, { Component } from 'react';

import { Card, Layout, Tooltip } from 'antd';

const { Header, Content } = Layout;

const defaultProps = {
  headerTitle: "后台管理系统",
  headerColor: "#1c8bc2",
  headerHeight: 50,
};

export default class BackAvater extends Component {
  constructor(props){
    super(props);
  };
  render(){
    return(
      <Layout>
        <Header style={{
          width: "100%", textAlign: "center", padding: 0,
          fontSize: "24px", lineHeight: '50px',
          height: this.props.headerHeight,
          backgroundColor: this.props.headerColor }}>
          { this.props.headerTitle }
        </Header>
        <Content>
          <div style={{ width: "100%", height: 100, display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", backgroundColor: "#fff" }}>
              <img style={{ width: 60, height: 60, marginTop: 20, marginRight: 5 }} alt="avater" src={this.props.userAvatar}/>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItem: "flex-start", backgroundColor: "#fff" }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  color: "#3e3e3e", fontSize: "16px", marginTop: 25, marginLeft: 10, width: 80,
                  whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <Tooltip placement="top" title={ <span>{ this.props.userNick }</span> }>{ this.props.userNick} </Tooltip>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  color: "#3e3e3e", fontSize: "14px", marginTop: 5, marginLeft: 10,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <Tooltip placement="bottom" title={ <span>{ this.props.userType }</span> }>{ this.props.userType }</Tooltip>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

BackAvater.propTypes = {
  headerTitle: React.PropTypes.string,
  headerColor: React.PropTypes.string,
  headerHeight: React.PropTypes.number,
  userNick: React.PropTypes.string.isRequired,
  userType: React.PropTypes.string.isRequired,
  userAvatar: React.PropTypes.string.isRequired
};

BackAvater.defaultProps = defaultProps;
