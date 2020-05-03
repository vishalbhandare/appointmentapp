import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import allService from './../../Services/application';
class PasswordChangeForm extends React.Component{
    constructor (props) {
        super(props)
        this.validator = new SimpleReactValidator({
          autoForceUpdate: this,
          element: message => <p className="help is-danger">{message}</p>
        });
        this.state = {email: props.tokenDetail.email, password: '', confirm_password: '', token: props.tokenDetail.token, validationMessage: '', showSuccessMessage: false}
        
     }
   redirectToLogin () {
        this.props.history.push(`/login`)
   }  
   handleValueChange (inputname, e) {
        let values = Object.assign({}, this.state)
        values[inputname] = e.target.value
        this.setState(values)
    }
     formSubmit () {
        this.setState({validationMessage: ''})
        if (this.validator.allValid()) {
              if (!this.validator.check(this.state.email, 'email')){
                 this.setState({validationMessage: 'Enter correct email address'})
                 return
              }
              allService.resetPasswordWithToken({
                 email: this.state.email,
                 password: this.state.password,
                 confirm_password: this.state.confirm_password,
                 token: this.state.token
              }).then((response) => {
                 this.setState({showSuccessMessage: true})
              }).catch((err) => {
                 this.setState({validationMessage: 'Invalid Login credentials'})
              })
  
        } else {
            this.validator.showMessages();
           this.forceUpdate();
         }
     }
     render () {
        if(this.state.showSuccessMessage) {
            return (
                <PasswordChangeSuccess {...this.props}/>
            )
        }
        return (
           <div className="columns" id="login">
          <div className="column is-4 is-offset-4">
           <div className="field">
               <label className="label">Email</label>
               <div className="control has-icons-left has-icons-right">
                  <input className="input" type="email" placeholder="Email input" value={this.state.email} />
                  
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
             <div className="field">
                <label className="label">Retype Password</label>
                <div className="control has-icons-left has-icons-right">
                   <input className="input" type="password" placeholder="Password" value={this.state.confirm_password} onChange={this.handleValueChange.bind(this, 'confirm_password')}/>
                   {this.validator.message('confirm_password', this.state.confirm_password, 'required')}
                   <span className="icon is-small is-left">
                       <i className="fas fa-key"></i>
                     </span>
                </div>
             </div>
             { this.state.validationMessage ? <ErrorModel message={this.state.validationMessage} /> : null }
             <div className="field is-grouped">
                <div className="control">
                   <button className="button is-link" onClick = {this.formSubmit.bind(this)}>Change Password</button>
                </div>
             </div>
          </div>
       </div>
        )
     }
}
export default PasswordChangeForm;
function ErrorModel (props) {
    return (
      <div className="notification is-danger">
        {props.message}
      </div>
    )
  }
function PasswordChangeSuccess (props) {
    return (
       <div>
       <div className="columns" id="login">
          <div className="column is-4 is-offset-4">
             <p>Your Password has changes successfully. Please login.</p>
          </div>
       </div>
       <div className="columns">
          <div className="column has-text-centered">
            <button className="button is-info" onClick={() => {props.history.push(`/`)}}>Login</button>
          </div>
       </div> 
       </div>    
    )
} 