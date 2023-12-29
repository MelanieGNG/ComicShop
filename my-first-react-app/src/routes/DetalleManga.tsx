import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Manga from '../models/Manga';
import MangasService from '../services/MangasService';
import FormularioActualizarManga from '../components/FormularioActualizarManga';

export default function DetalleManga() {
    const { idManga } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [manga, setManga] = useState<Manga | undefined>(undefined);

    async function loadManga() {
        const id = parseInt(idManga as string);

        if (isNaN(id)) {
            navigate('/mangas');
            return;
        }

        try {
            const servicioMangas = new MangasService();
            const mangaEncontrado = await servicioMangas.obtenerPorId(id);
            setManga(mangaEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                // do nothing
            } else {
                window.alert('Ha ocurrido un error desconocido.');
                navigate('/mangas');
                return;
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadManga();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    if (!manga) {
        return (
            <>
                <h3>Error 404: Manga no encontrado.</h3>
            </>
        );
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{manga.nombre}</h3>
                    <Link to="/mangas">&lt; Regresar</Link>
                    <FormularioActualizarManga manga={manga} />
                </Col>
            </Row>
        </>
    );
}
