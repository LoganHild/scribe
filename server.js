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

        const noteStr = JSON.stringify(newNote);

        fs.appendFile(`./db/db.json`, noteStr, (err) =>
          err
            ? console.error(err)
            : console.log(
                `Note for ${newNote.title} has been written to JSON file`
            )
        );

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