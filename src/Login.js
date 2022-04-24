import { Col, Container, Row, Form, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login()
{
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col>
                    <div className="login-bg">
                        <div className="login-box">
                        <Col><h1>Zaloguj się</h1></Col>
                        <Col>
                          <Form>
                            <Form.Group className="mt-5 mb-4" controlId="formLogin">
                               <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Control type="password" placeholder="Hasło" />
                            </Form.Group>
                            <Button className="login-btn" variant="danger" type="submit">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                            </Form>
                        </Col>
                        <Col className="mt-3">
                        <small className="text-muted">
				            Nie masz konta? <Link to="/register">Rejestracja</Link>
			            </small>
                        </Col>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container> 
        </div>
    )
}

export default Login