var express = require('express');
var router = express.Router();

const db = require ('../../../db/mongoose')


//routes/api/v1
router.get('/', function (req, res, next) {
  let readObj = {
    usersCollection : req.app.locals.usersCollection

  }
  db.readAll(readObj)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    console.log(error)
    res.json(500)

  })
});
router.get('/:id', function (req, res, next) {

  let readObj = {
    id: req.params.id,
    usersCollection : req.app.locals.usersCollection

  }
  db.readOne(readObj)
  .then(response => {
    console.log(response.fullName())
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)

  })

  /*let id = req.params.id
  let rtnVal = users
  if (id != undefined) {
    rtnVal = users[id]
  }
  res.json(rtnVal)*/
});

/* Add user */
router.post('/signup', function (req, res, next) {
  let createObj = {
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }
  db.create(createObj)
  .then(response =>{
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)
  })
  
})

//login
router.post('/login', function (req, res, next){
  //ToDo
  //convert function to authenticate from db

  //temp code
  if (req.body.password === 'password1234'){
    res.json({fName: "Wataru", lName: "Kozuki"})
  } else {
    res.json({})
  }
})

/* update user info */
router.patch('/:id', function (req, res, next) {
  let id = req.params.id
  let user = users[id]
  for (let key in user) {
    if (req.body.hasOwnProperty(key)) {
      user[key] = req.body[key]
    }
    users[id] = user
  }
  res.json(user)
});
/* Forgot password */
router.get('/forgot', function (req, res, next) {
  res.render('forgot', { users, response: "" })
});
router.post('/forgot', function (req, res, next) {
  let response = ""
  let foundUserIndex = users.findIndex((user) => {
    let rtnVal = false
    if (req.body.email.toLowerCase() == user.email.toLowerCase()) {
      rtnVal = true
    }
    return rtnVal
  })
  if (foundUserIndex != -1) {

    response = users[foundUserIndex].password

  }

  res.render('forgot', { users, response })

});
/* Update user */
router.put('/:id', function (req, res, next){
  let putObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection : req.app.locals.usersCollection

  }
  db.readOne(putObj)
  .then(response => {

    if (response == null){
    // add if not found
      db.create(putObj)
    }
    else {
      //update if found
      db.replace(putObj)
      .then(response =>{
        res.json(response)
      })
    }
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)

  })
});
router.patch('/:id', async function (req, res, next){
  let patchObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection : req.app.locals.usersCollection

  }
  try {
    //see if we have one to update
    let response = await db.readOne(patchObj)

    //if we didnt find a record
    if (response == null){
    
       throw new Error("not found")
    }
    else {
      //update one found
     await db.update(patchObj)
     //respond with result from the db
     res.json(await db.readOne(patchObj))
    }//if not found
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  } 
});
router.delete('/:id', function (req, res, next) {

  let deleteObj = {
    id: req.params.id,
    usersCollection : req.app.locals.usersCollection

  }
  db.del(deleteObj)
  .then(response => {

    if (response.deletedCount == 1){
      res.json({})
    }
    console.log("not deleted")
    throw new Error ('Not Deleted')
  })
  .catch(error => {
    res.status(500).json(error)

  })

});

router.post('/', function (req, res, next) {
  let user = req.body
  user.id = users.length - 1
  users.push(user)
  console.log(users)
  res.json(user)
});
module.exports = router;
