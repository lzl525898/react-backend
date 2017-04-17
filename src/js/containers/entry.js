import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import BackStage from '../components/back-stage';
import BackLogin from '../components/back-login';

const defaultProps = {
    height : "100%",
    background : "#ffffff"
}

export default class Entry extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 0,
      userName: "",
      isLogin: false
    };
  };
  componentWillMount(){
    if (localStorage.userId) {
      this.setState({
        userId: localStorage.userId,
        userName: localStorage.userName,
        isLogin: true
      });
    }
  };
  checkUserLogin(){

  };
  render(){
    return(
      <Router>
        <div style={{ height:this.props.height, backgroundColor:this.props.background }}>
            <Route exact path="/" component={ BackLogin }/>
            <Route path="/stage" component={ BackStage }/>
        </div>
      </Router>
    )
  }
}

Entry.propTypes = {
  height:React.PropTypes.string,
  background:React.PropTypes.string
}

Entry.defaultProps = defaultProps;
