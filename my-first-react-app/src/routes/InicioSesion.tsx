import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import FormularioInicioSesion from '../components/FormularioInicioSesion';

export default function InicioSesion() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Header>
                            <h3>Iniciar Sesion</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioInicioSesion />
                        </Card.Body>
                        <Card.Footer>
                            <p>
                                No tienes cuenta?&nbsp;
                                <Link to='/registro'>Creala aqui</Link>.
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
