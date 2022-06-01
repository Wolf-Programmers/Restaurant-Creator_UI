import AddEmployee from "./Employee/AddEmployee";
import Header from '../Header';
import { Col, Container, Row, Table, Button } from "react-bootstrap";
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

    useEffect (()=>{
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
        fetchData()
        fetchEmployeeData()
    },[]);

    async function deleteRestaurant(RestaurantId){
        console.warn(RestaurantId)
        let data = await fetch("https://creator.azurewebsites.net/restaurant/delete?restaurantId=" + RestaurantId);
        console.warn(data)
    }

    return(
        <div>
            <Header/> 
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
                            {employees.map((employee)=>
                            item.id === employee.restaurant.id ?
                            <>
                            
                                <tbody>
                                <tr>
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
                                    <td><Button variant='danger'><FontAwesomeIcon icon={faTrashCan} onClick={(e) => deleteRestaurant(employee.id, e)}/></Button></td>
                                </tr>
                                </tbody>
                            </>:<></>
                            )}
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