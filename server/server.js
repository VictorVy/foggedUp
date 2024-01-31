const http = require("http");
// const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer();
server.on("listening", () => console.log("Listening..."));
server.on("request", (req, res) => {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	switch(req.method.toUpperCase()) {
		case "GET":
			res.writeHead(200).end("GET response");
			break;
		case "POST":
			if (req.url === "/up" || res.getHeader("Content-type") === "multipart/form-data") {
				handleForm(req, res);
			}
			break;
		default:
			res.writeHead(404).end("Not found");
			break;
	}
});

server.listen(1919);

let handleForm = (req, res) => {
	let form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		res.writeHead(200).end(JSON.stringify({fields, files}));
	});
};
