import { Button, Container, Row, Col, Modal} from "react-bootstrap"
import React, { useEffect , useState} from "react";
import {useParams} from "react-router-dom";
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapLocation, faPhone, faEnvelope, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import Basket from "./Basket";
import Product from "./Product";

export default function RestaurantDetails(props)
{   
    let navigate = useNavigate();
    let {id} = useParams();
    const {cartItems, onAdd, onRemove} = props
    const [restaurant, setRestaurant]=useState({})
    const [opening, setOpening]=useState([])
    const [menu, setMenu]=useState([])
    const [show, setShow] = useState(false);
    

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    
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
            let data = await fetch("http://creator.azurewebsites.net/menu/show-restaurant-menus?restaurantId=" + id);
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

    return(
        <div>
            <Header/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Koszyk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>
                </Modal.Body>
                <Modal.Footer>
                   <Button variant="danger" onClick={handleClose}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
            <Button className="mt-3 cart" variant="danger" onClick={handleOpen}>
                <FontAwesomeIcon icon={faCartShopping} />
            </Button>
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
                        <h6 className="float-md-start">{item.from.substring(0,5)} - {item.to.substring(0,5)}</h6>
                    </Col>
                </Row>
                )}
                </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col md={12} className="mt-5">
                <h1>Menu</h1>
                {menu.map((type)=>
                <Row key={menu.id} className="mb-4 justify-content-center">
                    <Col sm={12} md={8} >
                    <h3 className="float-md-start">{type.menuName}</h3>
                    </Col>
                    <Col sm={12} md={2} >
                        <p className="float-md-end">{type.menuTypeName}</p>
                    </Col>
                    <div className="clearfix"></div>
                    {type.itemsList.map((product)=>
                     <Product key={product.id} product={product} onAdd={onAdd}/>
                    )}
                </Row>
                )}
                </Col>
                </Row>
            </Container>
        </div>
    )
}