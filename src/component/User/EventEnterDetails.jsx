import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
import allService from './../../Services/application';
class EventEnterDetails extends React.Component {
    constructor (props) {
        super(props)
        this.state = {firstname: '', lastname: '', email: ''}
        this.validator = new SimpleReactValidator({
          autoForceUpdate: this,
          element: message => <p className="help is-danger">{message}</p>
        });
    }
    createnewEvent (cb) {
        let eventinfo = this.props.getEventInformtion()
        let request = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, scheduled_at: moment(eventinfo.eventDateTime).format('YYYY-MM-DD HH:mm:ss'), event_type_id: eventinfo.eventType.id, scheduleCode: eventinfo.scheduleCode}
        allService.createNewEvent(request).then((response) => {
            cb()
         }).catch((err) => {
            console.log(err)
         })
    }
    submitForm () {
        if (this.validator.allValid()) {
            // Call Service to save data and show confirmation
            this.createnewEvent(() => {
                this.props.updateEventDetail('eventDetails', this.state)
                this.props.updateEventDetail('step', 3)
            })
        } else {
          console.log(this.validator.showMessages());
          this.forceUpdate();
        }
    }
    onChangeHandler (paramName, e) {
        this.setState({[paramName]: e.target.value})
    }
    getDateTimeInfo (eventinfo) {
        moment.locale();
        let mInstance = moment(eventinfo.eventDateTime)
        let postfix = mInstance.format('dddd, MMMM Do YYYY')
        let startTime = mInstance.format('HH:mm a')
        let endTime = mInstance.add(eventinfo.eventType.duration, 'minutes').format('HH:mm a')
        // return 11.30 pm - 12.00 pm, Thursday, April 23 2020
        return `${startTime} - ${endTime},  ${postfix}`
    }

    render () {
        let eventinfo = this.props.getEventInformtion()
        let friendlyDatetxt = this.getDateTimeInfo(eventinfo)
        return (
            <div className="section">
            <div className="tile is-ancestor">
                <div className="tile box">
                  <p>
                    <span className="is-size-6">John Doe</span> <br/>
        <span className="is-size-3 has-text-weight-bold">{eventinfo.eventType.name}</span><br/>
                    <span>
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <span  className="paddingleft">{eventinfo.eventType.duration_min} min</span>
                    </span> <br/>
                    <span className="has-text-success">
                        <i className="fas fa-calendar" aria-hidden="true"></i>
                        <span  className="paddingleft">{friendlyDatetxt}</span>
                    </span> 
                </p>
                </div>
                <div className="tile box">
                    <section className="section">
                        <div className="container">
                          <h1 className="title">Enter Details</h1>
                         <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">First Name</label>
                                        <div className="control">
                                           <input className="input" type="text" placeholder="Text input" name="firstname" value={this.state.firstname} onChange={this.onChangeHandler.bind(this, 'firstname')}/>
                                           {this.validator.message('firstname', this.state.firstname, 'required')}
                                        </div>
                                     </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Last Name</label>
                                        <div className="control">
                                           <input className="input" type="text" placeholder="Text input" name="lastname" value={this.state.lastname} onChange={this.onChangeHandler.bind(this, 'lastname')}/>
                                           {this.validator.message('lastname', this.state.lastname, 'required')}
                                        </div>
                                     </div>
                                </div>
                         </div>
                         <div className="columns">
                            <div className="column">
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left has-icons-right">
                                   <input className="input is-danger" type="email" placeholder="Email input" name="email" value={this.state.email} onChange={this.onChangeHandler.bind(this, 'email')}/>
                                   <span className="icon is-small is-left">
                                   <i className="fa fa-envelope"></i>
                                   </span>
                                   <span className="icon is-small is-right">
                                   <i className="fa fa-warning"></i>
                                   </span>
                                </div>
                                {this.validator.message('email', this.state.email, 'required|email')}
                             </div>
                             </div>
                         </div>
                         <div className="control">
                            <button className="button is-link" onClick={this.submitForm.bind(this)}>Schedule Event</button>
                         </div>
                        </div>
                      </section>
                </div>
              </div>
        </div>     
        );
    }
}
export default EventEnterDetails;