import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";


function AddMenu()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [creatorId, setCreatorId]=useState(user.id)
    const [name, setName]=useState("")
    const [menuTypeId, setMenuTypeId]=useState("1")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
        
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
        let item={creatorId, name, menuTypeId, restaurantId}
        console.warn(item)

        let result = await fetch("http://creator.azurewebsites.net/menu/create/",{
            method:'POST',
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
                    <Col sm={12}><h2>Dodaj menu</h2></Col> 
                        <Col sm={12} md={8}>
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
                        <div className="clearfix"></div>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa</Form.Label>
                                <Form.Control type="input" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Typ</Form.Label>
                                <Form.Select value={menuTypeId} onChange={(e)=>setMenuTypeId(e.target.value)}>
                                <option value="1">Burger</option>
                                <option value="2">Kebab</option>
                                <option value="3">Pizza</option>
                                <option value="4">Deser</option>
                                </Form.Select>
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

export default AddMenu