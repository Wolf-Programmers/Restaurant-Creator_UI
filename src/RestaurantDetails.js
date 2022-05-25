import { Button, Container, Row, Col} from "react-bootstrap"
import React, { useEffect , useState} from "react";
import {useParams} from "react-router-dom";
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapLocation, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';

function RestaurantDetails(props)
{   
    let navigate = useNavigate();
    let {id} = useParams();
    const [restaurant, setRestaurant]=useState({})
    const [opening, setOpening]=useState([])
    
    function today(day){
        var weekdays = new Array(8);
        weekdays[0] = "Niedziela";
        weekdays[1] = "Poniedziałek";
        weekdays[2] = "Wtorek";
        weekdays[3] = "Środa";
        weekdays[4] = "Czwartek";
        weekdays[5] = "Piątek";
        weekdays[6] = "Sobota";
        weekdays[7] = "Niedziela";
        return weekdays[day]
    }
    
    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://localhost:8080/restaurant/info?id=" + id);
            data = await data.json()
            console.warn(data.value)

            if(data.status === 1){
                data = await data.value
                setRestaurant(data)
                setOpening(data.openingPeriod)
            }
            else {
                navigate('/restaurant')
            }
        
        }
        fetchData();
        console.warn(JSON.stringify(restaurant))
    },[]);

    return(
        <div>
            <Header/>
            <Container>
            <Row className="mt-4">
                <Col sm={12}>
                <h1>{restaurant.name}</h1>
                </Col>
                <Col md={12}>
                <h5><FontAwesomeIcon icon={faMapLocation} /> ul.{restaurant.address}, {restaurant.city}</h5>
                </Col>
                <Col md={12}>
                <h6><FontAwesomeIcon icon={faPhone} /> {restaurant.phoneNumber}</h6>
                </Col>
                <Col md={12}>
                <h6><FontAwesomeIcon icon={faEnvelope} /> {restaurant.email}</h6>
                </Col>
                <Col md={12} className="mt-4">
                <h4>Godziny Otwarcia</h4>
                {opening.map((item)=>
                <Row key={item.dayOfWeek} className="justify-content-center" >
                    <Col sm={12} md={4} >
                        <h6 className="float-md-end">{today(item.dayOfWeek)}:</h6>
                    </Col>
                    <Col sm={12} md={4}>
                        <h6 className="float-md-start">{item.from} - {item.to}</h6>
                    </Col>
                </Row>
                )}
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RestaurantDetails