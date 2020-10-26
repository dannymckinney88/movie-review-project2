const express = require('express')
const db = require('../models')
const methodOverride = require('method-override')

const router = express.Router()

//middleware
router.use(methodOverride('_method'))

//Display a list of the users favorites 
router.get('/', (req, res) =>{
   // db.user.findAll().then(allFavorite => {  
        res.render('movies/favorites')
   // })
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    db.favorite.findOrCreate({
        where: {
            userId: req.user.id,
            movieId: req.body.movieId
        }
    }).then(createFavorite => {
        // redirect 
        res.redirect('/favorites')
    })
    console.log(req.user)
    console.log(req.body)
   // console.log(req.body.movieId)
})

// Delete a movie from the users favorites list
router.delete('/', (req,res) =>{

    res.redirect('/favorites')
})

module.exports = router