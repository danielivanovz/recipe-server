import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collection } from '../db';
import log from '../logger';

const router = Router();

router.get('/id', async (req: Request, res: Response) => {
	try {
		const response = await collection.find(new ObjectId(<string>req.query.id)).toArray();

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));

		log.info(`URL: ${req.url} Method ${req.method}`);
	} catch (error) {
		log.info(`Error retrieving recipe by id. Request: ${req.query.id}`);
	}
});

export default router;
