import express from 'express'
import {insertRecord,getAllrecords,getarecord, updateRecord,getmaxid} from './database.js'

const app = express()
const port = 3000
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', async (req, res) => {
  const rows = await getAllrecords()
  res.render("display.ejs",{ sampleData: rows})
})

app.get('/edit/:id', async (req, res) => {
  const id = req.params.id
  const rows = await getarecord(id)
  console.log(rows)
  res.render("edit.ejs",{ sampleDat: rows})
})

app.get('/add', async (req, res) => {
  const rows = await getmaxid();
  res.render("entryform.ejs",{sampleData: rows})
})

app.post('/saverecord', async (req, res) => {
  const {proj_id,proj_title} = req.body;
  const note = await insertRecord(proj_id,proj_title)
  //res.send(note)
  res.redirect("/")
})

app.post('/updaterecord', async (req, res) => {
  const {proj_id,status} = req.body;
  const note = await updateRecord(proj_id,status)
  console.log(status)
  //res.send(note)
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})