import React from 'react';
import allService from './../../Services/application';
class EventTypeSelect extends React.Component {
    constructor (props) {
        super(props);
        this.state = {eventTypeList: [], name: ''}
    }
    handleEventTypeSelect (eventType) {
        this.props.updateEventDetail('eventType', eventType)
        this.props.updateEventDetail('step', 1)
    }

    componentDidMount () {
        let scheduleCode = this.getScheduleCode()
        this.props.updateEventDetail('scheduleCode', scheduleCode)
        allService.getEventTypeByScheduleCode({scheduleCode: scheduleCode}).then((response) => {
            this.setState({eventTypeList: response.data.eventtypes, name: response.data.name})
            this.props.updateEventDetail('name', response.data.name)
        })
    }
  
    getScheduleCode () {
        let pathname = this.props.location.pathname
        let spltArr = pathname.split('/')
        return spltArr[spltArr.length-1] != 'event' ? spltArr[spltArr.length-1] : ''
    }
    
    render () {
        let eventTypeList = this.state.eventTypeList
        return (
            <div className="section">
                    <p className="has-text-centered">{this.state.name}</p>
                    <p className="has-text-centered">Welcome to my scheduling page. Please follow the instructions to add event to my calender</p>
             
              <EventTypeListingComponent  eventTypeList={eventTypeList} handleEventTypeSelect = {this.handleEventTypeSelect.bind(this)} />
            </div> 
        );
    }
}
export default EventTypeSelect;

function EventTypeListingComponent (props) {
    let eventTypeListItems = props.eventTypeList.map(element => {
        return (<li key={element.id} onClick={() => props.handleEventTypeSelect(element)}>
            <div className="box is-marginless">
                <div className="listItemdiv">
                    <div className="rightdiv">
                        <span className="icon">
                            <i className="fas fa-chevron-right"></i>
                        </span> 
                    </div>
                    <div className="leftdiv">
                        <span>
                            <i className="fas has-text-info fa-circle"></i>
                                <span className='paddingleft'>{element.name}</span>
                        </span> 
                        
                    </div>
                </div>
            </div>
        </li>
        )
    });
    return (
        <ul>
            {eventTypeListItems}
        </ul>    
    )
}