const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// for data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup public folder client side
app.use(express.static('public'));

// api route
require('./routes/apiRoute')(app);

// html route
require('./routes/htmlRoute')(app);

app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});