import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

function AddRestaurant()
{
    
    let navigate = useNavigate();
    const [owner, setOwner]=useState("")
    const [name, setName]=useState("")
    const [city, setCity]=useState("")
    const [address, setAddress]=useState("")
    const [phoneNumber, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [voivodeship, setVoivodeship]=useState("")
    const [mon, setMon]=useState("")
    const [tue, setTue]=useState("")
    const [wed, setWed]=useState("")
    const [thu, setThu]=useState("")
    const [fri, setFri]=useState("")
    const [sat, setSat]=useState("")
    const [sun, setSun]=useState("")
    const [type, setType]=useState("")

    async function create(){
        setOwner(1)

        let openingTimes = {
            "1":mon,
            "2":tue,
            "3":wed,
            "4":thu,
            "5":fri,
            "6":sat,
            "7":sun,
        }

        let restaurantTypesList = {"1":type}
        let item={owner, name, city, address, phoneNumber, email, voivodeship, openingTimes, restaurantTypesList}
        console.warn(item)

        let result = await fetch("http://localhost:8080/restaurant/add",{
            method:'PUT',
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
            console.warn(result.errorList) 
            console.warn(result.errorList)   
        }
    }

    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj restaurację</h2></Col> 
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa restauracji</Form.Label>
                                <Form.Control type="input" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Typ kuchni</Form.Label>
                                <Form.Control type="input" value={type} onChange={(e)=>setType(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Numer telefonu</Form.Label>
                                <Form.Control type="input" value={phoneNumber} onChange={(e)=>setPhone(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Adres email</Form.Label>
                                <Form.Control type="input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Adres</Form.Label>
                                <Form.Control type="input" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Miasto</Form.Label>
                                <Form.Control type="input" value={city} onChange={(e)=>setCity(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Województwo</Form.Label>
                                <Form.Control type="input" value={voivodeship} onChange={(e)=>setVoivodeship(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12}>
                           <h5 className="mt-2">Godziny otwarcia</h5>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Poniedziałek</Form.Label>
                                <Form.Control type="input" value={mon} onChange={(e)=>setMon(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Wtorek</Form.Label>
                                <Form.Control type="input" value={tue} onChange={(e)=>setTue(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Środa</Form.Label>
                                <Form.Control type="input" value={wed} onChange={(e)=>setWed(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Czwartek</Form.Label>
                                <Form.Control type="input" value={thu} onChange={(e)=>setThu(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Piątek</Form.Label>
                                <Form.Control type="input" value={fri} onChange={(e)=>setFri(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Sobota</Form.Label>
                                <Form.Control type="input" value={sat} onChange={(e)=>setSat(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Niedziela</Form.Label>
                                <Form.Control type="input" value={sun} onChange={(e)=>setSun(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Opis</Form.Label>
                                <Form.Control as="textarea" rows={4} />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Zdjecie</Form.Label>
                                <Form.Control type="file" />
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

export default AddRestaurant