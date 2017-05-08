import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const defaultProps = {
  menuBackgroundColor : "#E9E9E9"
};

export default class BackMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMenu: this.props.defaultMenu,
      currentItem: this.props.defaultItem,
      defaultSelectedKeys: [this.props.defaultSelectedKeys],
      defaultOpenKeys: [this.props.defaultOpenKeys]
    };
  };
  componentWillMount(){
    var menuInfo = {
      selectedKey : this.state.defaultSelectedKeys[0],
      openKey : this.state.defaultOpenKeys[0],
      currentMenu : this.state.currentMenu,
      currentItem : this.state.currentItem
    };
    this.props.handleCurrentMenuItem( menuInfo );
  };

  setSelectedKeys(keys){
    var keysArr = new Array();
    keysArr.push(keys);
    this.setState({
      currentSelectedKeys:keysArr
    });
  };
  handleClick(e){
    var menuInfo = {
      selectedKey : e.key,
      openKey : e.keyPath[1],
      currentMenu : e.item.props.datamenu,
      currentItem : e.item.props.dataitem
    };
    this.props.updatePropsValue( menuInfo.selectedKey );
    this.props.handleCurrentMenuItem( menuInfo );
    this.setState({
      currentMenu: e.item.props.datamenu,
      currentItem: e.item.props.dataitem
    });
  };
  render(){
    return(
      <Menu
        mode="inline"
        onClick={ this.handleClick.bind(this) }
        selectedKeys={ [this.props.selectKeys] }
        defaultSelectedKeys={ this.state.defaultSelectedKeys }
        defaultOpenKeys={ this.state.defaultOpenKeys }
        style={{ width: "100%", backgroundColor: this.props.menuBackgroundColor }}>
        <SubMenu key="base" title={<span><Icon type="info-circle-o"/><span>基础信息</span></span>}>
          <Menu.Item key="1" datamenu="基础信息">Option 1</Menu.Item>
          <Menu.Item key="2" datamenu="基础信息">Option 2</Menu.Item>
          <Menu.Item key="3" datamenu="基础信息">Option 3</Menu.Item>
          <Menu.Item key="4" datamenu="基础信息">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="user" title={<span><Icon type="user" /><span>用户管理</span></span>}>
          <Menu.Item key="browse" datamenu="用户管理" dataitem="浏览用户">浏览用户</Menu.Item>
          <Menu.Item key="6" datamenu="用户管理" dataitem="批量处理">批量处理</Menu.Item>
          <Menu.Item key="addUser" datamenu="用户管理" dataitem="添加用户">添加用户</Menu.Item>
          <Menu.Item key="8" datamenu="用户管理" dataitem="上传用户">上传用户</Menu.Item>
        </SubMenu>
        <SubMenu key="auth" title={<span><Icon type="safety" /><span>权限管理</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

BackMenu.propTypes = {
  menuBackgroundColor : React.PropTypes.string,
  handleCurrentMenuItem : React.PropTypes.func.isRequired,
}

BackMenu.defaultProps = defaultProps;
