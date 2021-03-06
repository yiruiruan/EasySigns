import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import moment from "moment";

export default class VolunteerPage extends React.Component {
  state = {
    projects: [],
    image: ""
  };

  componentDidMount() {
    axios
      .get("https://api.shutterstock.com/v2/images/search?query=volunteer", {
        auth: {
          username: "0BQG2MOeAYW71gyAa9eqmSqyoqpKSG5L",
          password: "R5pkYG1gX6hSGBTi"
        }
      })
      .then(({ data }) => {
        console.log(data);
        console.log(data.data.length);
        var rndm = Math.floor(Math.random() * data.data.length) + 1;
        console.log(rndm);
        this.setState({
          ...this.state,
          image: data.data[rndm].assets.preview.url
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "" || undefined,
      date:
        moment()
          .format()
          .substring(0, 10) || undefined,
      startTime: moment().format("LT") || undefined,
      endTime: moment().format("LT") || undefined,
      type: "" || undefined,
      email: "" || undefined
    };
    console.log(this.state.date);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleNameChange(event) {
    console.log(event.target.value)
    this.setState(
        {...this.state, name: event.target.value});
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
handleTypeChange(event) {
  this.setState(
      {...this.state, type: event.target.value});
  }
handleEmailChange(event) {
    this.setState(
        {...this.state, email: event.target.value});
    }
  


handleSubmit(event) {
    event.preventDefault();
    const body = this.state;
    alert('Thank you for volunteering ' + this.state.name);
    axios.post('http://localhost:3001/volunteer', body).then(() => {
      alert('You will be assigned to a project shortly!')
    });
    
    // axios.post('http://localhost:3001/assignment', body).then(() => {
    //   alert('You\'ve been assigned!')
    // });
    this.props.history.push('/');
  // POST TO ENTER NEW VOLUNTEER IN DB
  }

  render() {
    return (
      <div className="App">
        <button>
          <img
            src="communihub_logo.png"
            alt="logo"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            onClick={this.goHomepage}
          />
        </button>
        {this.state.image && (
          <img src={this.state.image} style={{ borderRadius: 400 / 2 }} />
        )}
        <h3>VOLUNTEER APPLICATION</h3>
        {/* make form to create new volunteer */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.name}
              onChange={e => this.handleNameChange(e)}
            />
          </label>
          <br></br>
          <label>
            E-mail:
            <input
              type="text"
              value={this.state.quorum}
              onChange={this.handleEmailChange}
            />
          </label>
          <br></br>
          <label>
            Date Available:
            <input
              type="text"
              value={this.state.date}
              onChange={this.handleDateChange}
            />
          </label>
          <br></br>
          <label>
            Available Start Time:
            <input
              type="text"
              value={this.state.startTime}
              onChange={this.handleStartTimeChange}
            />
          </label>
          <br></br>
          <label>
            End Time:
            <input
              type="text"
              value={this.state.endTime}
              onChange={this.handleEndTimeChange}
            />
          </label>
          <br></br>
          <label>
            Type of work preference:
            <input
              type="text"
              value={this.state.type}
              onChange={this.handleTypeChange}
            />
          </label>
          <br></br>

          <Button
            type="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}
