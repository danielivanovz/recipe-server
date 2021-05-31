const express = require('express');
const cors = require('cors');
const config = require('./config/database');
const api = require('./routes/GET');
const app = express();

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
	api.GET(req, client).then((result) => {
		Object.keys(result).length === 0
			? res.send(
					'Invalid request, example: api?ingredient={nameOfIngredient}}&time={timeInMinutes}&difficulty={Facile/Medio/Difficile}}&category={Primo/Secondo/Dolce}'
			  )
			: res.json(result);
	});
});

app.get('*', cors(), (req, res) => {
	res.send(`404! ${req.params} Invalid URL.`);
});
