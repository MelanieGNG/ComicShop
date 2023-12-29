import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Poster from '../models/entities/Poster';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    nombre: string;
    precio: number;
}

export default class PostersController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);

        this.router.get('/', this.consultarTodos);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.registrar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const posters = await Poster.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(posters);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const poster = await Poster.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(poster);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async registrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Poster.registrar(nombre, precio);
    
            res.status(HttpStatusCodes.OK).json(nuevoUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un poster con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const poster = await Poster.buscarPorId(id);

            await poster.actualizar(nombre, precio);
    
            res.status(HttpStatusCodes.OK).json(poster);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un poster con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const posters = await Poster.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(posters);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): PostersController {
        return new PostersController(app, '/posters');
    }
}