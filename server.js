import koa from 'koa'
import serve from 'koa-static'
import {MongoClient} from 'mongodb'

const APP_PORT = 3000;


(async () => {

		// Connect to the db
		const db = await MongoClient.connect("mongodb://localhost:27017/twitter-react");

		const users = await db.collection("users").find({}).toArray();
		console.log(users);


		// Serve static resources
		const app = new koa();

		app.use(serve(__dirname + '/dist'));

		app.listen(APP_PORT, () => {
		  console.log(`App is now running on http://localhost:${APP_PORT}`);
		});
})();