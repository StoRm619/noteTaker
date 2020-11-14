const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const notesDB = fs.readFileSync('./db/db.json');
let notes = JSON.parse(notesDB);

app.use(express.static('public'));
app.use(express.static('db'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/api/notes", (res, req) => {
    // console.log("notes");
    // console.log(notes);
    return res.json(notes);
});

app.post("/api/notes", (res, req) => {
    let newNote = req.req.body;
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
});


app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
});