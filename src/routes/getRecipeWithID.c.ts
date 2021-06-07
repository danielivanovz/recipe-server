import { Router, Request, Response, RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { collection } from '../db';
import log from '../logger';
import env from '../environment';
import cors from 'cors';

const router = Router();

const options: cors.CorsOptions = {
	origin: env.getCors(),
};

router.get('/id', cors(options), async (req: Request, res: Response) => {
	try {
		const response = await collection.find(new ObjectId(<string>req.query.id)).toArray();

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
		log.info(`Method ${req.method} URL: ${req.url} `);
	} catch (error) {
		log.error(`Error retrieving recipe by id. Request: ${req.query.id}`);
	}
});

export default router;
