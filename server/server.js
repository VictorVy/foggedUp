const http = require("http");

const server = http.createServer();
server.on("listening", () => "Listening...");
server.on("request", (req, res) => {
	res.setHeader("Content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.writeHead(200);

	res.end(JSON.stringify({ "testing": 123 }));
});

server.listen(1919, () => {
	console.log("Listening on 1919...");
});

