import { createServer as createHTTPServer } from "http";
import { createServer as createHTTPSServer } from "https";
import fs from "fs";
import { IncomingForm } from "formidable";

const server = createHTTPServer();

server.on("listening", () => console.log("HTTP listening..."));

server.on("request", (req, res) => {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log("Request method: " + req.method + "\nRequest URL: " + req.url + "\nRequest headers:");
	console.log(req.headers);

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

let handleForm = (req, res) => {
	let form = new IncomingForm();

	form.parse(req, (err, fields, files) => {
		res.writeHead(200).end(JSON.stringify({fields, files}));
	});
};

server.listen(1919);

// HTTPS TEST

const options = {
	key: fs.readFileSync("/etc/letsencrypt/live/fog.victoryao.com/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/fog.victoryao.com/fullchain.pem")
};

const httpsServer = createHTTPSServer(options);

httpsServer.on("listening", () => console.log("HTTPS listening..."));

httpsServer.on("request", (req, res) => {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log("Request method: " + req.method + "\nRequest URL: " + req.url + "\nRequest headers:");
	console.log(req.headers);

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

httpsServer.listen(4242);