/**
 * Gets all unique ingredients
 *
 * @return {Array} result with all ingredients
 */

const { ObjectId } = require('mongodb');

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
 * Gets all recipes with @param ingredient
 *
 * @return {Array} result with all recipes
 */
exports.getRecipesByIngredients = (req, client) => {
	if (!(req.query.second === '')) {
		let result = client
			.db(process.env.DB)
			.collection(process.env.COLLECTION)
			.find({
				'ingredients.ingredient': { $all: [req.query.first, req.query.second] },
			})
			.toArray();
		return result;
	} else {
		let result = client
			.db(process.env.DB)
			.collection(process.env.COLLECTION)
			.find({
				'ingredients.ingredient': { $all: [req.query.first] },
			})
			.toArray();
		return result;
	}
};

/**
 * Gets all recipes with @param id
 *
 * @return {Array} result with all recipes
 */
exports.getRecipesByID = (req, client) => {
	console.log(req.query);

	let result = client.db(process.env.DB).collection(process.env.COLLECTION).find(ObjectId(req.query.id)).toArray();

	return result;
};
