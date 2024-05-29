const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer');

const app = express()
app.use(cors())
const fs = require('fs');
const uploadPath = 'C:/Users/DEPIT-1/Desktop/lgp/front/public/assets';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'C:/Users/DEPIT-1/Desktop/lgp/front/public/assets';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Archivo subido con éxito');
});
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'cartones'
})

app.get('/', (req, res) => {
    return res.json("server on")
})

app.get('/agosto', (req, res) => {
    const sql = "SELECT  * FROM agosto"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.get('/solicitud', (req, res) => {
    const sql = "SELECT  * FROM solicitud"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.get('/usuario', (req, res) => {
    const sql = "SELECT  * FROM usuario"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(5050, () => {
    console.log("http://localhost:5050/solicitud")
})



