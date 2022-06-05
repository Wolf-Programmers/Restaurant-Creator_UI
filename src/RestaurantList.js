import { Button, Container, Row, Col} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect , useState} from "react";
import Header from './Header';

function RestaurantList()
{   
    let city = localStorage.getItem('city')

    const [restaurants, setRestaurants]=useState([])
    
    
    useEffect (()=>{
        async function fetchData(){
        let data = await fetch("https://creator.azurewebsites.net/restaurant/info-city?city=" + city);
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
                  </Col>
                </Row>
            </Container>
            <div className="clearfix"></div>
            <Container className="mt-5">
                <Row>
                    { restaurants.map((item)=>
                    <Row key={item.id} className="justify-content-center restaurant-card">
                        <Col md={3}>
                            <img className="restaurant-img" src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80" alt="Zdjecie restauracji"/>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col className="mb-4" md={8}>
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
                                    <div className="mb-5"></div>
                                 </Col>
                                 <Col>
                                 <a href={"/restaurant/" + item.id}><Button variant="danger" className="float-end" >Więcej</Button></a>
                                 </Col>
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