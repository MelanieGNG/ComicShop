import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import AuthenticationController from './controllers/AuthenticationController';
import MangasController from './controllers/MangasController';
import ComicsController from './controllers/ComicsController';
import PostersController from './controllers/PostersController';
import IndexController from './controllers/IndexController';


const app: Application =  express();

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

AuthenticationController.mount(app);
MangasController.mount(app);
PostersController.mount(app);
ComicsController.mount(app);
IndexController.mount(app);


export default app;
