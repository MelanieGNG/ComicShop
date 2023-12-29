export default class Comic {
    public id: number;

    public nombre: string;

    public precio: number;

    public fechaCreacion: Date;

    public fechaActualizacion: Date;

    public constructor(
        id: number | undefined,
        nombre: string,
        precio: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date
    ) {
        this.id = id as number;
        this.nombre = nombre;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion as Date;
        this.fechaActualizacion = fechaActualizacion as Date;
    }
}