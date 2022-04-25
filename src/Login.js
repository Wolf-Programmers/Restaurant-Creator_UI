import { Col, Container, Row, Form, Button} from "react-bootstrap";
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

    async function logIn(){
        let item={login, password}
        let result = await fetch("http://localhost:8080/user/login",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',

            }
        })
        result = await result.json()
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate('/')
    }

    return(
        <div>
            <Header/>
            <Container fluid>
                <Row>
                    <Col>
                    <div className="login-bg">
                        <div className="login-box">
                        <Col><h1>Zaloguj się</h1></Col>
                        <Col>
                          <Form>
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