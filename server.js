const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const uploadPath = 'C:/Users/DEPIT-1/Desktop/lgp/front/public/assets';

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'cartones'
});

// Verificar que el directorio de destino exista, si no, crearlo
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Ruta para subir una imagen y actualizar el nombre en la base de datos
app.post('/upload/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const filename = req.file.originalname;
    const sql = "UPDATE imagenes SET nameImg = ? WHERE id = ?";
    
    db.query(sql, [filename, id], (err, result) => {
        if (err) return res.json(err);
        res.send('Archivo subido y nombre actualizado con éxito');
    });
});

// Ruta para verificar el estado del servidor
app.get('/', (req, res) => {
    return res.json("server on");
});

// Ruta para obtener datos de la tabla 'agosto'
app.get('/mayo', (req, res) => {
    const sql = "SELECT  * FROM mayo";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Ruta para obtener datos de la tabla 'imagenes'
app.get('/imagenes', (req, res) => {
    const sql = "SELECT  * FROM imagenes";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Ruta para obtener datos de la tabla 'solicitud'
app.get('/solicitud', (req, res) => {
    const sql = "SELECT  * FROM solicitud";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Ruta para obtener datos de la tabla 'usuario'
app.get('/usuario', (req, res) => {
    const sql = "SELECT  * FROM usuario";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Ruta para obtener la lista de imágenes desde el directorio de assets
app.get('/imagenes', (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error leyendo el directorio');
        }
        const images = files.map((file, index) => ({
            id: index,
            filename: file
        }));
        res.json(images);
    });
});

// Iniciar el servidor
app.listen(5050, () => {
    console.log("Servidor escuchando en http://localhost:5050/");
});
