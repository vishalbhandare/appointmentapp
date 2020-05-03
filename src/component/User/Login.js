import React, { Component } from 'react';
import allService from './../../Services/application';
import SimpleReactValidator from 'simple-react-validator';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect
 } from "react-router-dom";
class Login extends Component {
   constructor (props) {
      super(props)
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
        element: message => <p className="help is-danger">{message}</p>
      });
      this.state = {email: '', password: '', isLoggedIn: false, redirectToTest: false, validationMessage: ''}
      
   }
   handleValueChange (inputname, e) {
      let values = Object.assign({}, this.state)
      values[inputname] = e.target.value
      this.setState(values)
   }
   
   redirectTohome () {
      this.props.history.push(`/`)
   }
   redirectToForgetPassword (e) {
       e.preventDefault()
      this.props.history.push(`/resetpassword`)
   }
   formSubmit () {
      this.setState({validationMessage: ''})
      if (this.validator.allValid()) {
            if (!this.validator.check(this.state.email, 'email')){
               this.setState({validationMessage: 'Enter correct email address'})
               return
            }
            allService.loginUser({
               email: this.state.email,
               password: this.state.password}
            ).then((response) => {
               this.props.value.setStatus(true, response.data)
               this.redirectTohome()
            }).catch((err) => {
               this.setState({validationMessage: 'Invalid Login credentials'})
            })

      } else {
         console.log(this.validator.showMessages());
         this.forceUpdate();
       }
   }
   render () {
      const isLoggedIn = this.state.isLoggedIn
      return (
         <div className="columns" id="login">
        <div className="column is-4 is-offset-4">
         <div className="field">
             <label className="label">Email</label>
             <div className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email input" value={this.state.email} onChange={this.handleValueChange.bind(this, 'email')}/>
                
                <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                <i className="fa fa-warning"></i>
                </span>
             </div>
             {this.validator.message('email', this.state.email, 'required')}
          </div>
           <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                 <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.handleValueChange.bind(this, 'password')}/>
                 {this.validator.message('password', this.state.password, 'required')}
                 <span className="icon is-small is-left">
                     <i className="fas fa-key"></i>
                   </span>
              </div>
           </div>
           { this.state.validationMessage ? <ErrorModel message={this.state.validationMessage} /> : null }
           <div className="field is-grouped">
              <div className="control">
                 <button className="button is-link" onClick = {this.formSubmit.bind(this)}>Login</button>
              </div>
           </div>
           <div>
               <div className="columns">
                <div className="column has-text-left">
                </div>
                <div className="column has-text-right">
                <Link to='/resetpassword' >Forget Password?</Link>
                </div>
              </div>
           </div>
        </div>
     </div>
      )
   }
}
export default Login;
function ErrorModel (props) {
   return (
     <div className="notification is-danger">
       {props.message}
     </div>
   )
 }