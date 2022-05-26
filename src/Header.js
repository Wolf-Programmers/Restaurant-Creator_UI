import { Link, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Alert, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

function Header()
{
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
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
                    <NavDropdown title="Zarządzaj">
                        <NavDropdown.Item as={Link} to="/manage/menu">Menu</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/manage/restaurant">Restauracja</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/manage/emploee">Pracownicy</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={user.name}>
                        <NavDropdown.Item onClick={logOut}>Wyloguj</NavDropdown.Item>
                    </NavDropdown>
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