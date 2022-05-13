import { Button, Container, Row, Col, Form} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import Header from './Header';

function RestaurantSearch(){

    // useEffect(()=>{

    //     localStorage.clear('city');
        
    //     }, [])

    let navigate = useNavigate();
    const [city, setCity]=useState("")

    function searchCity(){
        localStorage.setItem("city",city)
        navigate('/restaurants')
    }

    return(
        <div>
            <Header/>
            <Container fluid>
                <Row>
                    <Col>
                    <div className="login-bg">
                        <div className="bg-mute">
                        <div className="search-box">
                            <Col className="mb-4"><h2>Znajdź restaurację w swojej okolicy</h2></Col>
                            <Col>
                                <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)} className="search-bar" placeholder="Szukaj..." />
                                <Button variant="danger" className="search-icon" onClick={searchCity}><FontAwesomeIcon icon={faSearch} /></Button>
                            </Col>
                        </div>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container> 
            <Container>
               
            </Container>
        </div>
    )
}

export default RestaurantSearch