import React from 'react';
import {Col, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import './ClassForm.css';

class ClassForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggleModal = this.toggleModal.bind(this);
        this.createClassClose = this.createClassClose.bind(this);
    }

    toggleModal(){
        //toggles active state of form modal
        this.setState({
            modal: !this.state.modal
        });
    }

    createClassClose(){
        //wrapper function for two other functions, since you can only call
        //one function per button
        this.props.createClassroom();
        this.toggleModal();
    }

    render(){
        return(
            <Container className="main-container">
                <Button color="success" onClick={this.toggleModal} className="button">Add Classroom</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Classroom</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="classname">Classroom Number</Label>
                                <Input name="tempName" id="classname" type="number" placeholder="enter class number here" onChange={this.props.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="classblg">Building</Label>
                                <Input name="tempBuilding" id="classblg" type="text" placeholder="enter building caps code here" onChange={this.props.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="classfloor">Floor</Label>
                                <Input name="tempFloor" id="classfloor" type="number" placeholder="enter floor here" onChange={this.props.changeHandler}/>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="classnormal">Normal</Label>
                                        <Input name="tempNormal" id="classnormal" type="number" placeholder="enter normal" onChange={this.props.changeHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="classyellow">Yellow</Label>
                                        <Input name="tempYellow" id="classyellow" type="number" placeholder="enter yellow" onChange={this.props.changeHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="classmax">Maximum</Label>
                                        <Input name="tempMax" id="classmax" type="number" placeholder="enter max" onChange={this.props.changeHandler}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <FormText color="muted">
                                    Normal capacity is the maximum number of students allowed in the class during non-covid times.
                                    Yellow capacity is the number of students in the classroom to trigger the yellow warning level
                                    Maximum capacity is the maximum safe number of students allowed within the clasroom
                                </FormText>
                            </FormGroup>

                        </Form>
                        Press submit to add class, or cancel to cancel.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createClassClose}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}
export default ClassForm;