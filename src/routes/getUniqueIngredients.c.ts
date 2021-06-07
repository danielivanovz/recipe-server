import { Router, Request, Response } from 'express';
import { collection } from '../db';
import log from '../logger';

const router = Router();

router.get('/ingredients', async (req: Request, res: Response) => {
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

	log.info(`URL: ${req.url} Method ${req.method}`);
});

export default router;
