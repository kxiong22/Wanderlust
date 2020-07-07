import React from 'react';
import {Row, Col, Container, Button, Modal} from 'react-bootstrap';

class Gallery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalShow: Array(12).fill(false)
        }
    }

    setModalShow(i, val){
        const modalShowCopy = [...this.state.modalShow];
        modalShowCopy[i] = val;
        this.setState({modalShow: modalShowCopy});
    }

    oneModal(i) {
        return (
            <div>
                <Button variant="link" onClick={() => this.setModalShow(i, true)} className="modal-button">{this.props.pics[i]}</Button>
                <Modal size="lg" 
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered 
                    show={this.state.modalShow[i]} onHide={() => this.setModalShow(i, false)} className="modal-pic">{this.props.pics[i]}</Modal>
            </div>
        )
    }

    render() {
        return (
            <Container>
                <Row className="gallery-row">
                    <Col className="gallery-col">{this.oneModal(0)}</Col>
                    <Col className="gallery-col">{this.oneModal(1)}</Col>
                    <Col className="gallery-col">{this.oneModal(2)}</Col>
                    <Col className="gallery-col">{this.oneModal(3)}</Col>
                </Row>

                <Row className="gallery-row">
                    <Col className="gallery-col">{this.oneModal(4)}</Col>
                    <Col className="gallery-col">{this.oneModal(5)}</Col>
                    <Col className="gallery-col">{this.oneModal(6)}</Col>
                    <Col className="gallery-col">{this.oneModal(7)}</Col>
                </Row>

                <Row className="gallery-row">
                    <Col className="gallery-col">{this.oneModal(8)}</Col>
                    <Col className="gallery-col">{this.oneModal(9)}</Col>
                    <Col className="gallery-col">{this.oneModal(10)}</Col>
                    <Col className="gallery-col">{this.oneModal(11)}</Col>
                </Row>
            </Container>
        );
    }
}

export default Gallery