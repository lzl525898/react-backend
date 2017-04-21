import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import BackStage from '../components/back-stage';
import BackLogin from '../components/back-login';

const history = createHistory({
  initialEntries: [ '/' ]
});

const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
});

const defaultProps = {
    height : "100%",
    background : "#ffffff"
}

export default class Entry extends Component {
  constructor(props){
    super(props);
  };
  componentWillMount(){
    if ( localStorage.userInfo ) {
      if ( JSON.parse(localStorage.userInfo).isLogin ) {
        history.push('/stage');
      } else {
        history.push('/login');
      }
    } else {
      history.push('/login');
    }
  };
  render(){
    return(
      <Router history={ history }>
        <div style={{ height:this.props.height, backgroundColor:this.props.background }}>
            <Route path="/" render={()=>(<div></div>)}/>
            <Route path="/login" component={ BackLogin }/>
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
