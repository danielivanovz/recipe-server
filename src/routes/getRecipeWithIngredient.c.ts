import { Router, Request, Response } from 'express';
import { collection } from '../db';
import log from '../logger';

const router = Router();

router.get('/recipe', async (req: Request, res: Response) => {
	const result = async () => {
		if (!(req.query.second === '')) {
			const response = await collection
				.find({
					'ingredients.ingredient': { $all: [req.query.first, req.query.second] },
				})
				.toArray();

			return response;
		} else {
			const response = await collection
				.find({
					'ingredients.ingredient': { $in: [RegExp(`(?:${req.query.first})`)] },
				})
				.toArray();

			return response;
		}
	};

	const response = await result();

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(response));

	log.info(`URL: ${req.url} Method ${req.method} Query: ${JSON.stringify(req.query)}`);
});

export default router;
