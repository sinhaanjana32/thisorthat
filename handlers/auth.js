const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
      const user = await db.User.create(req.body);
      console.log(user);
      const { id, username } = user;
      const token = jwt.sign({ id, username }, process.env.SECRET);
      return res.status(201).json({
        id,
        username,
        token,
      });
      
    } catch (err) {
      if (err.code === 11000) {
        err.message = 'Sorry, that username is already taken';
      }
      return next({
        status: 400,
        message: err.message,
      });
    }
  };
  

  exports.login = async (req, res, next) => {

    try {
      const user = await db.User.findOne({
        username: req.body.username,
      });

      const { id, username } = user;
      const valid = await user.comparePassword(req.body.password);
  
      if (valid) {
        const token = jwt.sign({ id, username }, process.env.SECRET);
        return res.json({
          id,
          username,
         token,
        });
        
      } else {
        throw new Error("invalid");
      }
    } catch (err) {
      return next({ status: 400, message: 'Invalid Username/Password' });
    }

  }