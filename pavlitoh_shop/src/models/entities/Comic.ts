import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'comics' })
export default class Comic {
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

        const repositorioUsuarios = await Comic.obtenerRepositorioComics();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Comic[]> {
        const repositorioUsuarios = await Comic.obtenerRepositorioComics();
        return repositorioUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Comic> {
        const repositorioUsuarios = await Comic.obtenerRepositorioComics();

        const comic = await repositorioUsuarios.findOneBy({ id });

        if (!comic) {
            throw new Error('ErrorAutoNoEncontrado');
        }

        return comic;
    }

    public static async registrar(
        nombre: string,
        precio: number
    ): Promise<Comic> {
        const repositorioUsuarios = await Comic.obtenerRepositorioComics();

        const fechaCreacion = new Date();

        const comic = new Comic(
            undefined,
            nombre,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(comic);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return comic;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioUsuarios = await Comic.obtenerRepositorioComics();
        await repositorioUsuarios.delete(id);
    }

    private static async obtenerRepositorioComics(): Promise<Repository<Comic>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Comic);
    }
}
