const express = require('express')
const db = require('../models')
const methodOverride = require('method-override')

const router = express.Router()

//middleware
router.use(methodOverride('_method'))

//Display a list of the users favorites 
router.get('/', (req, res) =>{

    res.render('movies/favorites')
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    console.log(req.user.dataValues.id)
    console.log(req.body.movieId)
    // redirect 
    res.redirect('/favorites')
})

// Delete a movie from the users favorites list
router.delete('/', (req,res) =>{

    res.redirect('/favorites')
})

module.exports = router