import cors from 'cors';
import { Router, Request, Response } from 'express';
import { collection } from '../db';
import log from '../logger';
import env from '../environment';

const router = Router();

const options: cors.CorsOptions = {
	origin: env.getCors(),
};

router.get('/recipe', cors(options), async (req: Request, res: Response) => {
	const result = async () => {
		if (!(req.query.second === '')) {
			const response = await collection
				.find({
					'ingredients.ingredient': {
						$all: [RegExp(`(?:${req.query.first})`), RegExp(`(?:${req.query.second})`)],
					},
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

	log.info(`Method ${req.method} URL: ${req.url} Query: ${JSON.stringify(req.query)}`);
});

export default router;
