const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup public folder for images, js, css
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add note`);

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        // const noteStr = JSON.stringify([newNote]);

        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                      writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully added Note!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in posting new Note');
    }
})




app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
})