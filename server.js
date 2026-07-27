const http = require("http");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8080;
const rootDir = path.join(__dirname, "pages");
const imagesDir = path.join(__dirname, "images");
const jsDir = path.join(__dirname, "js");
const cssDir = path.join(__dirname, "css");
const assetsDir = path.join(__dirname, "assets");
const teamDir = path.join(__dirname, "team");
const dataDir = path.join(__dirname, "data");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");

  if (normalized.startsWith(path.sep + "pages" + path.sep) || normalized === path.sep + "pages") {
    return path.join(rootDir, normalized.replace(/^[/\\]pages/, ""));
  }

  if (normalized.startsWith(path.sep + "images" + path.sep) || normalized === path.sep + "images") {
    return path.join(imagesDir, normalized.replace(/^[/\\]images/, ""));
  }
  if (normalized.startsWith(path.sep + "js" + path.sep) || normalized === path.sep + "js") {
    return path.join(jsDir, normalized.replace(/^[/\\]js/, ""));
  }
  if (normalized.startsWith(path.sep + "css" + path.sep) || normalized === path.sep + "css") {
    return path.join(cssDir, normalized.replace(/^[/\\]css/, ""));
  }
  if (normalized.startsWith(path.sep + "assets" + path.sep) || normalized === path.sep + "assets") {
    return path.join(assetsDir, normalized.replace(/^[/\\]assets/, ""));
  }

  if (normalized.startsWith(path.sep + "team" + path.sep) || normalized === path.sep + "team") {
    return path.join(teamDir, normalized.replace(/^[/\\]team/, ""));
  }

  if (normalized.startsWith(path.sep + "data" + path.sep) || normalized === path.sep + "data") {
    return path.join(dataDir, normalized.replace(/^[/\\]data/, ""));
  }

  return path.join(rootDir, normalized);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = safePath(urlPath);

  if (!filePath.startsWith(rootDir) && !filePath.startsWith(imagesDir) && !filePath.startsWith(jsDir) && !filePath.startsWith(cssDir) && !filePath.startsWith(assetsDir) && !filePath.startsWith(teamDir) && !filePath.startsWith(dataDir)) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return send(res, 404, "Not Found");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) return send(res, 500, "Server Error");
      send(res, 200, data, contentType);
    });
  });
});

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
  console.log(`Serving: ${rootDir}`);
});
