import { Col, Container, Row, Form, Button, Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddItemToMenu()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [items, setItems]=useState([])
    const [itemId, setItemId]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")
    const [menu, setMenu]=useState([])
    const [menuId, setMenuId]=useState("")
    
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState("")

    const handleClose = () => setShow(false);

    useEffect (()=>{
        async function fetchItemsData(){
        let data = await fetch("http://localhost:8080/item/show-item-by-owner?ownerId=" + user.id);
        
            data = await data.json()
            console.warn(data)
            console.warn(data.value)
            data = data.value
            setItems(data)
        }
        async function fetchRestaurantsData(){
            let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
            
                data = await data.json()
                data = data.value
                setRestaurants(data)
        }
        async function fetchMenuData(){
                let data = await fetch("http://localhost:8080/menu/show-menu-by-owner?ownerId=" + user.id);
                
                    data = await data.json()
                    data = data.value
                    setMenu(data)
        }
        fetchRestaurantsData();
        fetchItemsData()
        fetchMenuData()
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
            setErrorMessage(result.message)
            setShow(true)
        }
    }

    return(
        <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Błąd</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {errorMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Zamknij
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                                <Form.Select value={menuId} onChange={(e)=>setMenuId(e.target.value)}>
                                <option>Wybierz</option>
                                { menu.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Pozycja</Form.Label>
                                <Form.Select value={itemId} onChange={(e)=>setItemId(e.target.value)}>
                                <option>Wybierz</option>
                                { items.map((opt)=>
                                    <option key={opt.id} value={opt.id}>{opt.title}</option>
                                )}
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

export default AddItemToMenu