import React from 'react';
import NavBar from './component/Navbar';
import MainContainer from './component/MainContainer';
import {userContext} from './context/user';
import { Redirect } from "react-router-dom";
import ScriptTag from 'react-script-tag';

class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {userStatus: {loggedIn: false, detail: false}, isLoggedIn: false}
    }

    setUserStatus (status, userDetail) {
      this.setState({isLoggedIn: status, userStatus: {loggedIn: status, detail: userDetail}})
      status ? this.setLoginUser(userDetail) : this.makeUserLogout()
    }

    setLoginUser(userDetail) {
        localStorage.setItem('userDetail', JSON.stringify(userDetail))
    }

    makeUserLogout() {
        localStorage.removeItem('userDetail');
        localStorage.removeItem('tokenDetail');
    }

    componentDidMount () {
      // console.log('here')
      let userDetail = localStorage.getItem('userDetail')
      if (userDetail) {
        userDetail = JSON.parse(userDetail)
        this.setState({isLoggedIn: true, userStatus: {loggedIn: true, detail: userDetail}})
      }
    }
    getUserStatus () {
      return this.state.userStatus 
    } 
    componentDidUpdate(prevProps) {
      console.log('componentDidUpdate', 'APP', prevProps)
    }
    shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate', nextProps, nextState, 'APP')
      return true
    }
     
    componentDidCatch(error, info) {
      console.log(error, 'APP')
    }

    render () {
      const value = {
        setStatus: this.setUserStatus.bind(this),
        getStatus: this.getUserStatus()
      }
      return (
        <userContext.Provider value={value}>
            <FontAwesone />
            <section className="panel is-info">
              <NavBar value={value}/>
              <MainContainer  loggedInstatus = {this.state.isLoggedIn}/>
            </section>
        </userContext.Provider>
      );
    }
}
export default App
const FontAwesone = props => (
  <ScriptTag type="text/javascript" src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
)