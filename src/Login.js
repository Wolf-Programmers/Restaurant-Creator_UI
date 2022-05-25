import { Col, Container, Row, Form, Button, Modal} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import Header from './Header';

function Login()
{
    let navigate = useNavigate();
    const [login, setEmail]=useState("")
    const [password, setPassword]=useState("")
    
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState([])

    const handleClose = () => setShow(false);

    async function logIn(){
        let item={login, password}
        console.warn(item)
        let result = await fetch("http://localhost:8080/user/login",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
            }
        })
        result = await result.json()
        console.warn(result)
        if(result.status === 1){
            localStorage.setItem("user-info",JSON.stringify(result.value))
            navigate('/')
        }
        else{
            setErrorMessage([result.errorList.login, result.errorList.password])
            console.warn(errorMessage)
            console.warn(result)
            setShow(true)
            setEmail("")
            setPassword("")
        }
    }

    return(
        <div>
            <Header/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Błąd</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           { errorMessage.map((item) => <p>{item}</p>) }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
            <Container fluid>
                <Row>
                    <Col>
                    <div className="login-bg">
                        <div className="login-box">
                        <Col><h1>Zaloguj się</h1></Col>
                        <Col>
                          <Form id="login-form">
                            <Form.Group className="mt-5 mb-4" >
                               <Form.Control type="email" value={login} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Hasło" />
                            </Form.Group>
                            <Button className="login-btn" variant="danger" onClick={logIn}>
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