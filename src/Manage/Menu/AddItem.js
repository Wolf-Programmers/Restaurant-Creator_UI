import { Col, Container, Row, Form, Button, Modal, Alert} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddItem()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [title, setTitle]=useState("")
    const [desc, setDesc]=useState("Bardzo smaczna potrawa")
    const [quantity, setQuantity]=useState("")
    const [prices, setPrices]=useState("")
    const [unit, setUnit]=useState("")
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState("")
    const [items, setItems]=useState([])
    const [itemType, setItemType]=useState("")

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
        async function fetchItemTypeData(){
            let data = await fetch("https://creator.azurewebsites.net/item/get-item-types");
                data = await data.json()
                data = data.value
                setItems(data)
            }
        fetchData()
        fetchItemTypeData()
    },[]);

    async function create(){
        let price = parseFloat(prices.replace(',', '.')).toFixed(2)
        let item={title, desc, quantity, price, unit, restaurantId, itemType}
        let result = await fetch("https://creator.azurewebsites.net/item/create/",{
            method:'PUT',
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
            errorMessage.length=0
            errorMessage.push(result.errorList.title)
            errorMessage.push(result.errorList.quantity)
            errorMessage.push(result.errorList.price)
            errorMessage.push(result.errorList.unit)
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
                    { errorMessage && errorMessage.length?
                    errorMessage.map((item) => <p>{item}</p>) 
                    :<p>Błędne dane</p>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Zamknij
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                                <Form.Control type="input" value={prices} onChange={(e)=>setPrices(e.target.value)}/>
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
                                <option value="">Wybierz</option>
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
                                <option value="">Wybierz</option>
                                { items.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                )}
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