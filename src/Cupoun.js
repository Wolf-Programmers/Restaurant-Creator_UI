import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function Cupoun()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [cuponCode, setcuponCode]=useState("")
    const [maxUse, setmaxUse]=useState("")
    const [id, setId]=useState("")
    const [typeSelected, setTypeSelected]=useState()



    async function create(){

        let restaurant = await fetch("http://creator.azurewebsites.net/restaurant/info?id=" + id);
        restaurant= await restaurant.json()
        restaurant = await restaurant.value
        console.warn(restaurant)

        let item={cuponCode, maxUse, restaurant}
        console.warn(item)

        let result = await fetch("http://creator.azurewebsites.net/cupon/cupon-create/",{
            method:'Post',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
            }
        })

        result = await result.json()
        
        if(result.status === 1){
            navigate('/')
        }
        else{
            console.warn(result) 
            console.warn(result.errorList) 
        }
    }

    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj kupon</h2></Col> 
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Kod rabatowy</Form.Label>
                                <Form.Control type="input" value={cuponCode} onChange={(e)=>setcuponCode(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Kij to wie(maxUse)</Form.Label>
                                <Form.Control type="input" value={maxUse} onChange={(e)=>setmaxUse(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">RESTAURACJA</Form.Label>
                                <Form.Control type="input" value={id} onChange={(e)=>setId(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12}>
                        <Button variant="danger" className="mb-5" onClick={create}>
                            Dodaj
                        </Button>
                        </Col>
                </Row>
            </Container> 
        </div>
    )
}

export default Cupoun