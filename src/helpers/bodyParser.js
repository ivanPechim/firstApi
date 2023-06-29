function bodyParser(request, callback) {
  console.log("chegou aqu i no bodyParser");
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });


  request.on("end", () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });

};

module.exports = bodyParser;