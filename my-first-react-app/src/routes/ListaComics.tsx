import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaComics from '../components/TablaComics';
import './scss/ListaComics.scss';

export default function ListaComics() {
    const navigate = useNavigate();

    function navegarRegistrarComic() {
        navigate('/comics/registrar');
    }

    return (
        <>
            <Container className="lista-comics">
                <div className="cabecera">
                    <h3 className="titulo">Comics</h3>
                    <Button
                        className="boton-registro"
                        variant="primary"
                        onClick={navegarRegistrarComic}
                    >
                        Registrar Comic
                    </Button>
                </div>
                <TablaComics />
            </Container>
        </>
    );
}