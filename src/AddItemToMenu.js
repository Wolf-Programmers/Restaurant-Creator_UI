import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddItemToMenu()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [item, setItem]=useState([])
    const [itemId, setItemId]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")
    const [menu, setMenu]=useState([])
    const [menuId, setMenuId]=useState("1")

    useEffect (()=>{
        async function fetchItemData(){
        let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
        
            data = await data.json()
            console.warn(data)
            console.warn(data.value)
            data = data.value
            setRestaurants(data)
        }
        async function fetchRestaurantData(){
            let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
            
                data = await data.json()
                console.warn(data)
                console.warn(data.value)
                data = data.value
                setRestaurants(data)
        }
        async function fetchMenuData(){
                let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
                
                    data = await data.json()
                    console.warn(data)
                    console.warn(data.value)
                    data = data.value
                    setRestaurants(data)
        }
        fetchRestaurantData();
        console.warn(JSON.stringify(restaurants))
    },[]);

    async function create(){
        let item={itemId, restaurantId, menuId}
        console.warn(item)

        let result = await fetch("http://localhost:8080/menu/add-item/",{
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
                    <Col sm={12}><h2>Dodaj do menu</h2></Col> 
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
                                <Form.Label className="float-start">Menu</Form.Label>
                                <Form.Control type="input" value={menuId} onChange={(e)=>setMenuId(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Pozycja</Form.Label>
                                <Form.Control type="input" value={itemId} onChange={(e)=>setItemId(e.target.value)}/>
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

export default AddItemToMenu