const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');
const axios = require('axios')

const router = express.Router()

//middleware
router.use(express.urlencoded({ extended: false }));

// Display form for review 
router.get('/', (req,res) =>{
    const movieId = req.query.movieId
    const apiKey = process.env.KEY
    const userData = req.user.dataValues

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(info =>{
        const movieInfo = info.data
        res.render('reviews/new', { info: movieInfo, user: userData})
    })
})

// Create a new movie post
router.post('/', (req,res) => {
    db.review.create({
        content: req.body.content,
        movieId: req.body.moveId,
        userId: req.user.id,
        movieTitle: req.body.movieTitle,
        moviePoster: req.body.moviePoster
    }).then(review =>{
        res.redirect('/')
    })
})

// Display all reveiwes 
router.get('/all', (req, res) =>{
    db.review.findAll({include:[db.user]}).then(review =>{
        res.render('reviews/all', {reviews: review})
    })
})




module.exports = router
