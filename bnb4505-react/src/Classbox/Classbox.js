import React from 'react';
import ClassButtons from "../Button/Button";
import {Button, Card, CardBody, CardText, CardSubtitle, CardTitle} from "reactstrap";
import './Classbox.css';

class Classbox extends React.Component{
    //This class represents a classbox component of the webpage.
    //Handles all color/text updating necessary when its
    //state changes
    constructor(props){
        super(props);
        this.state ={
            number : this.props.number,
            normal: this.props.normal,
            yellow: this.props.yellow,
            max: this.props.max,
            name: this.props.name,
            floor: this.props.floor,
            building: this.props.building,
            current: 0,
            text: "",
            backgroundColor: "#d3d3d3"
        }

        this.getText = this.getText.bind(this);
        this.getColor = this.getColor.bind(this);
        this.addStudent = this.addStudent.bind(this);         //bind addStudent to this class
        this.removeStudent = this.removeStudent.bind(this);   //bind removeStudent to this class
    }

    addStudent(){
        //This function adds one student to the selected room
        this.setState({current: this.state.current + 1});
    }

    
      
    removeStudent(){
        //This function removes one student from the selected room
        if(this.state.current >= 1){
            this.setState({current: this.state.current - 1});
        }
    }


    getText(){
        //This function gets the text of the room based off
        //the count of people within this room
        if(this.state.current <= 0){
            this.setState({text: ""})
        }
        if(this.state.current < this.state.yellow && this.state.current >= 0){
            this.setState({text: "Welcome!"})
        }
        if(this.state.current >= this.state.yellow && this.state.current < this.state.max){
            this.setState({text: "Careful...."})
        }
        if(this.state.current >= this.state.max){
            this.setState({text: "Run!"})
        }
    }

    getColor(){
        //This function gets the proper color this room should be
        //based off the current count of people in the room
        if(this.state.current <= 0){
            this.setState({backgroundColor: "#d3d3d3"})
        }
        if(this.state.current < this.state.yellow && this.state.current >= 0){
            this.setState({backgroundColor: "#7FB375"})
        }
        if(this.state.current >= this.state.yellow && this.state.current < this.state.max){
            this.setState({backgroundColor: "#B0A856"})
        }
        if(this.state.current >= this.state.max){
            this.setState({backgroundColor: "#C26860"})
        }
    }

    componentDidUpdate(prevProps, prevState){
        //Calls getText and getColor whenever the room updates
        if(prevState.current !== this.state.current){
            this.getText();
            this.getColor();
        }
    }

    render(){
        return(
            <div className="classbox" style={{backgroundColor: this.state.backgroundColor}}>
                <Card style={{backgroundColor: this.state.backgroundColor}}>
                    <CardBody>
                        <Button close onClick={() => this.props.removeClass(this.props.number)}/>
                        <CardTitle className="h3">{this.state.building + "-" + this.state.name}</CardTitle>
                        <CardSubtitle>{"Floor: " + this.state.floor}</CardSubtitle>
                        <CardText>{"Status: " + this.state.text}</CardText>
                        <CardText>{this.state.current}</CardText>
                        <ClassButtons
                            current = {this.state.current}
                            addStudent = {this.addStudent}
                            removeStudent = {this.removeStudent}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Classbox;