import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioRegistrarManga from '../components/FormularioRegistrarManga';

export default function RegistrarManga() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Registrar Manga</h3>
                    <Link to="/mangas">&lt; Regresar</Link>
                    <FormularioRegistrarManga />
                </Col>
            </Row>
        </>
    );
}