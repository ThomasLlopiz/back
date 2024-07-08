const express = require('express');
const http = require('http');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const uploadHome = multer({ dest: 'uploads/home/' });
const uploadAwards = multer({ dest: 'uploads/awards/' });

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'capyccom_santiago',
    password: '43997224Santi',
    database: 'capyccom_lagranpromocion',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/back/uploadHome/:id', uploadHome.single('image'), (req, res) => {
    const id = req.params.id;
    const filename = req.file.filename;
    const sql = "UPDATE imagenes SET nameImg = ? WHERE id = ?";
    db.query(sql, [filename, id], (err, result) => {
        if (err) return res.json(err);
        res.send('Archivo subido y nombre actualizado con éxito');
    });
});

app.post('/back/uploadAwards/:id', uploadAwards.single('image'), (req, res) => {
    const id = req.params.id;
    const filename = req.file.filename;
    const sql = "UPDATE awards SET nameImg = ? WHERE id = ?";
    db.query(sql, [filename, id], (err, result) => {
        if (err) return res.json(err);
        res.send('Archivo subido y nombre actualizado con éxito');
    });
});

app.get('/back/usuario', (req, res) => {
    const query = 'SELECT * FROM usuario';
    db.query(query, async (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
        }

        // Hashear las contraseñas antes de enviarlas
        for (let user of result) {
            try {
                user.password = await bcrypt.hash(user.password, 10);
            } catch (err) {
                console.error('Error hashing password:', err);
                res.status(500).send('Error hashing password');
                return;
            }
        }
        
        res.json(result);
    });
});

app.get('/back/awards', (req, res) => {
    const query = 'SELECT * FROM awards';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(result);
    });
});
app.get('/back/mayo', (req, res) => {
    const query = 'SELECT * FROM mayo';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(result);
    });
});
app.get('/back/solicitud', (req, res) => {
    const query = 'SELECT * FROM solicitud';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(result);
    });
});
app.get('/back/imagenes', (req, res) => {
    const query = 'SELECT * FROM imagenes';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(result);
    });
});

const server = http.createServer(app);
const port = process.env.PORT || 5050;
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
