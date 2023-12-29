import {Link} from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import FormularioRegistro from '../components/FormularioRegistro';

export default function Registro() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Header>
                            <h3>Registro</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioRegistro />
                        </Card.Body>
                        <Card.Footer>
                            Ya tienes una cuenta? <Link to='/inicioSesion'>Iniciar Sesion</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
