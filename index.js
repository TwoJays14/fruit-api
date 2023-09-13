//  Fruit API
require('dotenv').config()
const cors = require('cors')
const fruits = require('./fruits.json');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello Fruit API!");
})

app.get('/fruits', (req, res) => {
  res.status(200).send(fruits)
})

app.get('/fruits/:name', (req, res) => {

  const name = req.params.name.toLowerCase();
  const fruit = fruits.find(fruit => fruit.name.toLowerCase() === name)
  if (fruit === undefined) {
    res.status(404).send("Fruit not found");
  } else {
    res.send(fruit)
  }
  
})

const getFruitIndex = name => {

  return fruits.findIndex(fruit => fruit.name.toLowerCase() === name)

}

app.post('/fruits', (req, res) => {
  
  const fi = getFruitIndex(req.body.name.toLowerCase());
  if (fi > -1) {
    res.status(409).send("The fruit already exists")
  } else {
    // Create an array of all ids
    const fruitIDs = fruits.map(fruit => fruit.id)
    // Get the maxmium id
    let highestID = Math.max(...fruitIDs) + 1
    // Increment max id by one
    highestID++
    // Adjust ID to new max ID
    req.body.id = highestID

    fruits.push(req.body)
    res.status(201).send(req.body)
  }


  const fruit = req.body
  console.log(fruit)
  res.send("New Fruit Created!")
})

app.delete('/fruits/:name', (req, res) => {

  const fi = getFruitIndex(req.params.name.toLowerCase())

  if ( fi === -1) {
    res.status(404).send('Fruit not found')
  } else {
    fruits.splice(fi, 1)
    res.sendStatus(200)
  }
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})
