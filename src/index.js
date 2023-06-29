const http = require('http');
const { URL } = require('url')
const port = 3000;

const bodyParser = require("./helpers/bodyParser");
const routes = require("./routes")

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${ request.url }`);
  console.log(`Request Method: ${ request.method } | EndPoint: ${ parsedUrl.pathname }`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split("/").filter((routeItem) => Boolean(routeItem));
  if(splitEndpoint.length > 1){
    pathname = `/${splitEndpoint[0]}/:id`
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => routeObj.endpoint === pathname && routeObj.method === request.method);
  if(route){
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {
        "Content-Type": "text/html"
      });
      response.end(JSON.stringify(body));
    };

    if(["POST", "PUT"].includes(request.method)){
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response); 
    }

  }else {
    response.writeHead(404, {
      "Content-Type": "text/html"
    });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
    
  }


});

server.listen(port, () => console.log(`Server started at http://localhost:${port}`))