require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const options = { useUnifiedTopology: true };

/**
 * Connect to MongoDB using a URI to the cluster
 * of the databse as specified in README
 *
 * @return {Object} database as a Promise
 */
exports.connect = async () => {
	return new Promise(async (resolve, reject) => {
		MongoClient.connect(process.env.URI, options, (error, database) => {
			database.isConnected
				? console.log('Connection to database established')
				: console.log('Error establishing a database connection');
			resolve(error ? error : database);
		});
	});
};
