import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Comic from '../models/Comic';
import ComicsService from '../services/ComicsService';
import RenglonTablaComics from './RenglonTablaComics';

export default function TablaComics() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [comics, setComics] = useState<Comic[]>([]);

    async function loadComics() {
        const servicioComics = new ComicsService();
        const listaComics = await servicioComics.obtenerLista();
        setComics(listaComics);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadComics();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    function renderComics() {
        return comics.map(comic => (
            <RenglonTablaComics key={comic.id} comic={comic} />
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
                    {renderComics()}
                </tbody>
            </Table>
        </>
    );
}
