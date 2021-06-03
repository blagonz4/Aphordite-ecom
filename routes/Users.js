var express = require('express');
var router = express.Router();

/* GET users listing. */
const User = require('../models/Users');


router.get('/login',async (req,res) => {
  let {email,
        password}= req.body;
  try {
      const user = await User.findOne({
          limit : 1,
          // attributes: ['email',
          //             'password'],
          where:{
            email : email,
            password : password
          }
      });
      res.json({
          result: 'oke',
          data:user,
          message: "Login successfully"
      });
  } catch (error){
      res.json({
          result: 'failed',
          message: `Login failed, Error ${error}`
      });
  }

});

router.put('/edit/:id',async (req,res) =>{
  const {id} = req.params;
  const { name,
          email,
          phone,
          password} = req.body;
  try{
      let users = await User.findAll({
          atributes: ['id',
                      'name',
                      'email',
                      'phone',
                      'password'],
          where:{
              id
          }
      });
      if(users.length > 0) {
        users.forEach(async (user) => {
              await user.update({
                  name: name ? name : user.name,
                  email : email ? email : user.email,
                  phone: phone ? phone : user.phone,
                  password: password ? password : user.password,
              });
          });
          res.json({
            result: 'ok',
            data:User,
            message: "okela"
          })
      } else {
          res.json({
              result: 'failed',
              message: `cant update. Error ${error}`
          });
      }
      
  } catch(error){
      res.json({
          result: 'failed',
          message: `cant update. Error ${error}`
      });
  }
});




module.exports = router;