exports.GET = (req, client) => {
	let result = client
		.db(process.env.DB)
		.collection(process.env.COLLECTION)
		.aggregate([
			{
				$match: {
					'ingredients.ingredient': req.query.ingredient,
					time: parseInt(req.query.time),
				},
			},
		])
		.toArray();

	return result;
};
