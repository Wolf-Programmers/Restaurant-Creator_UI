import AddEmployee from "./Employee/AddEmployee";
import Header from '../Header';
import { Col, Container, Row, Table, Button, Modal } from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function ManageEmployee()
{

    let navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [restaurants, setRestaurants]= useState([])
    const [restaurantId, setRestaurantId]= useState([])
    const [employees, setEmployees]= useState([])

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState("")

    const handleClose = () => setShow(false);

    useEffect (()=>{
        fetchData()
        fetchEmployeeData()
    },[]);

    async function fetchData(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
             data = await data.json()
             data = data.value
             setRestaurants(data)
         }

    async function fetchEmployeeData(){
         let data = await fetch("https://creator.azurewebsites.net/employee/get-employee-by-owner?ownerId=" + user.id);
              data = await data.json()
              data = data.value
             console.warn(data)
              setEmployees(data)
        }

    async function deleteEmployee(employeeId){
        
        let result = await fetch("https://creator.azurewebsites.net/employee/delete?id=" + employeeId,{
            method: 'DELETE',
            headers:{
                "Access-Control-Allow-Origin" : "*"
            }
        });
        result = await result.json()
        console.warn(result)
        if(result.status === 1){
            fetchData();
            fetchEmployeeData()
        }
        else{
            setErrorMessage(result.message)
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
                    {errorMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Zamknij
                        </Button>
                    </Modal.Footer>
            </Modal>
            <Container>
                <Row className='mt-4 justify-content-center'>
                    <Col sm={12} md={10}>
                        <Link to="/manage/employee/add">
                            <Button className='float-end ' variant='success'><FontAwesomeIcon icon={faAdd} /></Button>
                        </Link>
                    </Col>
                    <Col md={10}>
                        { restaurants.map((item)=>
                        <>
                        <div class="p-2 mt-4 bg-danger text-white">{item.name}</div>
                        <Table striped hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>Telefon</th>
                                    <th>Email</th>
                                    <th>Rola</th>
                                </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee)=>
                            item.id === employee.restaurant.id ?
                            <>  
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.employeeRoleName}</td>
                                    <td>
                                        <Link to={"/manage/employee/"+employee.id}>
                                            <Button variant='warning'><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        </Link>
                                    </td>
                                    <td><Button variant='danger'><FontAwesomeIcon icon={faTrashCan} onClick={(e) => deleteEmployee(employee.id, e)}/></Button></td>
                                </tr>
                            </>:<></>
                            )}
                            </tbody>
                        </Table> 
                        </>  
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManageEmployee