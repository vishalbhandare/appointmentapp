import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import allService from './../../Services/application';

class Registration extends React.Component {
   constructor (props) {
      super(props)
      this.state = {email: '', fullname: '', password: '', confirmpassword: '', confirmpassworderror: ''}
      this.validator = new SimpleReactValidator({
         autoForceUpdate: this,
         element: message => <p className="help is-danger">{message}</p>
       });
   }

   handleValueChange (inputname, e) {
      let values = Object.assign({}, this.state)
      values[inputname] = e.target.value
      this.setState(values)
      if (inputname == 'confirmpassword') {
         this.setState({confirmpassworderror: ''})
      }
   }
   
   redirectTohome () {
      this.props.history.push(`/`)
   }

   formSubmit () {
      this.setState({validationMessage: ''})
      if (this.validator.allValid()) {
            if (this.state.password !== this.state.confirmpassword) {
               this.setState({confirmpassworderror: 'Enter correct confirm password'})
               return
            }
            allService.registerUser({
               email: this.state.email,
               password: this.state.password,
               name: this.state.fullname,
               c_password: this.state.confirmpassword
            }).then((response) => {
               this.props.value.setStatus(true, response.data)
               this.redirectTohome()
            }).catch((err) => {
               this.setState({validationMessage: 'Invalid details entered'})
               console.log(err)
            })

      } else {
         console.log(this.validator.showMessages());
         this.forceUpdate();
       }
   }
   render () {
      return (
         <div className="columns" id="registration">
                <div className="column is-4 is-offset-4">
                 <div className="field">
                     <label className="label">Email</label>
                     <div className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email input" value={this.state.email} onChange={this.handleValueChange.bind(this, 'email')} name="email"/>
                        <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fa"></i>
                        </span>
                     </div>
                    {this.validator.message('email', this.state.email, 'required|email')}
                  </div>
                   <div className="field">
                      <label className="label">Full Name</label>
                      <div className="control">
                         <input className="input" type="text" placeholder="Text input" name="fullname" value={this.state.fullname} onChange={this.handleValueChange.bind(this, 'fullname')}/>
                      </div>
                      {this.validator.message('fullname', this.state.fullname, 'required')}
                   </div>
                   <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left has-icons-right">
                         <input className="input" type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleValueChange.bind(this, 'password')}/>
                         <span className="icon is-small is-left">
                             <i className="fas fa-key"></i>
                           </span>
                      </div>
                      {this.validator.message('password', this.state.fullname, 'required')}
                   </div>
                  
                   <div className="field">
                     <label className="label">Re-Type Password</label>
                     <div className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="Password"  name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleValueChange.bind(this, 'confirmpassword')}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                     </div>
                     {this.validator.message('confirmpassword', this.state.confirmpassword, 'required')}
                     {this.state.confirmpassworderror ? <p className="help is-danger">{this.state.confirmpassworderror}</p> : ''}
                   </div>
     
                   <div className="field is-grouped">
                      <div className="control">
                         <button className="button is-link" onClick = {this.formSubmit.bind(this)}>Submit</button>
                      </div>
                   </div>
                </div>
             </div>
     )
   }
}
export default Registration;