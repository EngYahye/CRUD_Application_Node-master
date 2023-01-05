var Userdb = require('../model/model');
const Joi = require('joi');
const { validateSignup } = require('./validation');

// create and save new user
exports.create = (req, res) => {
  // validate request
  // if(!req.body){
  //     res.status(400).send({ message : "Content can not be emtpy!"});
  //     return;
  // }

  const { error, value } = validateSignup(req.body);

  if (error) {
    console.log(error);
    return res.send(error.details);
  }

  res.redirect('/all-users');

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect('/add-user');
    })
    .catch((err) => {
      // res.status(500).send({
      //     message : err.message || "Some error occurred while creating a create operation"
      // });
    });
};

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || 'Error Occurred while retriving user information',
          });
      });
  }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  const { error, value } = validateSignup(req.body);

  if (error) {
    console.log(error);
    return res.send(error.details);
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {});
  res.redirect('/all-users');
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // Userdb.findByIdAndDelete(id)
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .stfatus(404)
          .send({ message: `Cannot Delete with id ${id} Maybe id is wrong` });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};
