import { Col, Container, Row, Form, Button} from "react-bootstrap";

function AddRestaurant()
{
    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj restaurację</h2></Col> 
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa restauracji</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Typ kuchni</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Ulica</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Numer</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Miasto</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Opis</Form.Label>
                                <Form.Control as="textarea" rows={4} />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Zdjecie</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <Col sm={12}>
                        <Button variant="danger" className="mb-5">
                            Dodaj
                        </Button>
                        </Col>
                </Row>
            </Container> 
        </div>
    )
}

export default AddRestaurant