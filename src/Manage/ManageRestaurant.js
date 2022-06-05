import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Button, Table, Modal} from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function ManageRestaurant()
{
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [restaurants, setRestaurants]=useState([])

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage]=useState("")

    const handleClose = () => setShow(false);

    useEffect (()=>{
        fetchData();
    },[]);

    async function deleteRestaurant(RestaurantId){
        
        let result = await fetch("https://creator.azurewebsites.net/restaurant/delete?restaurantId=" + RestaurantId,{
            method: 'DELETE',
            headers:{
                "Access-Control-Allow-Origin" : "*"
            }
        });
        result = await result.json()
        if(result.status === 1){
            fetchData();
        }
        else{
            setErrorMessage(result.message)
            setShow(true)
        }
    }

    async function fetchData(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/get-restaurants?ownerId=" + user.id);
            data = await data.json()
            data = data.value
            setRestaurants(data)
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
                            <tbody>
                            { restaurants.map((restaurant)=>
                                <tr key={restaurant.id}>
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
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManageRestaurant