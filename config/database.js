require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const options = { useUnifiedTopology: true };

exports.connect = async () => {
	return new Promise(async (resolve, reject) => {
		MongoClient.connect(process.env.URI, options, (error, database) => {
			resolve(error ? error : database);
		});
	});
};
