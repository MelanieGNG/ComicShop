import axios, { AxiosError } from 'axios';
import Comic from '../models/Comic';

interface ComicApiObject {
    id: number;
    nombre: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class ComicsService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/comics';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Comic[]> {
        const respuesta = await axios.get(this.baseUrl, { headers: this.headers });
        const listaComics = respuesta.data.map((comic: ComicApiObject) => (
            new Comic(
                comic.id,
                comic.nombre,
                comic.precio,
                new Date(comic.fechaCreacion),
                new Date(comic.fechaActualizacion)
            )
        ));
        return listaComics;
    }

    public async registrar(comic: Comic): Promise<Comic> {
        const respuesta = await axios.post(
            this.baseUrl,
            comic,
            { headers: this.headers }
        );

        const {
            id,
            nombre,
            precio,
            fechaCreacion,
            fechaActualizacion
        } = respuesta.data;

        const nuevoComic = new Comic(
            id,
            nombre,
            precio,
            new Date(fechaCreacion),
            new Date(fechaActualizacion)
        );

        return nuevoComic;
    }

    // metodo actulizar
    public async actualizar(comic: Comic): Promise<void> {
        await axios.put(
            `${this.baseUrl}/${comic.id}`,
            comic,
            { headers: this.headers }
        );
    }
    

    public async obtenerPorId(id: number): Promise<Comic>{
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
            } = respuesta.data as ComicApiObject;
    
            return new Comic(
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

    public async eliminarComic(id: number): Promise<void>{
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