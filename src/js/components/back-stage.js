import React, { Component } from 'react';
import { Layout, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import BackHeader from './back-header';
import BackAvatar from './back-avatar';
import BackMenu from './back-menu';
import ContentUser from './back-content-user';

const defaultProps = {
  headerHeight : "50px",
  headerPadding : 0,
  headerBackground : "#36A6E0",
  contentMinWidth : 640,
  contentMinHeight : 360,
  contentBackground : '#fff',
  contentPadding : 24,
  siderBackground : "#ECECEC"
};

export default class BackStage extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      userName: JSON.parse(localStorage.userInfo).userName,
      userType: JSON.parse(localStorage.userInfo).userType,
      userAvatar: JSON.parse(localStorage.userInfo).userAvatar,
      passWord: JSON.parse(localStorage.userInfo).userPassword,
      selectedKey: '',
      subMenuKey: '',
      currentMenu : '',
      currentitem : ''
    };
  };

  // 点击菜单时调用,得知点击了哪个菜单
  handleMenuItem( menuInfo ){
    this.setState({
      selectedKey: menuInfo.selectedKey,
      subMenuKey: menuInfo.openKey,
      currentMenu: menuInfo.currentMenu,
      currentitem: menuInfo.currentitem
    });
  };



  render(){
    const contents = ( submenu, selectKey ) => {
      if ('user'==submenu ) {
        return <ContentUser currentSelectMenuItem={ selectKey } />
      }
      return <div>ERROR</div>;
    };
    const breadcrumbs = () => {

    }
    return(
      <Layout style={{ height:"100%" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: this.props.siderBackground }}
          onCollapse={(collapsed, type) => { /*console.log(collapsed, type);*/ }}
        >
          <BackAvatar userNick={ this.state.userName } userType={ this.state.userType } userAvatar={ this.state.userAvatar }/>
          <BackMenu handleCurrentMenuItem={ this.handleMenuItem.bind(this) }/>
        </Sider>
        <Layout>
          <Header style={{ background:this.props.headerBackground,
                           padding:this.props.headerPadding ,
                           height:this.props.headerHeight}} >
              <BackHeader {...this.props} userNick={ this.state.userName } userAvatar= { this.state.userAvatar }/>
          </Header>
          <Content style={{ margin: '6px 16px' }}>
            <Breadcrumb separator={<Icon type="caret-right"/>} style={{ margin: "10px 0"}}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>{ this.state.currentMenu }</Breadcrumb.Item>
              <Breadcrumb.Item>{ this.state.currentitem }</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{
              padding:this.props.contentPadding, background:this.props.contentBackground,
              minHeight:this.props.contentMinHeight , minWidth:this.props.contentMinWidth
            }}>
              { contents( this.state.subMenuKey, this.state.selectedKey ) }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>
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
  headerBackground : React.PropTypes.string,
  siderBackground : React.PropTypes.string
};

BackStage.defaultProps = defaultProps;
