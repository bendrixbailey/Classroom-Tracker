import React from 'react';
import { Col, Container, Row, Form, Label, Input} from 'reactstrap';
import './App.css';
import Classbox from './Classbox/Classbox';
import ClassForm from './ClassForm/ClassForm';


class ClassroomPage extends React.Component {
  //This class represents the entire classroom page for
  //the Client-2 assignment
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      rooms: [
      ],
      numClasses: 0,
      tempNormal: 0,
      tempYellow: 0,
      tempMax: 0,
      tempBuilding: "",
      tempFloor: 0,
      tempName: 0,
      floorFilter: 0,
      buildingFilter: ""
    };

    this.createNewClass = this.createNewClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  componentDidMount(){
    //adds 4 sample rooms to start out
    this.fetchData();
  }

  createNewClass(){
    //creates a new classroom from temporary values
    const curImages = this.state.numClasses + 1
    const rooms = this.state.rooms;
    const newClass = [
      curImages, 
      this.state.tempNormal, 
      this.state.tempYellow, 
      this.state.tempMax, 
      this.state.tempBuilding, 
      this.state.tempFloor, 
      this.state.tempName,
      this.removeClass
    ];
    this.setState({
      rooms: rooms.concat([{room: newClass}]),
      numClasses: curImages
    });

    //below adds the class to the database
    fetch("/AddClass", {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        'normal': this.state.tempNormal,
        'yellow': this.state.tempYellow,
        'max': this.state.tempMax,
        'current': '0',
        'name': this.state.tempName,
        'floor': this.state.tempFloor,
        'building': this.state.tempBuilding
      })
    })
    .then(
      (response) => 
      {
        if (response.status === 200){
        }
        else{
            console.log("HTTP error:" + response.status + ":" +  response.statusText);
        }
      }
    )
    .catch((error) => 
      {console.log(error);} 
    )
  }

  removeClass(classNum){
    //this gives the ability to delete any class by clicking an x button at the top left of a classroom
    //allows users to completely delete all rooms
    console.log(classNum);
    if(classNum > -1){
      if(this.state.rooms.length === 1){
        const blankArray = [];
        this.setState({
          rooms: blankArray
        })
      }else{
        const newClassCount = this.state.numClasses - 1;
        this.state.rooms.splice(classNum-1, 1);
        this.setState({
          rooms: this.state.rooms,
          numClasses: newClassCount
        })
        console.log("spliced")
      }
    }
    //below removes the classroom from the database
    const class_to_remove = classNum - 1
    fetch("/Delete", {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        'id': class_to_remove,
      })
    })
    .then(
      (response) => 
      {
        if (response.status === 200){
        }
        else{
            console.log("HTTP error:" + response.status + ":" +  response.statusText);
        }
      }
    )
    .catch((error) => 
      {console.log(error);} 
    )
  }

  updateNewClassData = (event) =>{
    //updates data from the form for the possible new class
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  updateNewFilterData = (event) =>{
    //updates data for the classroom filters
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  updateData = (apiResponse) => {
    //fetches all classrooms from the database
    if(apiResponse !== ""){
      const length = apiResponse.length;
      for(var i = 0; i < length; i ++){
        const curImages = this.state.numClasses + 1
        const rooms = this.state.rooms;
        const newClass = [
          curImages, 
          apiResponse[i][1], 
          apiResponse[i][2], 
          apiResponse[i][3], 
          apiResponse[i][7], 
          apiResponse[i][6], 
          apiResponse[i][5],
          this.removeClass
        ];
        this.setState({
          rooms: rooms.concat([{room: newClass}]),
          numClasses: curImages
        });
      }
    }
  }

  fetchData = () => {
    //In package.json add "proxy": "http://localhost:5000" 
    //This will allow redirect to REST api in Flask w/o CORS errors
     fetch('/Classes')
     .then(
        (response) => 
        {
          if (response.status === 200)
          {
              return (response.json()) ;
          }
          else
          {
              console.log("HTTP error:" + response.status + ":" +  response.statusText);
              return ([ ["status ", response.status]]);
          }
        }
        )//The promise response is returned, then we extract the json data
     .then ((jsonOutput) => //jsonOutput now has result of the data extraction
        {
            this.updateData(jsonOutput);
        }
      )
    .catch((error) => 
      {console.log(error);
        this.updateData("");
      } 
    )

  }


  render() {
    const rooms = this.state.rooms;
    const classes = rooms.map((room) =>{
      if((parseInt(this.state.floorFilter) === room.room[5] || parseInt(this.state.floorFilter) === 0 || this.state.floorFilter === "") 
        && (this.state.buildingFilter === room.room[4] || this.state.buildingFilter === "")){
        return(
          <li key={room.room}>
            {/* <Col> */}
              <Classbox
                number={room.room[0]}
                normal={room.room[1]}
                yellow={room.room[2]}
                max={room.room[3]}
                building={room.room[4]}
                floor={room.room[5]}
                name={room.room[6]}
                removeClass={room.room[7]}
              />
            {/* </Col> */}
          </li>
        );
      }
      return null;
    });

    return (
      <Container className="body">
        <Row>
          <Col><h1>COVID Classroom Capacity</h1></Col>
        </Row>
        <Row>
          <Col><h3>Each time someone enters/leaves a classroom, select room and click on the appropriate button</h3></Col>
        </Row>
        <Row xs={1} md={3} lg={4} className="class-container">
          {classes}
        </Row>
        <Form className="form-buttons">
          <Row>
            <Col className="butt-col">
                <Label for="buildingfilter" className="form-label">Filter Building</Label>
                <Input name="buildingFilter" id="bulidngfilter" type="text" placeholder="building filter" onChange={this.updateNewFilterData} className="form-input"/>
            </Col>
            <Col className="butt-col">
                <Label for="floorfilter" className="form-label">Filter Floor</Label>
                <Input name="floorFilter" id="floorfilter" type="number" placeholder="floor filter" onChange={this.updateNewFilterData} className="form-input"/>
            </Col>
          </Row>
        </Form>
        <Row className="center-items">
          <Col>
            <ClassForm
              createClassroom = {this.createNewClass}
              changeHandler = {this.updateNewClassData}
            />
          </Col>
        </Row>
      </Container>

    )
  }
}

export default ClassroomPage;
