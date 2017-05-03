const restify = require('restify');

function respond(req:any, res:any, next:any) {
  res.send({"name" : req.params.name});
  next();
}

const server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});