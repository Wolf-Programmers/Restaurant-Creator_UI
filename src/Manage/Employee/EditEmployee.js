import { Col, Container, Row, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function AddEmployee()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [name, setName]=useState("")
    const [lastName, setLastName]=useState("")
    const [phoneNumber, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [salary, setSalary]=useState()
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState() 
    const [employeeRoles, setEmployeeRoles]=useState()
    const [employeeRoleId, setEmployeeRoleId]=useState()

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
            data = await data.json()
            data = data.value
            setRestaurants(data)
        }
        async function fetchRolesData(){
            let data = await fetch("http://localhost:8080/restaurant/get-roles");
                data = await data.json()
                data = data.value
                setEmployeeRoles(data)
            }
        fetchData()
        fetchRolesData()
    },[]);


    async function create(){

        let item={name,lastName, phoneNumber, email, password, salary, restaurantId, employeeRoleId}
        console.warn(item)

        let result = await fetch("http://creator.azurewebsites.net/employee/add-employee/",{
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
            console.warn(result) 
            console.warn(result.errorList)
        }
    }

    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={12}><h2>Dodaj pracownika</h2></Col> 
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Imie</Form.Label>
                                <Form.Control type="input" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Nazwisko</Form.Label>
                                <Form.Control type="input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
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
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Hasło</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">Płaca</Form.Label>
                                <Form.Control type="input" value={salary} onChange={(e)=>setSalary(e.target.value)}/>
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
                                <Form.Label className="float-start">Rola</Form.Label>
                                <Form.Select value={employeeRoleId} onChange={(e)=>setEmployeeRoleId(e.target.value)}>
                                <option value="">Wybierz</option>
                                {   employeeRoles && employeeRoles.length?
                                    employeeRoles.map((opt)=>
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ):<></>
                                }
                                </Form.Select>
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

export default AddEmployee