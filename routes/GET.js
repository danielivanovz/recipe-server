exports.getUniqueIngredients = (req, client) => {
	let result = client
		.db(process.env.DB)
		.collection(process.env.COLLECTION)
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

	return result;
};

exports.getRecipes = (req, client) => {
	let result = client
		.db(process.env.DB)
		.collection(process.env.COLLECTION)
		.aggregate([
			{
				$match: {
					'ingredients.ingredient': req.query.ingredient,
					time: parseInt(req.query.time),
					difficulty: req.query.difficulty,
					category: req.query.category,
				},
			},
		])
		.toArray();

	return result;
};
