import React from 'react';
import allService from './../../Services/application';
class EventTypeListing extends React.Component {
    constructor (props) {
        super(props)
        this.state = {eventTypeList: [], scheduleUrl: ''}
    }
    handleNewCreate() {
        this.props.history.push(`/eventtype`)
    }
    redirectToEditScree (item) {
        this.props.history.push(`/eventtype/${item.id}`)
    }
    setScheduleURL () {
        let userDetail = JSON.parse(localStorage.getItem('userDetail'))
        this.setState({scheduleUrl: window.location.origin + '/event/' + userDetail.schedule_code});
    }
    componentDidMount () {
        this.setScheduleURL()
        allService.getAllEventTypes().then((response) => {
            this.setState({eventTypeList: response.data});
         }).catch((err) => {
            console.log(err)
         })
    }
    render () {
        let EventTypeListingItemsArray = this.state.eventTypeList
        return (
            <section className="section" >
            <div className="container">
                <div className="columns">
                    <div className="column has-text-left">
                      My Link<br/>  
                      <a target="_blank" href={this.state.scheduleUrl} className="has-text-link">{this.state.scheduleUrl}</a>
                    </div>
                    <div className="column has-text-right">
                        <button className="button is-info" onClick={()=> {this.handleNewCreate()}}>New Event Type</button>
                    </div>
                  </div>
                  <hr/>
                  <section className="section">
                    <EventTypeListingItems EventTypeListingItems={EventTypeListingItemsArray} redirectToEditScree={this.redirectToEditScree.bind(this)}/>
                  </section>
            </div>
          </section>  
        )
    }
}
export default  EventTypeListing;

function EventTypeListingItems (props) {
    let newlist = []
    let results = JSON.parse(JSON.stringify(props.EventTypeListingItems))
    while (results.length) {
        newlist.push(results.splice(0, 4))
    }
    if (newlist.length <= 0) {
        return (
            <div className="has-text-centered">
                No Event Type configured here. Please add Event Type
             </div>
        )
    }
    let newListItems = newlist.map((itemList, position) => {
        
        let ListofItems = itemList.map((item) =>{
            return (
                <div className="column" key={'itemeventtype' + item.id}>
                <div className="box">
            <p className='has-text-weight-bold'>{item.name}</p>
                    <p className='is-size-7'>{item.duration_min} min duration</p>
                    <hr/>
                    <div className="has-text-left">
                        <button className="button " onClick={() => {props.redirectToEditScree(item)}}>Edit</button>
                    </div>
                </div>
                </div>
            )
        })
        return (
            <div className="columns"  key={'superitemeventtype' + position}>
                {ListofItems}
            </div>
        )
    })
    return (
        <div>
            {newListItems}
        </div>
    )
}