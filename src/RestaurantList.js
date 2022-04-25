import { Button, Container, Row, Col, Form} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

function RestaurantList()
{
    return(
        <div>
            <Header/>
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col>
                    <h1>Lista Restauracji </h1>
                        <Form.Control type="text" className="search-bar" placeholder="Szukaj..." />
                        <Button variant="outline-secondary" className="search-icon"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Col>
                </Row>
                <Row>
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
                    <Row className="justify-content-center restaurant-card">
                        <Col md={3}>
                            <img className="restaurant-img" src="https://www.thespruceeats.com/thmb/X6mg_2VBCQQ2X8VrLcPTf8_4ce0=/2733x2050/smart/filters:no_upscale()/chinese-take-out-472927590-57d31fff3df78c5833464e7b.jpg" alt="Zdjecie restauracji"/>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={8}>
                                    <h2>Cing Ciang Ciong</h2>
                                </Col>
                                 <Col md={4}>
                                    Kuchnia Azjatycka
                                 </Col>
                                <Col>
                                <h6><FontAwesomeIcon icon={faMapLocation} /> ul. CaoCao 32, Katowice</h6>
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
                    <Row className="justify-content-center restaurant-card">
                        <Col md={3}>
                            <img className="restaurant-img" src="https://www.feinschmecker.de/uploads/media/940x/03/743-Burger-de-Luxe.jpg?v=1-0" alt="Zdjecie restauracji"/>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={8}>
                                    <h2>Dżon Snoł Burgers</h2>
                                </Col>
                                 <Col md={4}>
                                    Burgery
                                 </Col>
                                <Col>
                                <h6><FontAwesomeIcon icon={faMapLocation} /> ul. Wallstret 71, Katowice</h6>
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
                    <Row className="justify-content-center restaurant-card">
                        <Col md={3}>
                            <img className="restaurant-img" src="https://www.thespruceeats.com/thmb/X6mg_2VBCQQ2X8VrLcPTf8_4ce0=/2733x2050/smart/filters:no_upscale()/chinese-take-out-472927590-57d31fff3df78c5833464e7b.jpg" alt="Zdjecie restauracji"/>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={8}>
                                    <h2>Cing Ciang Ciong</h2>
                                </Col>
                                 <Col md={4}>
                                    Kuchnia Azjatycka
                                 </Col>
                                <Col>
                                <h6><FontAwesomeIcon icon={faMapLocation} /> ul. CaoCao 32, Katowice</h6>
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
                </Row>
            </Container>
        </div>
    )
}

export default RestaurantList