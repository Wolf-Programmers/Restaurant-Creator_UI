import { Col, Container, Row, Form, Button} from "react-bootstrap";
import { Link, useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import Header from './Header';

function Register()
{
    let navigate = useNavigate();
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [repassword, setRepassword]=useState("")
    const [phone, setPhone]=useState("")

    async function signUp(){
        let item={name, email, password, repassword, phone}
        let result = await fetch("http://localhost:8000/api/?",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'value',
                "Accept":'value'
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
                    <Col><h1>Rejestracja</h1></Col>
                    <Col>
                      <Form>
                      <Form.Group className="mb-3" controlId="registerName">
                            <Form.Label>Nazwa</Form.Label>
                            <Form.Control type="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Wprowadź nazwe" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerEmail">
                            <Form.Label>Adres Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Wprowadź email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerPassword">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Wprowadź hasło" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerPassword2">
                            <Form.Label>Powtórz hasło</Form.Label>
                            <Form.Control type="password" value={repassword} onChange={(e)=>setRepassword(e.target.value)} placeholder="Powtórz hasło" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="registerPhone">
                            <Form.Label>Nr. telefonu</Form.Label>
                            <Form.Control type="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Wprowadź nr. tel" />
                        </Form.Group>
                        <Button variant="danger" onClick={signUp}>
                            Zarejestruj się
                        </Button>
                        </Form>
                    </Col>
                    <Col className="mt-3">
                    <small className="text-muted">
                       Masz już konto? <Link to="/login">Zaloguj się</Link>
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

export default Register