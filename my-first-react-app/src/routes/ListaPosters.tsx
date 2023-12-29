import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaPosters from '../components/TablaPosters';
import './scss/ListaPosters.scss';

export default function ListaPosters() {
    const navigate = useNavigate();

    function navegarRegistrarPoster() {
        navigate('/posters/registrar');
    }

    return (
        <>
            <Container className="lista-posters">
                <div className="cabecera">
                    <h3 className="titulo">Posters</h3>
                    <Button
                        className="boton-registro"
                        variant="primary"
                        onClick={navegarRegistrarPoster}
                    >
                        Registrar Poster
                    </Button>
                </div>
                <TablaPosters />
            </Container>
        </>
    );
}