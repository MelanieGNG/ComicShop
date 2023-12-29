import AuthenticationService from "../services/AuthenticationService";

interface DatosIniciarSesionUsuarioTask {
    nombreUsuario: string;
    password: string;
}

export default class IniciarSesionUsuarioTask {
    private datosInicioSesion: DatosIniciarSesionUsuarioTask;

    public constructor(datosInicioSesion: DatosIniciarSesionUsuarioTask) {
        this.datosInicioSesion = datosInicioSesion;
    }
    
    public async execute(): Promise<void> {
        this.verificarDatosInicioSesion();
        const tokenSesion = await this.iniciarSesion();
        localStorage.setItem('tokenSesion', tokenSesion);
    }

    private async iniciarSesion(): Promise<string> {
        const { nombreUsuario, password } = this.datosInicioSesion;

        const servicioAutenticacion = new AuthenticationService();
        
        const tokenSesion =
            await servicioAutenticacion.iniciarSesionUsuario({
                nombreUsuario,
                password
            });
        
        return tokenSesion;
    }

    private verificarDatosInicioSesion(): void {
        const { nombreUsuario, password } = this.datosInicioSesion;
        if (!nombreUsuario || !password) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
