import { Link, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

function Header()
{
    let navigate = useNavigate();
    function logOut(){
        localStorage.clear();
        <Alert variant="success">
        <Alert.Heading>Pomyślnie wylogowano</Alert.Heading>
    </Alert>
        navigate('/login');
    }

    return(
        <div>
        <Navbar bg="danger" variant="dark">
            <Container>
            <Navbar.Brand><FontAwesomeIcon icon={faUtensils} /> myRestaurant</Navbar.Brand>
            <Nav className="me-auto navbar-links">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
            <Nav className="navbar-links">
                {
                    localStorage.getItem('user-info') ?
                    <>
                    <Nav.Link as={Link} to="/manage">Zarządzaj</Nav.Link>
                    <Nav.Link onClick={logOut}>Wyloguj</Nav.Link>
                    </> : <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                    </>
                }  
            </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default Header