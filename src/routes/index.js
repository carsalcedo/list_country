const {Router} = require('express');
const router = Router();
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid');

const json_books = fs.readFileSync('src/books.json', 'UTF-8');
let books = JSON.parse(json_books);

router.get('/', (req, res, next) =>{
    res.render('index.ejs', {
        books
    });
});

router.get('/new-entry', (req, res) =>{
    res.render('new-entry.ejs');
})

router.post('/new-entry', (req, res) =>{
    const {title, author, image, description, price} = req.body;
    if(!title || !author || !image || !description)
    {
        res.status(400).send("entries must have a title and descrition");
        return;
    }

    let newbook = {
        id: uuidv4(),
        title,
        author,
        image,
        description,
        price
    }
    books.push(newbook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8') //escribe en el archivo json

    res.redirect('/');
})

router.get('/delete/:id', (req, res) =>{
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8') //escribe en el archivo json
    res.redirect('/');
})

module.exports = router;