import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class Root extends Component {
  componentWillMount(){
    document.title = 'react-backend';
  };
  render(){
    return(
      <div>123123</div>
    )
  }
}

ReactDOM.render(<Root/>,document.body);
