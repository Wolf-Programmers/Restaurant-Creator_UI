import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Header from "../../Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function EditRestaurant(props)
{
    
    let navigate = useNavigate();
    let {id} = useParams();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [name, setName]=useState("")
    const [city, setCity]=useState("")
    const [address, setAddress]=useState("")
    const [phoneNumber, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [voivodeshipList, setVoivodeshipList]=useState([])
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
    const [type, setType]=useState([])
    const [typeSelected, setTypeSelected]=useState("")

    useEffect (()=>{
        async function fetchRestaurantData(){
            let data = await fetch("https://creator.azurewebsites.net/restaurant/info?id=" + id);
                data = await data.json()
    
                if(data.status === 1){
                    data = await data.value
                    console.warn(data)
                    setName(data.name)
                    setCity(data.city)
                    setAddress(data.address)
                    setPhone(data.phoneNumber)
                    setEmail(data.email)
                    setVoivodeship(data.voivodeship)
                    setTypeSelected(data.restaurantTypes[0].id)
                    setMonO(data.openingPeriod[0].from)
                    setTueO(data.openingPeriod[1].from)
                    setWedO(data.openingPeriod[2].from)
                    setThuO(data.openingPeriod[3].from)
                    setFriO(data.openingPeriod[4].from)
                    setMonC(data.openingPeriod[0].to)
                    setTueC(data.openingPeriod[1].to)
                    setWedC(data.openingPeriod[2].to)
                    setThuC(data.openingPeriod[3].to)
                    setFriC(data.openingPeriod[4].to)
                    {   if(data.openingPeriod.length > 5){
                            setSatO(data.openingPeriod[5].from)
                            setSunO(data.openingPeriod[6].from)
                            setSatC(data.openingPeriod[5].to)
                            setSunC(data.openingPeriod[6].to)
                    }}
                    
                    console.warn(typeSelected)
                }
                else {
                    navigate('/restaurant')
                }
            
            }
        async function fetchData(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/get-types");
            data = await data.json()
            data = await data.value
        setType(data)
        }
        async function fetchVoivodeshipData(){
            let data = await fetch("https://creator.azurewebsites.net/restaurant/get-voivodeship");
                data = await data.json()
                data = await data.value
            setVoivodeshipList(data)
        }
        fetchData();
        fetchVoivodeshipData()
        fetchRestaurantData()
    },[]);

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
            {
                "dayOfWeek":6,
                "from":satO,
                "to":satC,
            },
            {
                "dayOfWeek":7,
                "from":sunO,
                "to":sunC,
            },

        ]

        let owner = user.id
        let cuisine = parseInt(typeSelected)
        let restaurantTypesList = [{id:cuisine}]
        let item={owner, name, city, address, phoneNumber, email, voivodeship, openingTimes, restaurantTypesList}
        console.warn(item)

        let result = await fetch("https://creator.azurewebsites.net/restaurant/update",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin" : "*"
            }
        })

        result = await result.json()
        
        if(result.status === 1){
            navigate('/')
        }
        else{
            console.warn(result) 
            console.warn(result.errorList) 
            console.warn(type)   
        }
    }

    return(
        <div>
            <Header/>
            <Container>
                <Row className="justify-content-center mt-5">
                <Col sm={12} md={10}>
                        <Link to="/manage/restaurant">
                            <Button className='float-start ' variant='danger'><FontAwesomeIcon icon={faChevronLeft} /></Button>
                        </Link>
                    </Col>
                    <Col sm={12}><h2>Edytuj restaurację</h2></Col> 
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwa restauracji</Form.Label>
                                <Form.Control type="input" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Typ kuchni</Form.Label>
                                <Form.Select aria-label="Default select example" value={typeSelected} onChange={(e)=>setTypeSelected(e.target.value)}>
                                    <option>Wybierz</option>
                                    {
                                        type.map((opt)=>
                                            <option key={opt.id} value={opt.name}>{opt.name}</option>
                                        )
                                    }
                                </Form.Select>
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
                        <Col sm={12} md={2}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Miasto</Form.Label>
                                <Form.Control type="input" value={city} onChange={(e)=>setCity(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Województwo</Form.Label>
                                <Form.Select value={voivodeship} onChange={(e)=>setVoivodeship(e.target.value)}>
                                    <option value="">Wybierz</option>
                                    {
                                        voivodeshipList.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12}>
                           <h5 className="mt-2">Godziny otwarcia</h5>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Poniedziałek</Form.Label>
                                <Row className="justify-content-center">
                                    <Col sm={5}><Form.Control type="time" value={monO} onChange={(e)=>setMonO(e.target.value)}/></Col>
                                    -
                                    <Col sm={5}><Form.Control type="time" value={monC} onChange={(e)=>setMonC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Wtorek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={tueO} onChange={(e)=>setTueO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={tueC} onChange={(e)=>setTueC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Środa</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={wedO} onChange={(e)=>setWedO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={wedC} onChange={(e)=>setWedC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Czwartek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={thuO} onChange={(e)=>setThuO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={thuC} onChange={(e)=>setThuC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Piątek</Form.Label>
                                <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={friO} onChange={(e)=>setFriO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={friC} onChange={(e)=>setFriC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                            <Form.Label className="float-start">Sobota</Form.Label>
                            <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={satO} onChange={(e)=>setSatO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={satC} onChange={(e)=>setSatC(e.target.value)}/></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Niedziela</Form.Label>
                            <Row className="justify-content-center">
                                <Col sm={5}><Form.Control type="time" value={sunO} onChange={(e)=>setSunO(e.target.value)}/></Col>
                                -
                                <Col sm={5}><Form.Control type="time" value={sunC} onChange={(e)=>setSunC(e.target.value)}/></Col>
                                </Row>
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

export default EditRestaurant