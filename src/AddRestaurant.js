import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

function AddRestaurant()
{
    
    let navigate = useNavigate();
    const [name, setName]=useState("")
    const [city, setCity]=useState("")
    const [address, setAddress]=useState("")
    const [phoneNumber, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [voivodeship, setVoivodeship]=useState("")
    const [monO, setMonO]=useState("")
    const [tueO, setTueO]=useState("")
    const [wedO, setWedO]=useState("")
    const [thuO, setThuO]=useState("")
    const [friO, setFriO]=useState("")
    const [satO, setSatO]=useState("")
    const [sunO, setSunO]=useState("")
    const [monC, setMonC]=useState("")
    const [tueC, setTueC]=useState("")
    const [wedC, setWedC]=useState("")
    const [thuC, setThuC]=useState("")
    const [friC, setFriC]=useState("")
    const [satC, setSatC]=useState("")
    const [sunC, setSunC]=useState("")
    const [type, setType]=useState("")

    async function create(){

        let openingTimes = [
            {
                "dayOfWeek":1,
                "from":monO,
                "to":monC,
            },
            {
                "dayOfWeek":2,
                "from":tueO,
                "to":tueC,
            },
            {
                "dayOfWeek":3,
                "from":wedO,
                "to":wedC,
            },
            {
                "dayOfWeek":4,
                "from":thuO,
                "to":thuC,
            },
            {
                "dayOfWeek":5,
                "from":friO,
                "to":friC,
            },

        ]

        let owner = 1
        let restaurantTypesList = [{id:1}]
        let item={owner, name, city, address, phoneNumber, email, voivodeship, openingTimes, restaurantTypesList}
        console.warn(item)

        let result = await fetch("http://localhost:8080/restaurant/add/",{
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
                                <Row className="justify-content-center">
                                    <Col sm={5}><Form.Control type="input" value={monO} onChange={(e)=>setMonO(e.target.value)}/></Col>
                                    -
                                    <Col sm={5}><Form.Control type="input" value={monC} onChange={(e)=>setMonC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Wtorek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="input" value={tueO} onChange={(e)=>setTueO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="input" value={tueC} onChange={(e)=>setTueC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Środa</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="input" value={wedO} onChange={(e)=>setWedO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="input" value={wedC} onChange={(e)=>setWedC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Czwartek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="input" value={thuO} onChange={(e)=>setThuO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="input" value={thuC} onChange={(e)=>setThuC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Piątek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="input" value={friO} onChange={(e)=>setFriO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="input" value={friC} onChange={(e)=>setFriC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Sobota</Form.Label>
                                <Form.Control type="input" value={satO} onChange={(e)=>setSatO(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Niedziela</Form.Label>
                                <Form.Control type="input" value={sunO} onChange={(e)=>setSunO(e.target.value)}/>
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