import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

import router from "./infra/web/routes"
import env from "./config/env";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { refreshTokenMiddleware } from "./middlewares/refreshToken";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const { PORT } = env;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(refreshTokenMiddleware);
app.use(router);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function middleware(req: Request, res: Response, next: NextFunction) {
    console.log("Salut c'est moi le middleware c'est vrai que je parle pas mal mais vas y c'est la life, on a une bouche faut s'en servir, comme de ses mains d'ailleurs celle de celui qui m'a concu et de qui je suis qu'une extension de pensée, une sorte de trace laissé sur ce monde somme toutes, m'a permis de te parler en s'en servant. C'est important de ne pas perdre le fil en remplissant la console de mot comme ce que je fais en ce moment, loin d'être inutile je me sers d'un clavier duement acquis pour la modique somme de 200e, le symbole d'un travail et de longues heures passés hors de mon lit pour pouvoir taper aussi fort sur ces touches qui ont un son si délicieux qu'ils font penser a des caresses alors que mes doigts peuvent en témoigner, la force de mes poignées égallent presque celle de mes bras ...");
    next();
}

app.get("/", middleware, function (req: Request, res: Response) {
    res.send("it Works !");
})

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Error');
    next(error);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})