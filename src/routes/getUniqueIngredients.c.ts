import { Router, Request, Response } from 'express';
import { collection } from '../db';
import log from '../logger';
import env from '../environment';
import cors from 'cors';

const router = Router();

const options: cors.CorsOptions = {
	origin: env.getCors(),
};

router.get('/ingredients', async (req: Request, res: Response) => {
	try {
		const response = await collection
			.aggregate([
				{
					$unwind: '$ingredients',
				},
				{
					$group: {
						_id: null,
						ingredients: {
							$addToSet: '$ingredients.ingredient',
						},
					},
				},
			])
			.toArray();

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));

		log.info(`Method ${req.method} URL: ${req.url}`);
	} catch (error) {
		log.error;
	}
});

export default router;
