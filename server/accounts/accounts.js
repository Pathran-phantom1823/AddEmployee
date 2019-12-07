const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const account = require("../models/accounts");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const accounts = (req, res) => {
  let test = async function() {
    const exist = await account.getByUsername(req.body.email);
    if (exist == null) {
      let data = {
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        middlename:  req.body.middlename,
        gender:  req.body.gender,
        birthdate:  req.body.birthdate,
        Address: req.body.Address,
        email:  req.body.email,
        description:  req.body.description,
      };
      await account.addAccount(data);
      let item = await account.getLastAccount();
      res.send(item);
    } else {
      res.json({
        message: "Email already exist!"
      });
    }
  };
  test();
};

module.exports = { accounts };
