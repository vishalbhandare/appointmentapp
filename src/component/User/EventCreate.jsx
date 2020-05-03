import React from 'react';
import EventTypeSelect from './EventTypeSelect';
import EventChooseDateTime from './EventChooseDateTime';
import EventEnterDetails from './EventEnterDetails';
import EventCreateConfirmation from './EventCreateConfirmation';
import allService from './../../Services/application';
class EventCreate extends React.Component {
  constructor (props) {
      super(props)
      this.steps = [EventTypeSelect, EventChooseDateTime, EventEnterDetails, EventCreateConfirmation]
      this.state = {step: 0, eventType: {}, eventDateTime: {}, eventDetails: {}, name: ''}
  }

  setEventInformation(info, detail) {
      this.setState({[info]: detail})
  }

  getEventInformtion () {
      return this.state
  }

  goBack () {
      this.props.history.goBack()
  }

  render () {
      let CurrentStep = this.steps[this.state.step];
      return (
        <div> 
        <div className="column">
          <button className="button is-medium" onClick={() => { this.goBack() }}>
              <span className="icon is-medium">
                <i className="fas fa-chevron-left"></i>
              </span>
              <span>Back</span>
            </button>
      </div>
        <div className="section is-paddingless">
          <CurrentStep {...this.props} updateEventDetail = {this.setEventInformation.bind(this)} getEventInformtion= {this.getEventInformtion.bind(this)}/>
        </div>
        </div> 
      );
    }
}
export default EventCreate;