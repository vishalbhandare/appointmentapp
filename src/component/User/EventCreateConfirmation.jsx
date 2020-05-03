import React from 'react';
import moment from 'moment';
class EventCreateConfirmation extends React.Component {

    constructor (props) {
        super(props)
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
    createAnotherEvent () {
        this.props.updateEventDetail('eventType', {})
        this.props.updateEventDetail('eventDetails', {})
        this.props.updateEventDetail('eventDateTime', {})
        this.props.updateEventDetail('step', 0)
    }

    render () {
        let eventinfo = this.props.getEventInformtion()
        let friendlyDatetxt = this.getDateTimeInfo(eventinfo)
        return (
            <div className="section  has-text-centered">
            <div className="container">
                <h1 className="title">Confirmed</h1>
                <h2 className="subtitle">
                  Your are scheduled with {eventinfo.name}.
                </h2>
                <hr/>
                <section className="has-text-left">
                    <span>
                        <i className="fas has-text-info fa-circle"></i>
                            <span  className="paddingleft">{eventinfo.eventType.name}</span>
                    </span> <br/>
                    <span>
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <span  className="paddingleft">{eventinfo.eventType.duration_min} min</span>
                    </span> <br/>
                    <span className="has-text-success">
                        <i className="fas fa-calendar" aria-hidden="true"></i>
                        <span  className="paddingleft">{friendlyDatetxt}</span>
                    </span> 
                </section> 
                <hr/>
                <section className="has-text-left has-text-info">
                    <span onClick={this.createAnotherEvent.bind(this)}>
                        <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        <span>Schedule another event</span>
                    </span>
                </section>
              </div>
        </div>  
        );
    }
}
export default  EventCreateConfirmation;