import React, { Component } from 'react';
import allService from './../../Services/application';
import SimpleReactValidator from 'simple-react-validator';
import PasswordChangeForm from './PasswordChangeForm';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect
 } from "react-router-dom";
class ResetPassword extends Component {
   constructor (props) {
      super(props)
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
        element: message => <p className="help is-danger">{message}</p>
      });
      this.state = {email: '', showThankyou: false, validationMessage: '', resetPassword: false, tokenDetail: {}}
      
   }

   handleValueChange (inputname, e) {
      let values = Object.assign({}, this.state)
      values[inputname] = e.target.value
      this.setState(values)
   }

   componentDidMount () {
      let token = new URLSearchParams(this.props.location.search).get("token")
      if (token) {
          this.verifyToken(token)
      }
   }

   verifyToken (token) {
      allService.verifyPasswordResetToken({
         token: token
      }).then((response) => {
         this.setState({resetPassword: true, tokenDetail: response.data})
      }).catch((err) => {
         this.setState({validationMessage: 'Invalid Login credentials'})
      })
    }

   formSubmit () {
      this.setState({validationMessage: ''})
      if (this.validator.allValid()) {
            if (!this.validator.check(this.state.email, 'email')){
               this.setState({validationMessage: 'Enter correct email address'})
               return
            }
            allService.createPasswordResetToken({
               email: this.state.email
            }).then((response) => {
               console.log(response)
               this.setState({showThankyou: true})
            }).catch((err) => {
               this.setState({validationMessage: 'Invalid Reset Password request'})
            })

      } else {
         this.validator.showMessages()
         this.forceUpdate();
       }
   }
   render () {
      if (this.state.resetPassword) {
         return (
            <PasswordChangeForm tokenDetail={this.state.tokenDetail} {...this.props}/>    
         )
      }
      if (this.state.showThankyou) {
         return (
            <PasswordResetRequestSuccess {...this.props}/>    
         )
      }
      return (
         <Router> 
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
           { this.state.validationMessage ? <ErrorModel message={this.state.validationMessage} /> : null }
           <div className="field is-grouped">
              <div className="control">
                 <button className="button is-link" onClick = {this.formSubmit.bind(this)}>Submit</button>
              </div>
           </div>
        </div>
     </div>
     </Router>
      )
   }
}
export default ResetPassword;
function ErrorModel (props) {
   return (
     <div className="notification is-danger">
       {props.message}
     </div>
   )
 }

 function PasswordResetRequestSuccess (props) {
   return (
      <div>
      <div className="columns" id="login">
         <div className="column is-4 is-offset-4">
            <p>Please check you email. We have e-mailed your password reset link!</p>
         </div>
      </div>
      <div className="columns">
         <div className="column has-text-centered">
         <  button className="button is-info" onClick={() => {props.history.push(`/`)}}>Go to Home</button>
         </div>
      </div> 
      </div>    
   )
 }