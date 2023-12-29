import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Manga from '../models/Manga';
import MangasService from '../services/MangasService';
import RenglonTablaMangas from './RenglonTablaMangas';

export default function TablaMangas() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mangas, setMangas] = useState<Manga[]>([]);

    async function loadMangas() {
        const servicioMangas = new MangasService();
        const listaMangas = await servicioMangas.obtenerLista();
        setMangas(listaMangas);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadMangas();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    function renderMangas() {
        return mangas.map(manga => (
            <RenglonTablaMangas key={manga.id} manga={manga} />
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
                    {renderMangas()}
                </tbody>
            </Table>
        </>
    );
}
