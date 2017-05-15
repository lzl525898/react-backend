import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Button
}from 'antd';
export default class UploadUserCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: true
    };
  };
  render(){
    return(
      <div>
        <div style={{fontSize:'24px'}}>上传用户</div>
        <div style={{ marginTop: "5px"}}>
          <a href="#" style={{ textDecoration: "none", fontSize: "18px" }}
            onClick={()=>{
              this.setState({
                isShow:!this.state.isShow
              });
            }}>
            <Icon type={ this.state.isShow ? 'caret-down' : 'caret-right' } style={{ fontSize: "6px"}}/>
            &nbsp;&nbsp;上传
          </a>
        </div>
        <Row>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>
          文件
          </span></Col>
          <Col span={21}>
            <div>
              123123
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>
          CSV分隔符
          </span></Col>
          <Col span={21}>
            <div>
              123123
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={2} style={{ height: "20px", lineHeight: "20px", marginTop: "3px" }}><span>
          编码
          </span></Col>
          <Col span={21}>
            <div>
              123123
            </div>
          </Col>
        </Row>
        <div style={{ borderBottom: "1px solid #cecece", marginTop: 5}}></div>
        <Row>
          <Col span={3}></Col>
          <Col span={21}>
            <div style={{marginTop:5}}>
              <Button type='primary'>上传用户</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
