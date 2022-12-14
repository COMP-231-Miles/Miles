const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
//api/user
router.get('', (req, res, next) => {
  //mongoose model name
  User.find()// return all result. 
    .then(user => {
      res.status(200).json({
        message: 'user fetched successfully',
        data: user,
      });
    }); 
});


//api/user/signup
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      DOB: req.body.DOB,
      userType: req.body.userType,
      driverLicense: req.body.driverLicense,
      phone: req.body.phone
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'User Created!',
          result: result,
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUSer;
  User.findOne({
    email: req.body.email,
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      fetchedUSer = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }

      const token = jwt.sign(
        {
          email: fetchedUSer.email,
          userId: fetchedUSer._id,
        },
        'secret_this_should_be_longer',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({
        token: token,
        user: fetchedUSer
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: err,
      });
    });
});

router.get('/:id', (req, res, next) => {
  //mongoose model name
  User.findById({ _id: req.params.id }).then(result => {
      res.status(201).json({
        message: 'User fetched successfully',
        data: result
      })
  });
});

//update user info
router.put('/userInfo/:id', async (req, res, next) => {
  const updatedUser = new User({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address
  });
  console.log('put called', updatedUser);
  const user = User.findById(req.body._id);
  console.log('user',  user);
  if (!user) return res.status(404).send("User not found");
  await User.findByIdAndUpdate(req.body._id , updatedUser, { new: true}).then(result => {
    console.log('result', result);
    res.status(200).json({ 
      message: 'Updated successful!',
      data: result
    });
  })
});

module.exports = router;
