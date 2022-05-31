import { Col, Container, Row, Form, Button, Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddMenu()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [creatorId, setCreatorId]=useState(user.id)
    const [name, setName]=useState("")
    const [menuTypes, setMenuTypes]=useState([])
    const [menuTypeId, setMenuTypeId]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState("")

    const handleClose = () => setShow(false);

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
        
            data = await data.json()
            data = data.value
            setRestaurants(data)
        }
        async function fetchMenuTypeData(){
            let data = await fetch("http://creator.azurewebsites.net/menu/get-menu-types");
            
                data = await data.json()
                data = data.value
                setMenuTypes(data)
            }
        fetchData()
        fetchMenuTypeData()
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
        console.log(result)
        if(result.status === 1){
            alert("Dodano pomyślnie!");
            setName("")
            setMenuTypeId("")
            setRestaurantId("")
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
                                <option>Wybierz</option>
                                { menuTypes.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
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

export default AddMenu