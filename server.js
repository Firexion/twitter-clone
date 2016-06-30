import koa from 'koa'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'
import mongoose from 'mongoose'
import graphQLHTTP from 'koa-graphql'
import proxy from 'koa-proxy'

import schema from './data/schema'

const APP_PORT = 3000;
const MONGO_PORT = 27017;
const GRAPHQL_PORT = 5000;

// Connect to the db
mongoose.connect('mongodb://localhost:${MONGO_PORT}/twitter-react');

// Expose a GraphQL endpoint
const graphQLServer = new koa();

graphQLServer.use(mount('/', convert(graphQLHTTP({ schema, pretty: true, graphiql: true }))));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));


// Serve static resources
const app = new koa();

app.use(mount('/graphql', proxy({
  url: `http://localhost:${GRAPHQL_PORT}`
})));

app.use(serve(__dirname + '/dist'));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
