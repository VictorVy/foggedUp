const http = require("http");

const server = http.createServer();
server.on("listening", () => console.log("Listening..."));
server.on("request", (req, res) => {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let resBody;

	switch(req.method.toUpperCase()) {
		case "GET":
			resBody = "GET response";
			res.writeHead(200);
			break;
		case "POST":
			resBody = "POST response";
			res.writeHead(200);
			break;
		default:
			resBody = "Invalid request";
			res.writeHead(400);
			break;
	}
	
	res.end(resBody);
});

server.listen(1919);
