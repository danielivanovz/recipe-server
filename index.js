const express = require('express');
const cors = require('cors');
const config = require('./config/database');
const api = require('./routes/GET');
const app = express();
const schema = require('./config/schema.json');

let client;

config
	.connect()
	.then((response) => (client = response))
	.finally(
		app.listen(8080, () => {
			console.log('Listening on 8080');
		})
	);

app.use((req, res, next) => {
	console.log(`Timestamp: ${Date.now()} Request: ${req.originalUrl}`);
	console.log(req.query);
	next();
});

app.get('/api', cors(), async (req, res) => {
	api.getRecipes(req, client).then((result) => {
		Object.keys(result).length === 0 ? res.json(schema) : res.json(result);
	});
});

app.get('/ingredients', cors(), async (req, res) => {
	api.getUniqueIngredients(req, client).then((result) => {
		console.log(result);
		Object.keys(result).length === 0 ? res.json(schema) : res.json(result);
	});
});

app.get('*', cors(), (req, res) => {
	res.send(`404! Invalid URL.`);
});
