const express = require ("express");
const path = require('path')
const fs = require('fs')

const db = require('./db/db.json');

console.log(db)

const PORT = process.env.PORT || 3001;

const app = express();

// MIDDLEWARES
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// client sends a request www.facebook.com/ ---> server gives homepage as response
// www.facebook.com/login ---> give login page

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html' ));
})

app.get('/api/notes', (req,res) => {
    res.json(db)
})

// the client wants to send the data to the server, so that the server can save it

app.post('/api/notes', (req, res) => {
    console.log(req.body);

    db.push(req.body);

    fs.writeFile('./db/db.json', JSON.stringify(db), () => {
        console.log("DB has been updated!");

        res.json(req.body);
    })
})

// app.get('/hello', (req, res) => {
//     res.send("Hello there!")
// })

// app.get('/goodbye', (req, res) => {
//     res.send("See you next time!")
// })


// app.get('/hi', (req, res) => {
//     res.send('How are you?')
// })




app.listen(PORT, () => {
    console.log(`Server has started and is running on PORT ${PORT}!`)
})