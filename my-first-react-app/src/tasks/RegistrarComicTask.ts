import Comic from '../models/Comic';
import ComicsService from '../services/ComicsService';

export default class RegistrarComicTask {
    private comic: Comic;

    public constructor(comic: Comic) {
        this.comic = comic;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new ComicsService().registrar(this.comic);
    }

    private validar(): void {
        const { nombre, precio } = this.comic;

        if (!nombre || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
