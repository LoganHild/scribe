const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001

//Middleware for data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup public folder client side
app.use(express.static('public'));

//gets the second html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//POST request for adding a Note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add note`);

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };
        
        //checks the db.json file
        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                
                //converts to JSON object
                const parsedNotes = JSON.parse(data);

                //Adds new note to array
                parsedNotes.push(newNote);

                //Write updated Notes back to the file
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