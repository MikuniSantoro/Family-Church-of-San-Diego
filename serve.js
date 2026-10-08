// Tiny static server for previewing familychurch-sd locally: node serve.js
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = Number(process.env.PORT) || 5178;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/" || p === "/preview" || p === "/preview/") { res.writeHead(302, { Location: "/home-preview.html" }); return res.end(); }
  const file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log(`Preview on http://localhost:${port}`));
