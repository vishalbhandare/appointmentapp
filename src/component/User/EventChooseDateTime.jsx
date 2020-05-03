import React from 'react';
import DatePicker from 'react-datepicker';

class EventChooseDateTime extends React.Component {
  constructor (props) {
      super(props)
      this.state = {date: new Date(), showerror: false}
  }
  setMeetDate (date) {
     this.setState({date: new Date(date)})
  }
  closeModal () {
    this.setState({showerror: false})
  }
  saveContinue () {
    let selectedTime = new Date(this.state.date).getTime()
    let currentTime = new Date().getTime()
    let diffsecond = Math.floor((selectedTime - currentTime)/ 1000)
    if (diffsecond < 60) {
      this.setState({showerror: true})
      return
    }
    this.setState({showerror: false})
    this.props.updateEventDetail('eventDateTime', this.state.date)
    this.props.updateEventDetail('step', 2)
  }
  render () {
      let eventinfo = this.props.getEventInformtion()
      let startDate = new Date()  
      return (
        <div className="section">
        <div className="tile is-ancestor">
            <div className="tile box">
              <p>
      <span className="is-size-6">{eventinfo.name}</span> <br/>
      <span className="is-size-3 has-text-weight-bold">{eventinfo.eventType.name}</span><br/>
             <span>
                <i className="fas fa-clock" aria-hidden="true"></i>
                <span className="paddingleft">{eventinfo.eventType.duration_min} min</span>
            </span>  </p>
            </div>
            <div className="tile box">
            <DatePicker
              selected={this.state.date}
              onChange={date => this.setMeetDate(date)}
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              inline
            />
            </div>
          </div>
          { this.state.showerror ? <ErrorModel /> : null }
          <div className="buttons">
            <button className="button is-info" onClick={() => {this.saveContinue() }}>Save and continue</button>
          </div>
    </div>
      )
  }
}
export default EventChooseDateTime;

function ErrorModel (props) {
  return (
    <div className="notification is-danger">
      Please select correct datetime for event
    </div>
  )
}