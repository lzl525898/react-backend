import React, { Component } from 'react';

export default class BackContentUser extends Component {
  render(){
    const contents = ( selectKey )=>{
      if ( "addUser"==selectKey ) {
        return <div>User Content selectKey</div>
      } else {
        return <div>Content</div>
      }
    };
    return(
      <div>
      { contents( this.props.currentSelectMenuItem ) }</div>
    )
  }
}

BackContentUser.propTypes = {
    currentSelectMenuItem : React.PropTypes.string.isRequired,
};
