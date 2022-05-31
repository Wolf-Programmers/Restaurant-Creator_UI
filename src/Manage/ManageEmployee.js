import AddEmployee from "./Employee/AddEmployee";
import Header from '../Header';
import { Col, Container, Row } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";

function ManageEmployee()
{

    let navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [restaurants, setRestaurants]= useState([])

    useEffect (()=>{
       async function fetchData(){
       let data = await fetch("http://localhost:8080/restaurant/get-restaurants?ownerId=" + user.id);
            data = await data.json()
            data = data.value
            setRestaurants(data)
        }
        fetchData()
    },[]);


    return(
        <div>
            <Header/> 
            <Container>
                <Row className="justify-content-center" >
                    <Col md={8}>
                        { restaurants.map((item)=>
                            <div class="p-2 mt-4 bg-danger text-white">{item.name}</div>
                        )}
                        
                    </Col>
                </Row>
            </Container>
            <AddEmployee/>
        </div>
    )
}

export default ManageEmployee