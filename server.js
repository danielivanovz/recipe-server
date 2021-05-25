require('dotenv').config();
const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');

//app.use(express.static('public'));

app.get('/recipe', async function (req, res) {
	const client = new MongoClient(process.env.URI, { useUnifiedTopology: true });

	try {
		await client.connect();

		const collection = client.db(process.env.DB).collection(process.env.COL);

		const query = { 'ingredients.ingredient': 'Uova' };
		const cursor = collection.aggregate([{ $match: query }]);

		const recipe = await cursor.limit(20).toArray();

		return res.json(recipe);
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
});

const listener = app.listen(process.env.PORT, () => console.log('Server is at port:' + listener.address().port));
