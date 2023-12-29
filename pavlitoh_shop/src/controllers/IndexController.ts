import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import BaseController from './BaseController';

export default class IndexController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/index', this.index);
    }

    private async index(req: Request, res: Response): Promise<void> {
        try {
           
            
        } catch (e) {
            if (e instanceof Error && e.message === 'Verifica tu conexión.') {
                res.status(HttpStatusCodes.UNAUTHORIZED).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): IndexController {
        return new IndexController(app, '/index');
    }
}