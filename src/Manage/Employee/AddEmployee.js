import { Col, Container, Row, Form, Button, Modal} from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Header from "../../Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


function AddEmployee()
{
    
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [name, setName]=useState("")
    const [lastName, setLastName]=useState("")
    const [phoneNumber, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [salaryAmount, setSalary]=useState()
    const [restaurants, setRestaurants]=useState([])
    const [restaurantId, setRestaurantId]=useState()
    const [employeeRoles, setEmployeeRoles]=useState()
    const [employeeRoleId, setEmployeeRoleId]=useState()

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
        async function fetchRolesData(){
            let data = await fetch("https://creator.azurewebsites.net/employee/get-roles");
                data = await data.json()
                data = data.value
                console.warn(data)
                setEmployeeRoles(data)
            }
        fetchData()
        fetchRolesData()
    },[]);

    async function create(){
        let salary = parseFloat(salaryAmount.replace(',', '.'))
        salary = salary.toFixed(2)
        console.warn(salary)
        let item={name,lastName, phoneNumber, email, password, salary, restaurantId, employeeRoleId}
        console.warn(item)

        let result = await fetch("https://creator.azurewebsites.net/employee/add-employee/",{
            method:'PUT',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
            }
        })

        result = await result.json()
        
        if(result.status === 1){
            alert("Dodano pomy??lnie!");
            navigate('/manage/employee')
        }
        else{
            errorMessage.length = 0
            errorMessage.push("")
            errorMessage.push(result.errorList.email)
            errorMessage.push(result.errorList.lastName)
            errorMessage.push(result.errorList.name)
            errorMessage.push(result.errorList.password)
            errorMessage.push(result.errorList.phoneNumber)
            errorMessage.push(result.errorList.salary)
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
                        <Modal.Title>B????d</Modal.Title>
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
                    <Col sm={12} md={10}>
                        <Link to="/manage/employee">
                            <Button className='float-start ' variant='danger'><FontAwesomeIcon icon={faChevronLeft} /></Button>
                        </Link>
                    </Col>
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
                                <Form.Label className="float-start">Has??o</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start">P??aca</Form.Label>
                                <Form.Control type="number" value={salaryAmount} onChange={(e)=>setSalary(e.target.value)}/>
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