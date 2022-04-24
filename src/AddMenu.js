import { Col, Container, Row, Form, Button} from "react-bootstrap";

function AddMenu()
{
    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj Menu</h2></Col> 
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Restauracja</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Cena</Form.Label>
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

export default AddMenu