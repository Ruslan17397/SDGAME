const express = require('express')
const { join } = require('path')
const connectDb = require('./DB/Connection');
const Item = require('./DB/Item');
const app = express()

const PORT = 3000 || process.env.PORT

app.use(express.static(join(__dirname, 'client')))


connectDb();
// const DBItems = [
//   {
//     name: 'Sword',
//     id: 'sw',
//     texture: 'tile050.png'
//   },
//   {
//     name: 'Sword 2',
//     id: 'sw2',
//     texture: 'tile083.png'
//   }
// ]
let DBItems;
  Item.find().then((result)=>{
   DBItems = result;
  }).catch((err)=>{
    console.log(err);
  });

const items = []

app.get('/game/api/inventory/get-all', (req , res) => {
  return res.json(items)
})

app.get('/game/api/inventory/get/:id', (req , res) => {
  const idItem = req.params.id
  const foundItem = DBItems.find(item => item.id === idItem)    
  return res.json(foundItem)
})
app.get('/', async (req, res) => {
  // let newitem = {};
  // newitem.name = "Sword 2";
  // newitem.id = "sw2";
  // newitem.texture = "tile083.png";
  // let itemModel = new Item(newitem);
  // await itemModel.save();

  return res.sendFile(join(__dirname, 'client', 'index.html'))
})
// app.get('/get', async (req, res) => {
//   // let newitem = {};
//   // newitem.name = "Sword 2";
//   // newitem.id = "sw2";
//   // newitem.texture = "tile083.png";
//   // let itemModel = new Item(newitem);
//   // await itemModel.save();
//   Item.find().then((result)=>{
//     res.send(result)
//   }).catch((err)=>{
//     console.log(err);
//   });
//  })

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))