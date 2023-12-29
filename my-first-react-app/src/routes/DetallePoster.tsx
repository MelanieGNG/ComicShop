import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Poster from '../models/Poster';
import PostersService from '../services/PostersService';
import FormularioActualizarPoster from '../components/FormularioActualizarPoster';

export default function DetallePoster() {
    const { idPoster } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [poster, setPoster] = useState<Poster | undefined>(undefined);

    async function loadPoster() {
        const id = parseInt(idPoster as string);

        if (isNaN(id)) {
            navigate('/posters');
            return;
        }

        try {
            const servicioPosters = new PostersService();
            const posterEncontrado = await servicioPosters.obtenerPorId(id);
            setPoster(posterEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                // do nothing
            } else {
                window.alert('Ha ocurrido un error desconocido.');
                navigate('/posters');
                return;
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadPoster();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    if (!poster) {
        return (
            <>
                <h3>Error 404: Poster no encontrado.</h3>
            </>
        );
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{poster.nombre}</h3>
                    <Link to="/posters">&lt; Regresar</Link>
                    <FormularioActualizarPoster poster={poster} />
                </Col>
            </Row>
        </>
    );
}
