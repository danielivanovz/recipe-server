exports.GET = (req, client) => {
	let result = client
		.db(process.env.DB)
		.collection(process.env.COLLECTION)
		.aggregate([
			{
				$match: {
					'ingredients.ingredient': req.query.ingredient,
					time: parseInt(req.query.time),
					difficulty: req.query.difficulty,
				},
			},
		])
		.toArray();

	return result;
};

// GET http://localhost:8080/api?ingredient=Arance&time=15&difficulty=Facile
