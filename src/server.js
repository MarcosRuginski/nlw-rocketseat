const express = require("express");
const server = express();

// Pega o banco de dados
const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// Rotas
// Página inicial
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título"});
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
})

server.get("/search", (req, res) => {
  // Pegar os dados do banco
  db.all(`SELECT * FROM places`, function(err, rows){
    if(err) {
      return console.log(err);
    }

    const total = rows.length;

    return res.render("search-results.html", { places: rows, total });
  })
})

// ligar o servidor
server.listen(3000);