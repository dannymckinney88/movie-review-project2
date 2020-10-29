const express = require('express')
const db = require('../models')
const methodOverride = require('method-override')

const router = express.Router()

//middleware
router.use(methodOverride('_method'))

//Display a list of the users favorites 
router.get('/', (req, res) =>{
    db.favorite.findAll({
        where:{
            userId: req.user.id
        }
    }).then(favorites => {
    res.render('movies/favorites', {favoriteMovies: favorites})

})
})

// Add a movie to the a users favorties list
router.post('/', (req,res) =>{
    db.favorite.findOrCreate({
        where: {
            userId: req.user.id,
            movieId: req.body.movieId,
            movieTitle: req.body.movieTitle,
            moviePoster: req.body.moviePoster
        }
    }).then(createFavorite => {
        res.redirect('/favorites')
})
})

// Delete a movie from the users favorites list
router.delete('/', (req,res) =>{
    db.favorite.destroy({
        where: {id: req.body.id}
    }).then((deleted)=> {
        res.redirect('/favorites')
    })
})

module.exports = router