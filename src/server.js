import { createServer as createHTTPServer } from "http";
import { createServer as createHTTPSServer } from "https";
import fs from "fs";
import { IncomingForm } from "formidable";

function handleRequest(req, res) {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

	// console.log("Request method: " + req.method + "\nRequest URL: " + req.url + "\nRequest headers:");
	// console.log(req.headers);

	switch(req.method.toUpperCase()) {
		case "GET":
			serveFiles(req, res);
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
}

let serveFiles = (req, res) => {
	fs.readFile("../public/index.html", (err, data) => {
		if (err) {
			res.writeHead(500).end(err.message);
		} else {
			res.setHeader("Content-type", "text/html");
			res.writeHead(200).end(data);
		}
	});
}

let handleForm = (req, res) => {
	let form = new IncomingForm();

	form.parse(req, (err, fields, files) => {
		res.writeHead(200).end(JSON.stringify({fields, files}));
	});
};

const options = {
	key: fs.readFileSync("/etc/letsencrypt/live/fog.victoryao.com/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/fog.victoryao.com/fullchain.pem")
};

const httpServer = createHTTPServer();
const httpsServer = createHTTPSServer(options);

httpServer.on("listening", () => console.log("HTTP listening..."));
httpsServer.on("listening", () => console.log("HTTPS listening..."));

httpServer.on("request", handleRequest);
httpsServer.on("request", handleRequest);

httpServer.listen(1919);
httpsServer.listen(4242);
