const express = require('express')
const db = require('../models')
const methodOverride = require('method-override')

const router = express.Router()

//middleware
router.use(methodOverride('_method'))

//Display a list of the users favorites 
router.get('/', (req, res) =>{
    db.favorite.findAll().then(favorites => {
        console.log(favorites[0].dataValues)
        res.render('movies/favorites',{favoriteMovies: favorites})

    })
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    db.favorite.findOrCreate({
        where: {
            userId: req.user.id,
            movieId: req.body.movieId
        }
    }).then(createFavorite => {
        res.redirect('/favorites')
    })
})

// Delete a movie from the users favorites list
router.delete('/', (req,res) =>{

    res.redirect('/favorites')
})

module.exports = router