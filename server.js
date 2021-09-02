const express = require('express');
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

// require('./routes/apiRoutes')(app);

// require('./routes/htmlRoutes')(app);
// app.get('/notes', (req, res) => {
//     res.json(`${req.method} request received`);
// });

app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
})