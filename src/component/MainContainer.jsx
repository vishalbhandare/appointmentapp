import React from 'react';
import Authentication from './User/Authentication';
import EventDashboard from './User/EventDashboard';
import EventCreate from './User/EventCreate';
import EventTypeCreate from './User/EventTypeCreate';

import {userContext} from './../context/user';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
class MainContainer extends React.Component{
  constructor (props) {
      super(props)
      console.log(this.props.loggedInstatus)
  } 
  componentDidMount () {
    console.log('componentDidMount', 'MainContainer')
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', 'MainContainer', prevProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return true
  }
   
  componentDidCatch(error, info) {
    console.log(error, 'MainContainer')
  }
  render () {
    return (
      <Router>
        <Switch>
          <PrivateRoute path='/'  exact = {true} component={EventDashboard} loggedInstatus={this.props.loggedInstatus}/>
          <Route path='/event'  component={EventCreate}/> 
          <PrivateRoute path='/eventtype'  component={EventTypeCreate} loggedInstatus={this.props.loggedInstatus}/>
          <Route path='/login'  render={ props => <Authentication {...props} loggedInstatus={this.props.loggedInstatus}/>}/> 
          <Route path='/register'  render={ props => <Authentication {...props} loggedInstatus={this.props.loggedInstatus} />}/>
          <Route path='/resetpassword'  render={ props => <Authentication {...props} loggedInstatus={this.props.loggedInstatus}/>}/> 
          <Route component={NoMatch} />
        </Switch>  
      </Router> 
    );
  }  
}
export default MainContainer;

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

//Private router function
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => rest.loggedInstatus === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}
