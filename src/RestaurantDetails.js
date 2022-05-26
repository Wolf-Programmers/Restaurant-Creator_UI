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
    const [menu, setMenu]=useState([])

    const [customerName, setCustomerName]=useState("")
    const [customerCity, setCustomerCity]=useState("")
    const [customerAddress, setCustomerAddress]=useState("")
    const [totalPrice, setTotalPrice]=useState("")
    const [cupouCode, setCupouCode]=useState("")
    const [itemList, setItemList]=useState([])
    const [restaurantId, setRestaurantId]=useState("")
    
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
    
    function addItem(position, price){
        console.warn("sdsa")
    }

    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://creator.azurewebsites.net/restaurant/info?id=" + id);
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
        async function fetchMenuData(){
            let data = await fetch("http://localhost:8080/menu/show-restaurant-menus?restaurantId=" + id);
                data = await data.json()
                console.warn(data.value)
                console.warn(data)
                if(data.status === 1){
                    data = await data.value
                    setMenu(data)
                }
                else {
                    
                }
            
            }
        fetchData();
        fetchMenuData();
        console.warn(JSON.stringify(restaurant))
    },[]);

    function test(){
        console.warn(itemList)
    }

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
            <Row className="mt-4 justify-content-center">
                <Col md={12} className="mt-5">
                <h1>Menu</h1>
                {menu.map((type)=>
                <Row className="mb-4 justify-content-center">
                    <Col sm={12} md={8} >
                    <h3 className="float-md-start">{type.menuName}</h3>
                    </Col>
                    <Col sm={12} md={2} >
                        <p className="float-md-end">{type.menuTypeName}</p>
                    </Col>
                    <div className="clearfix"></div>
                    {type.itemsList.map((item)=>
                    <Row className="mb-3 justify-content-center">
                        <Col sm={12} md={6} >
                            <h6 className="float-md-start">{item.title}</h6>
                        </Col>
                        <Col sm={12} md={2} >
                            <p className="float-md-end">{item.quantity}{item.unit}</p>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8} >
                            <h6>Cena: {item.price} zł</h6>
                        </Col>
                        <div className="clearfix"></div>
                        <Col sm={12} md={8} >
                            <p>{item.describe}</p>
                        </Col>
                        <Col sm={12} md={8}>
                            <Button variant="danger" className="float-end" onClick={addItem(item.id, item.price)}>Więcej</Button>
                        </Col>
                    </Row>
                    )}
                </Row>
                )}
                </Col>
                </Row>
                <Button variant="danger" onClick={test}>Więcej</Button>
            </Container>
        </div>
    )
}

export default RestaurantDetails