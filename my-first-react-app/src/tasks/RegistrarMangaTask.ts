import Manga from '../models/Manga';
import MangasService from '../services/MangasService';

export default class RegistrarMangaTask {
    private manga: Manga;

    public constructor(manga: Manga) {
        this.manga = manga;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new MangasService().registrar(this.manga);
    }

    private validar(): void {
        const { nombre, precio } = this.manga;

        if (!nombre || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
