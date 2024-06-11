const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'cartones'
});



const direccionHome = 'C:/Users/DEPIT-1/Desktop/lgp/front/public/assets/home/';
const direccionAwards = 'C:/Users/DEPIT-1/Desktop/lgp/front/public/assets/awards/';

// Ensure directories exist
if (!fs.existsSync(direccionHome)) {
    fs.mkdirSync(direccionHome, { recursive: true });
}
if (!fs.existsSync(direccionAwards)) {
    fs.mkdirSync(direccionAwards, { recursive: true });
}

const storageHome = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, direccionHome);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const storageAwards = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, direccionAwards);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadHome = multer({ storage: storageHome });
const uploadAwards = multer({ storage: storageAwards });

app.post('/uploadHome/:id', uploadHome.single('image'), (req, res) => {
    const id = req.params.id;
    const filename = req.file.originalname;
    const sql = "UPDATE imagenes SET nameImg = ? WHERE id = ?";
    db.query(sql, [filename, id], (err, result) => {
        if (err) return res.json(err);
        res.send('Archivo subido y nombre actualizado con éxito');
    });
});

app.post('/uploadAwards/:id', uploadAwards.single('image'), (req, res) => {
    const id = req.params.id;
    const filename = req.file.originalname;
    const sql = "UPDATE awards SET nameImg = ? WHERE id = ?";
    db.query(sql, [filename, id], (err, result) => {
        if (err) return res.json(err);
        res.send('Archivo subido y nombre actualizado con éxito');
    });
});


app.get('/imagenes', (req, res) => {
    const sql = "SELECT  * FROM imagenes";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/awards', (req, res) => {
    const sql = "SELECT  * FROM awards";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get('/mayo', (req, res) => {
    const sql = "SELECT  * FROM mayo";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/solicitud', (req, res) => {
    const sql = "SELECT  * FROM solicitud";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/usuario', (req, res) => {
    const sql = "SELECT  * FROM usuario";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/', (req, res) => {
    return res.json("server on");
});
app.listen(5050, () => {
    console.log("Servidor escuchando en http://localhost:5050/");
});
