const router = require("express").Router();
const mongoose = require('mongoose');
//const router = require("../data/phones.json");

const Phone = require('../models/Phone.model');

router.get("/phones", (req, res, next) => {
    Phone.find()
    .then(allPhones => {
        res.json(allPhones)
    })
    .catch(err => err)
})

router.get('/phones/:id', (req, res, next) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Project document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Phone.findById(id)
      .then(phone => res.json(phone))
      .catch(err => {
        console.log("error getting specific phone...", err);
        res.status(500).json({
            message: "error getting specific phone",
            error: err
        })
    });
  });


module.exports = router;