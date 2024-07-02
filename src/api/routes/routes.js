const express = require("express");
const router  = express.Router();

const loginController = require('../controllers/loginController');
const usersController = require('../controllers/usersController');
const loginAuth       = require('../middlewares/loginAuth.js');

//Routes
router.post('/login', async function(req, res, next) {
  try{
    var ans = await loginController.login(req);
    res.status(ans.statusCode).send(ans);
  } 
  catch(err){
    console.error(`Error while logging users `, err.message);
    next(err);
  }
});

router.get('/users', loginAuth.auth, async function(req, res, next) {
    try{
      res.json(await usersController.users());
    } 
    catch(err){
      console.error(`Error while getting users `, err.message);
      next(err);
    }
});

module.exports = router;