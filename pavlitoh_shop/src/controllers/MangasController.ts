import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Manga from '../models/entities/Manga';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    nombre: string;
    precio: number;
}

export default class MangasController extends BaseController {
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
            const autos = await Manga.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(autos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const auto = await Manga.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(auto);
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
    
            const nuevoUsuario = await Manga.registrar(nombre, precio);
    
            res.status(HttpStatusCodes.OK).json(nuevoUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un auto con el mismo modelo.' });
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

            const manga = await Manga.buscarPorId(id);

            await manga.actualizar(nombre, precio);
    
            res.status(HttpStatusCodes.OK).json(manga);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un manga con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const mangas = await Manga.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(mangas);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): MangasController {
        return new MangasController(app, '/mangas');
    }
}