const express = require('express')
const db = require('../models')
const methodOverride = require('method-override')

const router = express.Router()

//middleware
router.use(methodOverride('_method'))

//Display a list of the users favorites 
router.get('/', (req, res) =>{
    db.favorite.findAll().then(favorites => {
        console.log('-------------------------------------------------------------------------------------')
        console.log(favorites[0].dataValues)
        console.log('-------------------------------------------------------------------------------------')
        res.render('movies/favorites', {favoriteMovies: favorites})

})
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    console.log(req.body.movieTitle)
    db.favorite.findOrCreate({
        where: {
            userId: req.user.id,
            movieId: req.body.movieId,
            movieTitle: req.body.movieTitle,
            moviePoster: req.body.moviePoster
        }
    }).then(createFavorite => {
        console.log(createFavorite) 
        res.redirect('/favorites')
})
})

// Delete a movie from the users favorites list
router.delete('/', (req,res) =>{

    res.redirect('/favorites')
})

module.exports = router