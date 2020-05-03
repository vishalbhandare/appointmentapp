import React from 'react';
import EventTypeCreate from './EventTypeCreate';
import EventCreate from './EventCreate';
export default function EventDashboard() {
    return (
      <div> 
      <div className="section">
          <EventTypeCreate />
          <EventCreate />
      </div>
      </div> 
    );
  }