import React, { Component } from 'react';

import { Table, Icon } from 'antd';

const columns = [
  { title: '头像', dataIndex: '', key: 'avatar', render: (text, record, index)=> {
    console.log('text');
    console.log(text);
    console.log('record');
    console.log(record);
    console.log('index=>'+index);
    var userName = null;
    if ( 0==index) {
      userName = 'admin';
    } else if ( 1==index ) {
      userName = 'liuyanming';
    } else if ( 2==index ) {
      userName = 'manguojing';
    } else {
      userName = 'test';
    }
    return <div style={{ width: 100, height: 50 }}>
              <img src="./src/images/admin-avatar.png" style={{ width:20, height: 20, marginLeft: 40 }}/>
            <div style={{lineHeight: "30px",textAlign: "center", fontSize: "14px"}}>{userName}</div>
           </div>;
  }, width: 100 },
  { title: '手机', dataIndex: 'phone', key: 'phone' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '上次访问', dataIndex: 'accesslog', key: 'accesslog' },
  { title: '操作', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
];

const data = [
  { key: 1, phone: '15046009860', type: '管理员', email: 'luckyforlei@163.com', accesslog: '2017-05-05 11:11', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 2, phone: '15521124651', type: '商户', email: 'liuyanming@163.com', accesslog: '2017-04-05 12:58', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 3, phone: '15131222212', type: '物业', email: 'manguojing@163.com', accesslog: '2017-03-18 16:18', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 4, phone: '15046009860', type: '管理员', email: 'luckyforlei@163.com', accesslog: '2017-05-05 11:11', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 5, phone: '15521124651', type: '商户', email: 'liuyanming@163.com', accesslog: '2017-04-05 12:58', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 6, phone: '15131222212', type: '物业', email: 'manguojing@163.com', accesslog: '2017-03-18 16:18', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 7, phone: '15046009860', type: '管理员', email: 'luckyforlei@163.com', accesslog: '2017-05-05 11:11', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 8, phone: '15521124651', type: '商户', email: 'liuyanming@163.com', accesslog: '2017-04-05 12:58', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 9, phone: '15131222212', type: '物业', email: 'manguojing@163.com', accesslog: '2017-03-18 16:18', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 10, phone: '15046009860', type: '管理员', email: 'luckyforlei@163.com', accesslog: '2017-05-05 11:11', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 11, phone: '15521124651', type: '商户', email: 'liuyanming@163.com', accesslog: '2017-04-05 12:58', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 12, phone: '15131222212', type: '物业', email: 'manguojing@163.com', accesslog: '2017-03-18 16:18', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 13, phone: '15046009860', type: '管理员', email: 'luckyforlei@163.com', accesslog: '2017-05-05 11:11', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 14, phone: '15521124651', type: '商户', email: 'liuyanming@163.com', accesslog: '2017-04-05 12:58', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 15, phone: '15131222212', type: '物业', email: 'manguojing@163.com', accesslog: '2017-03-18 16:18', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
];

export default class UserTables extends Component {
  render(){
    return(
      <Table
        bordered={true}
        columns={columns}
        expandedRowRender={record => <p>{record.description}</p>}
        dataSource={data}
      />
    )
  }
}
