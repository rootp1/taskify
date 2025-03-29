const express = require('express');
const app = express();
const path = require("path")
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/files', express.static(path.join(__dirname, "files")));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render('index.ejs', { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {

    res.render("show.ejs", { filename: req.params.filename, filedata: filedata });
  });
});




app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {

    res.render("edit.ejs", { filename: req.params.filename, filedata: filedata });
  });
});


app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./files/${req.params.filename}`, req.body.content, (err) => {

    res.redirect('/');
  });
});




app.post('/upload', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("_")}.txt`, req.body.content, (err) => {
    res.redirect('/');
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
