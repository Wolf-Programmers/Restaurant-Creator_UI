import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddItem()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [title, setTitle]=useState("")
    const [desc, setDesc]=useState("Bardzo smaczna potrawa")
    const [quantity, setQuantity]=useState("")
    const [price, setPrice]=useState("")
    const [unit, setUnit]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")
    const [itemType, setItemType]=useState("1")

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
        
            data = await data.json()
            console.warn(data)
            console.warn(data.value)
            data = data.value
            setRestaurants(data)
        }
        fetchData();
        console.warn(JSON.stringify(restaurants))
    },[]);

    async function create(){

        let item={title, desc, quantity, price, unit, restaurantId, itemType}
        console.warn(item)

        let result = await fetch("http://localhost:8080/item/create/",{
            method:'PUT',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
            }
        })

        result = await result.json()
        
        if(result.status === 1){
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
                    <Col sm={12}><h2>Dodaj pozycję menu</h2></Col> 
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa</Form.Label>
                                <Form.Control type="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Cena</Form.Label>
                                <Form.Control type="input" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Waga</Form.Label>
                                <Form.Control type="input" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Jednostka</Form.Label>
                                <Form.Control type="input" value={unit} onChange={(e)=>setUnit(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Restauracja</Form.Label>
                                <Form.Select value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)}>
                                <option>Wybierz</option>
                                { restaurants.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Typ</Form.Label>
                                <Form.Select value={itemType} onChange={(e)=>setItemType(e.target.value)}>
                                <option value="1">Burger</option>
                                <option value="2">Kebab</option>
                                <option value="3">Pizza</option>
                                <option value="4">Deser</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8}>
                        <Form.Group className="mb-3">
                                <Form.Label className="float-start">Opis</Form.Label>
                                <Form.Control as="textarea" rows={3} value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                            </Form.Group>
                        </Col>
                       
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

export default AddItem