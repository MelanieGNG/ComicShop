import axios, { AxiosError } from 'axios';


export default class ComicsService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/index';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }
}