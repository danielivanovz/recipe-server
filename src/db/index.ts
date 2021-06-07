import { MongoClient, Db, Collection } from 'mongodb';
import log from '../logger';
import env from '../environment';

interface MongoOptions {
	readonly useUnifiedTopology: boolean;
	readonly ignoreUndefined?: boolean;
}

const options: MongoOptions = {
	useUnifiedTopology: true,
	ignoreUndefined: true,
};

const mongoURI: string = env.getDBUri();

export const establishConnection = async (dbName: string, dbCollection: string) => {
	const client = new MongoClient(mongoURI, options);

	const connected = await client
		.connect()
		.finally(() => log.info('Connection to the database established, status: ' + client['topology'].s.state));

	db = connected.db(dbName);
	collection = db.collection(dbCollection);

	return client;
};

export let db: Db;

export let collection: Collection;
