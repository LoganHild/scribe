
/////API Route
const notes = require('../db/db.json');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    })

    app.post('/api/notes', (req, res) => {

        const {title, text} = req.body;

        if (title && text) {
            const newNote = {
                title,
                text,
                id: uuid(),
            };

            readAndAppend(newNote, './db/db.json');

            const response = {
                status: 'success',
                body: newNote,
            };
            console.log(response);
            res.json(response);
        } else {
            res.json('Error in posting new Note');
        }
    });

    app.delete('/api/notes/:id', (req, res) => {

        const {id} = req.params;

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id ==id) {
                notes.splice(i,1);
                break;
            }
        }

        writeToFile('.db/db.json', notes);
        res.json('Successfully deleted note!')
    })
}
////HTML route
const path = require('path');

module.exports = (app) => {
    //returns notes.html file
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    //returns index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
};