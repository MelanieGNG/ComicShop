import axios, { AxiosError } from 'axios';
import Manga from '../models/Manga';

interface MangaApiObject {
    id: number;
    nombre: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class MangasService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/mangas';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Manga[]> {
        const respuesta = await axios.get(this.baseUrl, { headers: this.headers });
        const listaMangas = respuesta.data.map((manga: MangaApiObject) => (
            new Manga(
                manga.id,
                manga.nombre,
                manga.precio,
                new Date(manga.fechaCreacion),
                new Date(manga.fechaActualizacion)
            )
        ));
        return listaMangas;
    }

    public async registrar(manga: Manga): Promise<Manga> {
        const respuesta = await axios.post(
            this.baseUrl,
            manga,
            { headers: this.headers }
        );

        const {
            id,
            nombre,
            precio,
            fechaCreacion,
            fechaActualizacion
        } = respuesta.data;

        const nuevoManga = new Manga(
            id,
            nombre,
            precio,
            new Date(fechaCreacion),
            new Date(fechaActualizacion)
        );

        return nuevoManga;
    }

    // metodo actulizar
    public async actualizar(manga: Manga): Promise<void> {
        await axios.put(
            `${this.baseUrl}/${manga.id}`,
            manga,
            { headers: this.headers }
        );
    }
    

    public async obtenerPorId(id: number): Promise<Manga>{
        try {
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );
    
            const {
                nombre,
                precio,
                fechaCreacion,
                fechaActualizacion
            } = respuesta.data as MangaApiObject;
    
            return new Manga(
                id,
                nombre,
                precio,
                new Date(fechaCreacion),
                new Date(fechaActualizacion)
            );
        } catch (e){
            if (e instanceof AxiosError && e.response){
                if (e.response.status === 404) {
                    throw new Error('ErrorAutoNoEncontrado');
                }
            }

            throw e;
        }
    }

    public async eliminarManga(id: number): Promise<void>{
        try {
            const respuesta = await axios.delete(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );

        } catch (e){

            throw e;
        }
    }

}