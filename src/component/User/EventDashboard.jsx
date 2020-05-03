import React from 'react';
import EventTypeListing from './EventTypeListing';
import EventListing from './EventListing';
import {
  Link
} from "react-router-dom";
class EventDashboard extends React.Component {
  constructor (props) {
      super(props)
      this.state = {tab: 1};
  } 

  changeTab (tabtype) {
    this.setState({tab: tabtype});
  }

  componentDidMount () {
      let tab = new URLSearchParams(this.props.location.search).get("tab")
      if (tab == '0' || tab == '1') {
          this.changeTab(tab)
      }
  }

  render () {
    return (
      <div>
      <div id="maintab" className="tabs has-text-left is-boxed is-medium removemargin">
          <ul>
            <li className={this.state.tab == 0? 'is-active' : ''}>
              <Link to='/' onClick={() => this.changeTab(0)}><span>Event Types</span></Link>
              </li>
              <li  className={this.state.tab == 1? 'is-active' : ''}>
              <Link to='/' onClick={() => this.changeTab(1)}><span>Scheduled Events</span></Link>
              </li>
              </ul>
      </div> 
      <div className="section is-paddingless">
         {this.state.tab == 1? <EventListing {...this.props}/> : <EventTypeListing {...this.props}/> } 
      </div>
      </div> 
    );
  }
}
export default EventDashboard