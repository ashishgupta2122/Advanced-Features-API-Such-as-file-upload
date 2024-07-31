// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send({
        message: 'File uploaded successfully',
        file: req.file,
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});


app.get('/', (req, res, next) => {
    try {
        res.send('Hello World!');
    } catch (err) {
        next(err);
    }
});

app.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        res.send({
            message: 'File uploaded successfully',
            file: req.file,
        });
    } catch (err) {
        next(err);
    }
});

const axios = require('axios');

app.get('/posts', async (req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.send(response.data);
    } catch (err) {
        next(err);
    }
});




