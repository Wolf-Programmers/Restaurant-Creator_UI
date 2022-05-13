import { Button, Container, Row, Col} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect , useState} from "react";
import Header from './Header';

function RestaurantList()
{   
    let now = new Date()
    let today = now.getDay()
    let city = localStorage.getItem('city')

    const [restaurants, setRestaurants]=useState([])
    
    
    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("http://localhost:8080/restaurant/info-city?city=" + city);
            data = await data.json()
            console.warn(data.value)

            if(data.status === 1){
                data = await data.value
                setRestaurants(data)
            }
            else {

            }
        
        }
        fetchData();
        console.warn(JSON.stringify(restaurants))
    },[]);

    return(
        <div>
            <Header/>
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col>
                    <h1>Lista Restauracji </h1>
                        {/* <Form.Control type="text" className="search-bar" placeholder="Szukaj..." />
                        <Button variant="outline-secondary" className="search-icon"><FontAwesomeIcon icon={faSearch} /></Button> */}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Button variant="outline-danger" className="cousine-type">Kuchnia Włoska</Button>
                    <Button variant="outline-danger" className="cousine-type">Kuchnia Azjatycka</Button>
                    <Button variant="outline-danger" className="cousine-type">Kebab</Button>
                    <Button variant="outline-danger" className="cousine-type">Burgery</Button>
                    <Button variant="outline-danger" className="cousine-type">Kuchnia Polska</Button>
                    </Col>
                </Row>
            </Container>
            <div className="clearfix"></div>
            <Container className="mt-5">
                <Row>
                    { restaurants.map((item)=>
                    <Row className="justify-content-center restaurant-card">
                        <Col md={3}>
                            <img className="restaurant-img" src="https://www.feinschmecker.de/uploads/media/940x/03/743-Burger-de-Luxe.jpg?v=1-0" alt="Zdjecie restauracji"/>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={8}>
                                    <h2>{item.name}</h2>
                                </Col>
                                 <Col md={4}>
                                 {item.restaurantTypes[0].name}
                                 </Col>
                                <Col>
                                    <h6><FontAwesomeIcon icon={faMapLocation} /> ul.{item.address}, {item.city}</h6>
                                 </Col>
                                 <Col>
                                    <h6><FontAwesomeIcon icon={faPhone} />{item.phoneNumber}</h6>
                                 </Col>
                                 <Col md={12}>
                                    <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida erat a venenatis aliquet. Fusce ornare rutrum congue. Aenean ex justo, bibendum in erat eget, aliquet facilisis urna. Sed aliquet laoreet tristique. Sed blandit augue a ultricies vulputate. Vivamus vehicula nisl vitae arcu eleifend, eget rhoncus tellus placerat.
                                    </p>
                                 </Col>
                                 <Col><Button variant="danger" className="float-end" >Więcej</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    )
                }
                </Row>
            </Container>
        </div>
    )
}

export default RestaurantList