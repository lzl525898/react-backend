import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const defaultProps = {
  headerHeight : "50px",
  headerPadding : 0,
  headerBackground : "#fff",
  contentMinWidth : 640,
  contentMinHeight : 360,
  contentBackground : '#fff',
  contentPadding : 24
};

export default class BackStage extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    };
  };
  render(){
    return(
      <Layout style={{ height:"100%" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
        </Sider>
        <Layout>
          <Header style={{ background:this.props.headerBackground,
                           padding:this.props.headerPadding ,
                           height:this.props.headerHeight}} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{
              padding:this.props.contentPadding, background:this.props.contentBackground,
              minHeight:this.props.contentMinHeight , minWidth:this.props.contentMinWidth
            }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React Backend ©2017 Created by Liangzelei
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

BackStage.propTypes = {
  contentMinHeight : React.PropTypes.number,
  contentMinWidth : React.PropTypes.number,
  contentPadding : React.PropTypes.number,
  contentBackground : React.PropTypes.string,
  headerHeight : React.PropTypes.string,
  headerPadding : React.PropTypes.number,
  headerBackground : React.PropTypes.string
};

BackStage.defaultProps = defaultProps;
