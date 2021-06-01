/**
 * Gets all unique ingredients and returns an Object
 *
 * @return {Array} result with all ingredients
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
 * @return {Array} result with all recipes
 */
exports.getRecipes = (req, client) => {
	if ('second' in req.query) {
		let result = client
			.db(process.env.DB)
			.collection(process.env.COLLECTION)
			.find({
				'ingredients.ingredient': { $all: [req.query.first, req.query.second] },
			})
			.toArray();
		return result;
	} else {
		if ('first' in req.query) {
			let result = client
				.db(process.env.DB)
				.collection(process.env.COLLECTION)
				.find({
					'ingredients.ingredient': { $all: [req.query.first] },
				})
				.toArray();
			return result;
		}
	}
};
