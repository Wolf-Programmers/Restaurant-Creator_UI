import { Col, Container, Row, Form, Button, Modal} from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Header from "../Header";


function ManageCupoun()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [cuponCode, setCuponCode]=useState("")
    const [maxUse, setMaxUse]=useState("")
    const [value, setValue]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState()
    const [restaurant, setRestaurant]=useState([])
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState([])

    const handleClose = () => setShow(false);

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
            data = await data.json()
            data = data.value
            setRestaurants(data)
        }
        fetchData()
    },[]);

    async function create(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/info?id=" + restaurantId);
            data = await data.json()
            data = data.value
            console.warn(data)
            setRestaurant(data)

        let item={cuponCode, maxUse, restaurantId, value, restaurant}
        console.warn(item)

        let result = await fetch("https://creator.azurewebsites.net/cupon/cupon-create",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
            }
        })

        result = await result.json()
        
        if(result.status === 1){
            alert("Dodano pomyślnie!");
            window.location.reload(false);
        }
        else{
            errorMessage.length = 0
            errorMessage.push("")
            errorMessage.push(result.errorList)
            console.warn(errorMessage)
            console.warn(result)
            setShow(true)
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
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj kupon</h2></Col> 
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Kupon</Form.Label>
                                <Form.Control type="input" value={cuponCode} onChange={(e)=>setCuponCode(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Ilość użyć</Form.Label>
                                <Form.Control type="input" value={maxUse} onChange={(e)=>setMaxUse(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Restauracja</Form.Label>
                                <Form.Select value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)}>
                                <option value="">Wybierz</option>
                                { restaurants.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Rabat</Form.Label>
                                <Form.Control type="number" value={value} onChange={(e)=>setValue(e.target.value)}/>
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

export default ManageCupoun