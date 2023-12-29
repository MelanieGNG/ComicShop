import axios, { AxiosError } from 'axios';

interface DatosRegistroUsuario {
    nombreCompleto: string;
    nombreUsuario: string;
    password: string;
}

interface DatosInicioSesionUsuario {
    nombreUsuario: string;
    password: string;
}

export default class AuthenticationService {
    private baseUrl: string;

    public constructor() {
        this.baseUrl = 'http://localhost:3001/auth';
    }

    public async registrarNuevoUsuario(
        datosRegistro: DatosRegistroUsuario
    ): Promise<string> {
        try {
            const respuesta = await axios.post(
                `${this.baseUrl}/registro`,
                datosRegistro
            );
    
            const tokenSesion = respuesta.data.tokenSesion as string;
    
            return tokenSesion;
        } catch (e) {
            if (e instanceof AxiosError && e.response!.status === 409) {
                throw new Error('ErrorNombreUsuarioDuplicado');
            }
            throw e;
        }
    }

    public async iniciarSesionUsuario(
        datosInicioSesion: DatosInicioSesionUsuario
    ): Promise<string> {
        const respuesta = await axios.post(
            `${this.baseUrl}/iniciarSesion`,
            datosInicioSesion
        );

        const tokenSesion = respuesta.data.tokenSesion as string;

        return tokenSesion;
    }
}
