import { useNavigate } from 'react-router-dom';
import Manga from '../models/Manga';

interface RenglonTablaMangasProps {
    manga: Manga
}

export default function RenglonTablaMangas(
    { manga }: RenglonTablaMangasProps
) {
    const navigate = useNavigate();

    function navegarADetalleManga() {
        navigate(`/mangas/${manga.id}`);
    }

    return (
        <>
            <tr onClick={navegarADetalleManga}>
                <td>{manga.nombre}</td>
                <td>$ {manga.precio}</td>
                <td>{manga.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}