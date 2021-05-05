import React from 'react'
import {Button, ButtonGroup} from 'reactstrap';

class ClassButtons extends React.Component{
    //Class that represents the + and + buttons at the bottom of the screen
    render(){
        return(
            <ButtonGroup vertical={true}>
                <Button size="lg" color="success" onClick={this.props.addStudent}>Add Student</Button>
                <Button size="sm" color="secondary" onClick={this.props.removeStudent} disabled={this.props.current <= 0}>Remove Student</Button>
            </ButtonGroup>
        )
    }
}

export default ClassButtons;