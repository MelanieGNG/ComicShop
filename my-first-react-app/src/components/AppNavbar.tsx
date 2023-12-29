import { useState } from 'react';
import { Container, Nav, Navbar, Modal, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

export default function AppNavbar() {
    const navigate = useNavigate();

    const[show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function cerrarSesion(){
        localStorage.removeItem('tokenSesion');
        navigate('/inicioSesion');
    }

    return (
        <>
            <Navbar bg='light'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/index">
                        Pavlitoh Shop
                    </Navbar.Brand>
                    
                    
                    <Nav>
                        <Nav.Link onClick={handleShow}>
                            Cerrar Sesion
                        </Nav.Link>

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Pavlitoh Shop
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Seguro de que quieres cerrar sesión?
                            </Modal.Body>
                            <Modal.Footer> 
                                <Button variant="secondary" onClick={cerrarSesion}>
                                    Aceptar
                                </Button>
                                <Button variant="light" onClick={handleClose}>
                                    Cancelar
                                </Button>
                            
                            </Modal.Footer>
                        </Modal>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
