import React from "react";
import "../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import moment from "moment";

export default class NewEventPage extends React.Component {
  state = {
    projects: [],
    image: ""
  };

    state = {
        projects: [],
        image: ''
      };
  
      componentDidMount() {
        axios.get('https://api.shutterstock.com/v2/images/search?query=community', {
          auth: {
            username: '0BQG2MOeAYW71gyAa9eqmSqyoqpKSG5L',
            password: 'R5pkYG1gX6hSGBTi'
          }
        }).then(({ data }) => {
          console.log(data)
          console.log(data.data.length)
          var rndm = Math.floor(Math.random() * (data.data.length-1)) + 1 
          console.log(rndm)
          this.setState({
            ...this.state,
            image: data.data[rndm].assets.preview.url
          })
        })
      }

    constructor(props) {
        super(props);
        this.state = {
            eventName: '' || undefined,
            date: moment().format().substring(0, 10) || undefined,
            startTime: moment().format('LT') || undefined,
            endTime: moment().format('LT') || undefined,
            typeOfWork: '' || undefined,
            quorum: '' || undefined,
        };
    console.log(this.state.date);
        this.handleEventNameChange = this.handleEventNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleTypeOfWorkChange = this.handleTypeOfWorkChange.bind(this);
        this.handleQuorumChange = this.handleQuorumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleEventNameChange(event) {
        console.log(event.target.value)
        this.setState(
            {...this.state, eventName: event.target.value});
      }
    handleDateChange(event) {
      this.setState(
          {...this.state, date: event.target.value});
      }
    handleStartTimeChange(event) {
      this.setState(
          {...this.state, startTime:  event.target.value});
      }
    handleEndTimeChange(event) {
      this.setState(
          {...this.state, endTime: event.target.value});
      }
    handleTypeOfWorkChange(event) {
      this.setState(
          {...this.state, typeOfWork: event.target.value});
      }
    handleQuorumChange(event) {
        this.setState(
            {...this.state, quorum: event.target.value});
        }
      
    
    
    handleSubmit(event) {
      
      event.preventDefault();
      const body = this.state;
      
      axios.post('http://localhost:3001/community', body).then(() => {
        alert('Your event has been succesfully added!')
      });
      this.props.history.push('/');
      
      
    //   POST TO WRITE NEW PROJECT IN DB
      }
    
      render() {
        return (
            <div className="App">
                <h3>CREATE A NEW EVENT</h3>
                {this.state.image && <img src={this.state.image} />}
                {/* Make form to create new event */}
                {/* eventName, startTime, endTime, type */}
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input type="text" value={this.state.eventName} onChange={e => this.handleEventNameChange(e)} />
                    </label><br></br>
                    <label>
                        Date: 
                        <input type="text" value={this.state.date} onChange={this.handleDateChange} />
                    </label><br></br>
                    <label>
                        Start Time: 
                        <input type="text" value={this.state.startTime} onChange={this.handleStartTimeChange} pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"/>
                    </label><br></br>
                    <label>
                        End Time: 
                        <input type="text" value={this.state.endTime} onChange={this.handleEndTimeChange} pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"/>
                    </label><br></br>
                    <label>
                        Type: 
                        <input type="text" value={this.state.typeOfWork} onChange={this.handleTypeOfWorkChange} />
                    </label><br></br>
                    <label>
                        Number of Volunteers Needed: 
                        <input type="number" value={this.state.quorum} onChange={this.handleQuorumChange} pattern="[0-9]*" inputmode="numeric"/>
                    </label><br></br>
                    <Button type="submit" value="Submit" variant="contained" color="primary">
                SUBMIT
                </Button>
                </form>
            </div>
        )
}
}