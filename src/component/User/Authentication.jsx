import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './Login';
import Registration from './Registration';
import ResetPassword from './ResetPassword';
import {userContext} from './../../context/user';

class Authentication extends React.Component {
  constructor (props) {
      super(props)
  } 
  componentDidMount () {
    console.log('componentDidMount', this.props.loggedInstatus)
    if (this.props.loggedInstatus) {
      this.props.history.push(`/`)
    }
  }
  
  render() {
   return (
   <Router>
    <div>
    <div className="tabs has-text-left is-boxed is-medium">
        <ul>
            <Route path="/register">
              <li >
                  <Link to="/login">login</Link>
              </li>
              <li  className="is-active">
                  <Link to="/register">Register</Link>
              </li>
            </Route>  
            <Route path="/login">  
              <li  className="is-active">
                  <Link to="/login">login</Link>
              </li>
              <li >
                  <Link to="/register">Register</Link>
              </li>
            </Route>
        </ul>
    </div> 
    <div className="section">
        <Route path="/register">
          <userContext.Consumer>
            {(setStatus) => { return (<Registration value={setStatus} {...this.props}/>) }   }
          </userContext.Consumer>   
        </Route>  
        <Route path="/login"> 
        <userContext.Consumer>
            {(setStatus) => { return (<Login value={setStatus} {...this.props}/>) }   }
        </userContext.Consumer> 
        </Route> 
        <Route path="/resetpassword">
            <ResetPassword  {...this.props}/>
        </Route>
    </div>
    </div> 
    </Router>
  );
  }
}

export default Authentication;