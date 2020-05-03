import React from 'react';import {
  Link
} from "react-router-dom";
class Navbar extends React.Component {
    constructor (props) {
      super(props)
    }

    render () {
      let userDetails = this.props.value.getStatus
      console.log(userDetails, 'userDetails')
      return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>
    
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {userDetails.detail ?  <LoginOption {...this.props}/> :  null}
      
    </nav>
      );
    }
}
export default  Navbar;

function LoginOption (props) {
  let userDetails = props.value.getStatus
  let setUserStatus = props.value.setStatus
    return (
        <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
              <a className="">
                <strong>Hi {userDetails.detail.name}</strong>
              </a>
            </div>
            <div className="navbar-item">
              <Link to='/' onClick={() => setUserStatus(false)}><strong>Logout</strong></Link>
            </div>
          </div>
        </div>
    )
}