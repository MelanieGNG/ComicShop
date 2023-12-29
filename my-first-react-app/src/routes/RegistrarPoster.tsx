import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioRegistrarPoster from '../components/FormularioRegistrarPoster';

export default function RegistrarPoster() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Registrar Poster</h3>
                    <Link to="/posters">&lt; Regresar</Link>
                    <FormularioRegistrarPoster />
                </Col>
            </Row>
        </>
    );
}