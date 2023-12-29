import AuthenticationService from '../services/AuthenticationService';

interface DatosRegistrarUsuarioTask {
    nombreCompleto: string;
    nombreUsuario: string;
    password: string;
    verificarPassword: string;
}

export default class RegistrarUsuarioTask {
    private datosRegistrarUsuario: DatosRegistrarUsuarioTask;

    public constructor(datosRegistrarUsuario: DatosRegistrarUsuarioTask) {
        this.datosRegistrarUsuario = datosRegistrarUsuario;
    }

    public async execute(): Promise<void> {
        this.validarDatosRegistro();
        const tokenSesion = await this.registrarUsuario();
        localStorage.setItem('tokenSesion', tokenSesion);
    }

    private async registrarUsuario(): Promise<string> {
        const {
            nombreCompleto,
            nombreUsuario,
            password
        } = this.datosRegistrarUsuario;

        const servicioAutenticacion = new AuthenticationService();

        const tokenSesion =
            await servicioAutenticacion.registrarNuevoUsuario({
                nombreCompleto,
                nombreUsuario,
                password
            });
        
        return tokenSesion;
    }

    private validarDatosRegistro(): void {
        const {
            nombreCompleto,
            nombreUsuario,
            password,
            verificarPassword
        } = this.datosRegistrarUsuario;

        if (!nombreCompleto || !nombreUsuario || !password || !verificarPassword) {
            throw new Error('ErrorFormularioIncompleto');
        }

        if (password !== verificarPassword) {
            throw new Error('ErrorPasswordsNoCoinciden');
        }
    }
}
