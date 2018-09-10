const express = require('express')

const router = express.Router()

const items = [{itemName: 'chips', id: 0}]
let id = 1

router.get("", (req, res) => {
  return res.json(items)
})

router.post("", (req, res) => {
  users.push({
    itemName: req.body.itemName,
    id: ++id
  })
})

router.get("/:id", (req, res) => {
  const singleItem = items.find(item => item.id === Number(req.params.id))
  console.log(singleItem)
  return res.json(singleItem)
})

router.get("/:id", (req, res) => {
  const singleItem = items.find(item => item.id === Number(req.params.id))
  singleItem.itemName = req.body.itemName
  return res.json({ message: "Updated" })
})

router.delete("/:id", (req, res) => {
  const removeItem = items.findIndex(item => item.id === Number(req.params.id))
  items.slice(removeItem,1)
  return res.json({ message: "Deleted" });
})

module.exports = router

