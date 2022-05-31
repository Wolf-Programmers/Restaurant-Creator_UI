import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Button, Table} from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function ManageRestaurant()
{
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [restaurants, setRestaurants]=useState([])

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
        
            data = await data.json()
            console.warn(data)
            console.warn(data.value)
            data = data.value
            setRestaurants(data)
        }
        fetchData();
        console.warn(JSON.stringify(restaurants))
    },[]);

    async function deleteRestaurant(RestaurantId){
        console.warn(RestaurantId)
        let data = await fetch("http://creator.azurewebsites.net/restaurant/delete?restaurantId=" + RestaurantId);
        console.warn(data)
    }

    return(
        <div>
            <Header/>
            <Container>
                <Row className='mt-4 justify-content-center'>
                    <Col sm={12} md={10}>
                        <Link to="/manage/restaurant/add">
                            <Button className='float-end ' variant='success'><FontAwesomeIcon icon={faAdd} /></Button>
                        </Link>
                    </Col>
                    <Col sm={12} md={10}>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Lokalizacja</th>
                                    <th>Telefon</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                        { restaurants.map((restaurant)=>
                           <tbody>
                                <tr>
                                    <td>{restaurant.name}</td>
                                    <td>ul. {restaurant.address}, {restaurant.city}</td>
                                    <td>{restaurant.phoneNumber}</td>
                                    <td>{restaurant.email}</td>
                                    <td>
                                        <Link to={"/manage/restaurant/"+restaurant.id}>
                                            <Button variant='warning'><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        </Link>
                                    </td>
                                    <td><Button variant='danger'><FontAwesomeIcon icon={faTrashCan} onClick={(e) => deleteRestaurant(restaurant.id, e)}/></Button></td>
                                </tr>
                            </tbody>
                        )}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManageRestaurant