import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioRegistrarComic from '../components/FormularioRegistrarComic';

export default function RegistrarComic() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Registrar Comic</h3>
                    <Link to="/comics">&lt; Regresar</Link>
                    <FormularioRegistrarComic />
                </Col>
            </Row>
        </>
    );
}