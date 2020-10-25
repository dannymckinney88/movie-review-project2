const express = require('express')
const db = require('../models')
const router = express.Router()


//Display a list of the users favorites 
router.get('/', (req, res) =>{

    res.render('favorites')
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    console.log(req.user)
    res.send('/movies')
})


module.exports = router