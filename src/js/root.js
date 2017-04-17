import React, { Component } from "react";
import ReactDOM from "react-dom";

import EntryContainer from './containers/entry';

import 'antd/dist/antd.css';

export default class Root extends Component {
  componentWillMount(){
    document.title = 'react-backend';
  };
  render(){
    return(
      <EntryContainer height={"100%"}/>
    )
  }
}

ReactDOM.render(<Root/>,document.body);
