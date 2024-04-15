import { createServer } from "node:http";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import os from "node:os";
import { IncomingForm } from "formidable";
import { getContentType } from "./utils.js";

const fogDir = os.homedir() + "/fog/";

let filePromises = {
	"index.html": fsPromises.readFile("public/index.html"),
	"style.css": fsPromises.readFile("public/style.css"),
	"index.js": fsPromises.readFile("public/index.js"),
	"favicon.ico": fsPromises.readFile("public/favicon.ico")
}

let files = {
	"index.html": undefined,
	"style.css": undefined,
	"index.js": undefined,
	"favicon.ico": undefined
};

if(!fs.existsSync(fogDir)) {
	fs.mkdirSync(fogDir);
}

function handleRequest(req, res) {
	res.setHeader("Content-type", "text/plain");
	res.setHeader("Access-Control-Allow-Origin", "*");

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
			res.writeHead(400).end("Bad Request");	
			break;
	}
}

function serveFiles(req, res) {
	let url = req.url;
	let requested = url.slice(1);

	if (requested === "") {	
		requested = "index.html";
	}
	
	res.setHeader("Content-Type", getContentType(requested));
	res.writeHead(200).end(files[requested]);
}

function handleForm(req, res) {
	let form = new IncomingForm();

	form.parse(req, (err, fields, files) => {
		if (err) {
			res.writeHead(500).end(err.message);
			return;
		}

		for (let file of files.upload) {
			let oldPath = file.filepath;
			let newPath = fogDir + file.originalFilename;
			
			fs.rename(oldPath, newPath, (err) => {
				if (err) {
					res.writeHead(500).end(err.message);
					return;
				}
			});
		}

		res.setHeader("Location", "/");
		res.writeHead(303).end();
	});
};

const httpServer = createServer();

httpServer.on("listening", () => console.log("HTTP listening..."));

httpServer.on("request", (req, res) => {
	console.log("HTTP:", req.method, req.url);
	handleRequest(req, res);
});

Promise.allSettled(Object.values(filePromises).map(p => p.catch(e => console.error(e.message))))
.then((results) => {
	let keys = Object.keys(files);
	results.forEach((result, i) => {
		files[keys[i]] = result.value;
	});

	httpServer.listen(process.env.PORT);
})
.catch((err) => console.error(err.message));