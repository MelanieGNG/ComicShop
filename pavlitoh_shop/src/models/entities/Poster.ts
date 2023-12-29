import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'posters' })
export default class Poster {
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

        const repositorioUsuarios = await Poster.obtenerRepositorioPosters();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Poster[]> {
        const repositorioUsuarios = await Poster.obtenerRepositorioPosters();
        return repositorioUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Poster> {
        const repositorioUsuarios = await Poster.obtenerRepositorioPosters();

        const poster = await repositorioUsuarios.findOneBy({ id });

        if (!poster) {
            throw new Error('ErrorAutoNoEncontrado');
        }

        return poster;
    }

    public static async registrar(
        nombre: string,
        precio: number
    ): Promise<Poster> {
        const repositorioUsuarios = await Poster.obtenerRepositorioPosters();

        const fechaCreacion = new Date();

        const poster = new Poster(
            undefined,
            nombre,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(poster);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return poster;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioUsuarios = await Poster.obtenerRepositorioPosters();
        await repositorioUsuarios.delete(id);
    }

    private static async obtenerRepositorioPosters(): Promise<Repository<Poster>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Poster);
    }
}