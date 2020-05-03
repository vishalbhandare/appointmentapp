import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import allService from './../../Services/application';
class EventTypeCreate extends React.Component {
  constructor (props) {
      super(props)
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
        element: message => <p className="help is-danger">{message}</p>
      });
      this.state = {name: '', duration: '', id: ''}
      this.durationList = ['15', '30', '45', '60']
  }
  goBack () {
      this.props.history.goBack()
  }
  setInputName(e) {
      this.setState({name: e.target.value})
  }
  componentDidMount () {
      let pathArr = this.props.location.pathname.split(/[\s/]+/)

      if (pathArr.length > 2) {
        let typeId = pathArr[pathArr.length - 1]
        console.log('Edit Mode call for', pathArr[pathArr.length - 1])
        // Call Service here
        allService.getEventType(typeId).then((response)=>{
            let item = response.data
            this.setState({name: item.name, duration: item.duration_min, id: typeId})
        })
      }
  }
  handleUpdate (cb) {
      // Call Update Service
      allService.updateEventType(this.state.id, {name: this.state.name, duration_min: this.state.duration}).then((response) => {
        cb()
     }).catch((err) => {
        console.log(err)
     })
  }

  handleNewCreate (cb) {
      // Call Create Service
      allService.createNewEventType({name: this.state.name, duration_min: this.state.duration}).then((response) => {
        cb()
     }).catch((err) => {
        console.log(err)
     })
  }

  submitForm () {
      console.log('form submitted')
      if (this.validator.allValid()) {
          console.log('All success')
          let cb = () => {
              this.props.history.push({
                pathname: '/',
                search: '?tab=0',
                state: { detail: {'text': 'wonderful'} }
              })
          }
          /// Need to call service here
          this.state.id ? this.handleUpdate(cb) : this.handleNewCreate(cb)
      } else {
        console.log(this.validator.showMessages());
        this.forceUpdate();
      }
  }
  setDuration (duration) {
      // console.log(duration.target, duration.target.value, 'setting')
      this.setState({duration: duration.target.value})
  }
  getDurationButtonClass (duration) {
      let className = 'button'
      className += this.state.duration == duration ? ' is-selected is-success' : ''
      return className
  }
  render () {
    let item
    return (
      <div className="section is-paddingless">
      <div className="column">
         <button className="button is-medium" onClick={() => { this.goBack() }}>
             <span className="icon is-medium">
               <i className="fas fa-chevron-left"></i>
             </span>
             <span>Back</span>
           </button>
     </div>
     <div className="columns">
         <div className="column  has-text-centered is-size-3">
             Add Event Type
         </div>
      </div>
      <div className="box">
         <div className="container">
             <div className="field">
                 <label className="label">Event Type Name</label>
                 <div className="control">
                    <input className="input" type="text" placeholder="Text input" value={this.state.name} onChange={this.setInputName.bind(this)}/>
                    {this.validator.message('name', this.state.name, 'required|alpha')}
                 </div>
              </div>
              <div className="field">
                 <label className="label">Duration</label>
                 <div className="control">
                     <nav className="pagination" role="navigation" aria-label="pagination">
                         <DurationComponent durationlist={this.durationList} handleOnlick={this.setDuration.bind(this)} getButtonClass={this.getDurationButtonClass.bind(this)}/>
                         <br/>
                         {this.validator.message('duration', this.state.duration, 'required')}
                       </nav>
                 </div>
              </div>
              <div className="column has-text-centered">
                  <button className="button is-medium is-link" onClick={this.submitForm.bind(this)}>
                     <span>Save</span>
                   </button>
              </div>
         </div>
      </div>
      </div>
  );
  }
}
export default EventTypeCreate;

function DurationComponent (props) {
  const durationItems = props.durationlist.map((number)=><button className={props.getButtonClass(number)} key={number} onClick={props.handleOnlick}  value={number}>{number} min
      </button>
  )
  return (
    <div className="buttons">
      {durationItems}
    </div>
  )
}