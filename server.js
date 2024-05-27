const express = require('express')
const mysql = require('mysql')
const cors = require('cors')


const app = express()
app.use(cors())
// servername : "localhost:3306",
// username : "grupodev_speratta",
// password : "Santiago@2024",
// database : "grupodev_golden",
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