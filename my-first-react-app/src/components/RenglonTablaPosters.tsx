import { useNavigate } from 'react-router-dom';
import Poster from '../models/Poster';

interface RenglonTablaPostersProps {
    poster: Poster
}

export default function RenglonTablaPosters(
    { poster }: RenglonTablaPostersProps
) {
    const navigate = useNavigate();

    function navegarADetallePoster() {
        navigate(`/posters/${poster.id}`);
    }

    return (
        <>
            <tr onClick={navegarADetallePoster}>
                <td>{poster.nombre}</td>
                <td>$ {poster.precio}</td>
                <td>{poster.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}