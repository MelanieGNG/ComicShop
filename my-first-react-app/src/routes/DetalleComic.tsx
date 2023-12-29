import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Comic from '../models/Comic';
import ComicsService from '../services/ComicsService';
import FormularioActualizarComic from '../components/FormularioActualizarComic';

export default function DetalleComic() {
    const { idComic } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [comic, setComic] = useState<Comic | undefined>(undefined);

    async function loadComic() {
        const id = parseInt(idComic as string);

        if (isNaN(id)) {
            navigate('/comics');
            return;
        }

        try {
            const servicioComics = new ComicsService();
            const comicEncontrado = await servicioComics.obtenerPorId(id);
            setComic(comicEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                // do nothing
            } else {
                window.alert('Ha ocurrido un error desconocido.');
                navigate('/comics');
                return;
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadComic();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    if (!comic) {
        return (
            <>
                <h3>Error 404: Comic no encontrado.</h3>
            </>
        );
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{comic.nombre}</h3>
                    <Link to="/comics">&lt; Regresar</Link>
                    <FormularioActualizarComic comic={comic} />
                </Col>
            </Row>
        </>
    );
}
