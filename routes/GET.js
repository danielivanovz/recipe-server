/**
 * Gets all unique ingredients and returns an Object
 *
 * @return {Object} result with all ingredients
 */
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

/**
 * Gets all recipes with @param ingredient and returns an Object
 *
 * @return {Object} result with all recipes
 */
exports.getRecipes = (req, client) => {
	let result = client
		.db(process.env.DB)
		.collection(process.env.COLLECTION)
		.aggregate([
			{
				$match: {
					'ingredients.ingredient': req.query.ingredient,
					// time: parseInt(req.query.time),
					// difficulty: req.query.difficulty,
					// category: req.query.category,
				},
			},
		])
		.toArray();

	return result;
};
