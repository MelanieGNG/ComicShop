import { useNavigate } from 'react-router-dom';
import Comic from '../models/Comic';

interface RenglonTablaComicsProps {
    comic: Comic
}

export default function RenglonTablaMangas(
    { comic }: RenglonTablaComicsProps
) {
    const navigate = useNavigate();

    function navegarADetalleComic() {
        navigate(`/comics/${comic.id}`);
    }

    return (
        <>
            <tr onClick={navegarADetalleComic}>
                <td>{comic.nombre}</td>
                <td>$ {comic.precio}</td>
                <td>{comic.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}