const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("", async function(req, res, next) {
  try {
    const results = await db.query(`SELECT * FROM items`);
    console.log('WTF, WTF')
    return res.json(results.rows)
  } catch (err) {
    console.log('WFTHEEE')
    return next(err)
  }
})

router.post("", async function(req, res, next) {
  try {
    const { name, type } = req.body
    const results = await db.query(
      `INSERT INTO items(name, type) VALUES($1, $2) RETURNING *`,
      [name, type]
    );
    return res.json(results.rows[0])
  } catch (err) {
    return next(err)
  }
})

router.patch("/:id", async function(req, res, next) {
  try {
    const { name, type } = req.body
    const id = req.params.id
    console.log(req.params.id)
    console.log(name)
    console.log(type)
    const results = await db.query(
      `UPDATE items SET name=$1, type=$2 WHERE id=$3 RETURNING *`,
      [name, type, id]
    );
    return res.json(results.rows[0])
  } catch(err) {
    return next(err)
  }
})

router.get("/:id", async function(req, res, next) {
  try {
    const id  = req.params.id
    const results = await db.query(
      `SELECT * FROM items WHERE id=$1`,
      [id]
    );
    return res.json(results.rows)
  } catch(err) {
    return next(err)
  }
})

router.delete("/:id", async function(req, res, next) {
  try {
    const id = req.params.id 
    const results = await db.query(
      `DELETE FROM items WHERE id=$1`,
      [id]
    );
    return res.json({ message: "Deleted" })
  } catch(err) {
    return next(err)
  }
})

module.exports = router


