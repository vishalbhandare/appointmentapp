import React from 'react';
import moment from 'moment';
import {
    Link
  } from "react-router-dom";
  import allService from './../../Services/application';
class EventListing extends React.Component {
    constructor (props) {
        super(props)
        this.state = {tab: 0, eventListItems: []}
    }
    changeTab (tabposition) {
        this.setState({tab: tabposition},() =>{
            this.loadEventList()
        })
    }

    componentDidMount () {
        this.loadEventList()
    }

    loadEventList () {
        allService.getAllEvents({type: this.state.tab}).then((response) => {
            console.log(response)
            this.setState({eventListItems: response.data})
         }).catch((err) => {
            console.log(err)
         })
    }

    getDateTimeInfo (eventinfo) {
        moment.locale();
        let mInstance = moment(eventinfo.scheduled_at)
        let startTime = mInstance.format('HH:mm a')
        let endTime = mInstance.add(eventinfo.duration, 'minutes').format('HH:mm a')
        return `${startTime} - ${endTime}`
    }

    handleNewCreate() {
        this.props.history.push(`/event`)
    }

    render () {
        let eventListItems = this.state.eventListItems
        return (
            <section className="section">
            <div className="container">
                <div className="box is-paddingless">
                    <div className="tabs is-medium is-marginless">
                        <ul>
                          <li className={this.state.tab == 0 ? 'is-active' : ''}>
                              <Link to='/' onClick={() => this.changeTab(0)}><span>Upcoming</span></Link>
                          </li>
                          <li className={this.state.tab == 1 ? 'is-active' : ''}>
                                <Link to='/' onClick={() => this.changeTab(1)}><span>Past</span></Link>
                          </li>
                        </ul>

                      </div>
                      <EventListItems eventListItems={eventListItems} getDateTimeInfo={this.getDateTimeInfo.bind(this)}/>
                        
                    </div>
                </div>
           </section>
        )
    }
}
export default EventListing;


function EventListItems (props) {
    let sortedlist = {}
    props.eventListItems.forEach(element => {
        let dateStr = moment(element.scheduled_at).format('YYYY-MM-DD')
        if (!sortedlist[dateStr]) {
            sortedlist[dateStr] = [];
        }
        sortedlist[dateStr].push(element)
    });
    if (Object.keys(sortedlist).length <= 0) {
        return (
            <section class="section">    
                <div className="has-text-centered">Hurry!!! You dont have any Scheduled meet.</div>
            </section>
        )
    }

    let getDateFormatted = (date) => {
        let mInstance = moment(date)
        return mInstance.format('dddd, MMMM Do YYYY')
    } 
    let eventDateWiseList = Object.keys(sortedlist).map((date) => {

        let listItems = sortedlist[date].map((eventItem) => {
             return  (
                <EventItemComponent key={'datewise' + eventItem.id} eventItem={eventItem} getDateTimeInfo={props.getDateTimeInfo} {...props} />
             )  
        })

        return (
                <div  key={'event' + date}>
                <div className="box is-marginless has-background-white-bis">
                    {getDateFormatted(date)}
                </div>
                {listItems}
                </div>
        )
    })
    return (
        <div>{eventDateWiseList}</div>
    )
}

function EventItemComponent (props) {
    let eventItem = props.eventItem
    let timeStr = props.getDateTimeInfo(eventItem)
    return (
        <div className="box is-marginless">
            <div className="columns">
                <div className="column is-one-fifth">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-one-fifth">
                                <span className="icon has-text-info">
                                    <i className="fas fa-circle"></i>
                                </span> 
                            </div>
                            <div className="column">
                                {timeStr}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="container">
                        <p className='has-text-weight-bold'>{eventItem.first_name + ' ' + eventItem.last_name}</p>
                        <p className='is-size-7'>Event Type: <b>{eventItem.eventype.name}</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}