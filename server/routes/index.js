const express = require('express');
const path = require('path');
const { get_database, add_user, update_user } = require('../scripts/database.js');
var router = express.Router();

async function read_db()
{
  db = await get_database()
  console.log(db)
  const result = await db.collection('mycollection').find().toArray();
  console.log(`Result: ${JSON.stringify(result)}`)
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../pages/index.html'))
});

router.get('/test2', function(req, res, next) {
  console.log(`Var1: ${req.query.var1} - Var2: ${req.query.var2}`)
  read_db()
  res.sendFile(path.join(__dirname + '/../pages/index.html'))
});

router.post('/useradd', function(req, res, next) {
  user_info = req.body
  add_user(user_info).then(rc => {
    res.status(rc)
    console.log("RC: " + rc)
  })
  res.json({requestBody: "OK"})
});

router.put('/userupdate', function(req, res, next) {
  user_info = req.body
  update_user(user_info).then(rc => {
    res.status(rc)
    console.log("RC: " + rc)
  })
  res.json({requestBody: "OK"})
});

module.exports = router;
