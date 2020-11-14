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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/api/notes", (req, res) => {
    return res.send(notes);
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote["id"] = newNote.title + notes.length;
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    return res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    let deleteId = req.params.id;
    console.log(deleteId);
    for (let i = 0; i < notes.length; i++){
        if(notes[i].id == deleteId){
            notes.splice(i, 1);
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    return res.json(notes);
});


app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
});