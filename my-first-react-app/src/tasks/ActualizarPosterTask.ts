import Poster from '../models/Poster';
import PostersService from '../services/PostersService';

export default class ActualizarPosterTask {
    private poster: Poster;

    public constructor(poster: Poster) {
        this.poster = poster;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new PostersService().actualizar(this.poster);
    }

    private validar(): void {
        const { nombre, precio } = this.poster;

        if (!nombre || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
