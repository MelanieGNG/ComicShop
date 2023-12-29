import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaMangas from '../components/TablaMangas';
import './scss/ListaMangas.scss';

export default function ListaMangas() {
    const navigate = useNavigate();

    function navegarRegistrarManga() {
        navigate('/mangas/registrar');
    }

    return (
        <>
            <Container className="lista-mangas">
                <div className="cabecera">
                    <h3 className="titulo">Mangas</h3>
                    <Button
                        className="boton-registro"
                        variant="primary"
                        onClick={navegarRegistrarManga}
                    >
                        Registrar Manga
                    </Button>
                </div>
                <TablaMangas />
            </Container>
        </>
    );
}