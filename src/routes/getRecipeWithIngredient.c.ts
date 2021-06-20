import cors from 'cors';
import { Router, Request, Response } from 'express';
import { collection } from '../db';
import log from '../logger';
import env from '../environment';

const router = Router();

const options: cors.CorsOptions = {
	origin: env.getCors(),
};

const removeLastChar = (word: any) => {
	return word != '' ? word.slice(0, -1) : word;
};

const checkOccurancy = async (req: Request) => {
	const occurancy = await collection
		.aggregate([
			{
				$match: {
					'ingredients.ingredient': new RegExp(`(?:${removeLastChar(req.query.first)}.*)`),
				},
			},
			{
				$unwind: {
					path: '$ingredients',
				},
			},
			{
				$group: {
					_id: '$ingredients.ingredient',
					count: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					count: -1,
				},
			},
		])
		.limit(50)
		.toArray();

	return occurancy;
};

router.get('/recipe', cors(options), async (req: Request, res: Response) => {
	const result = () => {
		if (!(req.query.second === '')) {
			const response = collection
				.find({
					'ingredients.ingredient': {
						$all: [
							RegExp(`(?:${removeLastChar(req.query.first)}[aeiou])`),
							RegExp(`(?:${removeLastChar(req.query.second)}[aeiou])`),
						],
					},
				})
				.toArray();

			return response;
		} else {
			const response = collection
				.find({
					'ingredients.ingredient': { $in: [RegExp(`(?:${removeLastChar(req.query.first)}[aeiou])`)] },
				})
				.limit(50)
				.toArray();

			return response;
		}
	};

	const response = await result();
	response.push(await checkOccurancy(req));

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(response, null, 2));
	log.info(`Method ${req.method} URL: ${req.url} Query: ${JSON.stringify(req.query)}`);
});

export default router;
