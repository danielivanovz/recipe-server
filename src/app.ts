import express, { RequestHandler } from 'express';
import { establishConnection, db, collection } from './db';
import createServer from './server';
import cors from 'cors';
import env from './environment';
import log from './logger';

const startServer = async () => {
	const app = createServer();
	const HOST: string = env.getHost();
	const CORS: string = env.getCors();
	const PORT: number = env.getPort();
	const mongoURI: string = env.getDBUri();

	app.use(cors as (options: typeof CORS) => RequestHandler);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	const s = app.listen(PORT, () => {
		log.info(`Server is running at http://${HOST}:${PORT}`);
	});

	const dbName: string = env.getDBName();
	const dbCollection: string = env.getDBCollection();
	const client = await establishConnection(dbName, dbCollection);
};

startServer();
