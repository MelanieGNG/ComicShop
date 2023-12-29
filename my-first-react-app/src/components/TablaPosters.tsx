import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Poster from '../models/Poster';
import PostersService from '../services/PostersService';
import RenglonTablaPosters from './RenglonTablaPosters';

export default function TablaPosters() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [posters, setPosters] = useState<Poster[]>([]);

    async function loadPosters() {
        const servicioPosters = new PostersService();
        const listaPosters = await servicioPosters.obtenerLista();
        setPosters(listaPosters);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadPosters();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    function renderPosters() {
        return posters.map(poster => (
            <RenglonTablaPosters key={poster.id} poster={poster} />
        ));
    }

    return (
        <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Fecha Creacion</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPosters()}
                </tbody>
            </Table>
        </>
    );
}
