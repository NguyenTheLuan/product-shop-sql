var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var mysql = require("mysql");
var fileExtensions = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

//replace the below paramters with your own

var con = mysql.createConnection({
  host: "sql.wpc-is.online",
  user: "sgpham",
  password: "sgph6832",
  database: "db_test_sgpham",
});
con.connect();

const server = http.createServer(function (request, response) {
  try {
    var base = "http://" + request.headers.host;
    var completeurl = new URL(request.url, base);
    var table = completeurl.searchParams.get("tableName");
    var [_, prepath, id] = completeurl.pathname.split("/");
    if (prepath === "products" && id) {
      con.query(
        `SELECT * FROM ProductService WHERE ID = '${id}'`,
        function (err, result, fields) {
          if (err) throw err;
          response.end(JSON.stringify(result));
        }
      );
    } else if (table) {
      //query the data base
      if ((table = "products")) {
        var productQuery = "SELECT * from ProductService";
        con.query(productQuery, function (err, result) {
          response.end(JSON.stringify(result));
        });
      }
    } else {
      var pathname = url.parse(request.url).pathname;
      var filename;
      if (pathname === "/") {
        // change the 'filename' to the homepage of your website (if other than "index.html")
        filename = "index.html";
      } else filename = path.join(process.cwd(), pathname);

      try {
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var typeAttribute = fileExtensions[path.extname(filename)];
        response.writeHead(200, { "Content-Type": typeAttribute });
        fileStream.pipe(response);
      } catch (e) {
        console.log("\n\n");
        console.log("File does not exist: " + filename);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 - File Not Found (" + filename + ")");
        response.end();
      }
    }
  } catch (error) {}
});

server.listen(3000);
console.log(
  "\nThe Web server is alive!!!\n" +
    "It's listening on http://127.0.0.1:3000 or http://localhost:3000"
);
