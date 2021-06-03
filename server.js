const express = require('express');
const cors = require('cors');
const config = require('./config/database');
const api = require('./routes/GET');
const app = express();
const schema = require('./config/schema.json');

let client;

/**
 * Establishes connection to MongoDB and starts the server
 *
 * @return {Object} client MongoClient instance
 */
config
	.connect()
	.then((response) => (client = response))
	.finally(
		app.listen(8080, () => {
			console.log('Listening on 8080');
		})
	);

/**
 * Logs timestamp, query in JSON and as URL
 */
app.use((req, res, next) => {
	console.log(`Timestamp: ${Date.now()} Request: ${req.originalUrl}`);
	console.log(req.query);
	next();
});

/**
 * Endpoint for recipe search by Ingredient
 *
 * @return {Object} result that will be send as JSON
 */
app.get('/api', cors(), async (req, res) => {
	api.getRecipesByIngredients(req, client).then((result) => {
		Object.keys(result).length === 0 ? res.json(schema) : res.json(result);
	});
});

/**
 * Endpoint for recipe search by ID
 *
 * @return {Object} result that will be send as JSON
 */
app.get('/id', cors(), async (req, res) => {
	api.getRecipesByID(req, client).then((result) => {
		Object.keys(result).length === 0 ? res.json(schema) : res.json(result);
	});
});

/**
 * Endpoint for all unique ingredients search
 *
 * @return {Object} result that will be send as JSON
 */
app.get('/ingredients', cors(), async (req, res) => {
	api.getUniqueIngredients(req, client).then((result) => {
		console.log(result);
		Object.keys(result).length === 0 ? res.json(schema) : res.json(result);
	});
});

/**
 * Endpoint for 404 Error
 */
app.get('*', cors(), (req, res) => {
	res.send(`404! Invalid URL.`);
});
