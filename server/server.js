const http = require("http");
const formidable = require("formidable");

const server = http.createServer();
server.on("listening", () => console.log("Listening..."));
server.on("request", (req, res) => {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let resCode = 400;
	let resBody = "Invalid request";

	switch(req.method.toUpperCase()) {
		case "GET":
			resCode = 200;
			resBody = "GET response";
			break;
		case "POST":
			if (req.url === "/up" || res.getHeader("Content-type") === "multipart/form-data") {
				handleForm(req, res);
			}
			break;
	}
	
	res.writeHead(resCode).end(resBody);
});

server.listen(1919);

let handleForm = (req, res) => {

};