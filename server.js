require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { MongoClient } = require('mongodb');

app.get('/:ingredient', cors(), async (req, res) => {
	console.log(req.params.ingredient);
	const client = new MongoClient(process.env.URI, { useUnifiedTopology: true });

	try {
		await client.connect();

		const collection = client.db(process.env.DB).collection(process.env.COL);
		const query = { 'ingredients.ingredient': `${req.params.ingredient}` };
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
