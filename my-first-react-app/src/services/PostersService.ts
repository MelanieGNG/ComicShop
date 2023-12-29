import axios, { AxiosError } from 'axios';
import Poster from '../models/Poster';

interface PosterApiObject {
    id: number;
    nombre: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class PostersService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/posters';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Poster[]> {
        const respuesta = await axios.get(this.baseUrl, { headers: this.headers });
        const listaPosters = respuesta.data.map((poster: PosterApiObject) => (
            new Poster(
                poster.id,
                poster.nombre,
                poster.precio,
                new Date(poster.fechaCreacion),
                new Date(poster.fechaActualizacion)
            )
        ));
        return listaPosters;
    }

    public async registrar(poster: Poster): Promise<Poster> {
        const respuesta = await axios.post(
            this.baseUrl,
            poster,
            { headers: this.headers }
        );

        const {
            id,
            nombre,
            precio,
            fechaCreacion,
            fechaActualizacion
        } = respuesta.data;

        const nuevoPoster = new Poster(
            id,
            nombre,
            precio,
            new Date(fechaCreacion),
            new Date(fechaActualizacion)
        );

        return nuevoPoster;
    }

    // metodo actulizar
    public async actualizar(poster: Poster): Promise<void> {
        await axios.put(
            `${this.baseUrl}/${poster.id}`,
            poster,
            { headers: this.headers }
        );
    }
    

    public async obtenerPorId(id: number): Promise<Poster>{
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
            } = respuesta.data as PosterApiObject;
    
            return new Poster(
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

    public async eliminarPoster(id: number): Promise<void>{
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