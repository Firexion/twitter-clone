import koa from 'koa';
import serve from 'koa-static'

const app = new koa();

app.use(serve(__dirname + '/dist'));

app.listen(3000);

console.log('listening on port 3000');