import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'mangas' })
export default class Manga {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 120, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'double', nullable: false })
    public precio: number;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        nombre: string,
        precio: number,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombre = nombre;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public async actualizar(
        nombre: string,
        precio: number
    ): Promise<void> {
        this.nombre = nombre;
        this.precio = precio;
        this.fechaActualizacion = new Date();

        const repositorioUsuarios = await Manga.obtenerRepositorioMangas();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Manga[]> {
        const repositorioUsuarios = await Manga.obtenerRepositorioMangas();
        return repositorioUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Manga> {
        const repositorioUsuarios = await Manga.obtenerRepositorioMangas();

        const manga = await repositorioUsuarios.findOneBy({ id });

        if (!manga) {
            throw new Error('ErrorAutoNoEncontrado');
        }

        return manga;
    }

    public static async registrar(
        nombre: string,
        precio: number
    ): Promise<Manga> {
        const repositorioUsuarios = await Manga.obtenerRepositorioMangas();

        const fechaCreacion = new Date();

        const manga = new Manga(
            undefined,
            nombre,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(manga);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return manga;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioUsuarios = await Manga.obtenerRepositorioMangas();
        await repositorioUsuarios.delete(id);
    }

    private static async obtenerRepositorioMangas(): Promise<Repository<Manga>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Manga);
    }
}