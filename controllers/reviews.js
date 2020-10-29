const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');
const axios = require('axios')


const router = express.Router()

//middleware
router.use(express.urlencoded({ extended: false }));

// Get route for diplaying review form
router.get('/', (req,res) =>{
    const movieId = req.query.movieId
    const apiKey = process.env.KEY
    console.log(req.user.id)
    const userData = req.user.dataValues
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(info =>{
        console.log(info.data)
        const movieInfo = info.data
        res.render('reviews/new', { info: movieInfo, user: userData})
    })

    
})

// POST route for creating a new post 
router.post('/', (req,res) => {
    console.log(req.body)
    console.log(req.body.movieTitle)
    console.log(req.user.id)

    db.review.create({
        content: req.body.content,
        movieId: req.body.moveId,
        userId: req.user.id,
        movieTitle: req.body.movieTitle,
        moviePoster: req.body.moviePoster
    }).then(review =>{
        console.log(review)
        res.redirect('/')
    })
})

// Display all reveiwes 
router.get('/all', (req, res) =>{
    db.review.findAll({include:[db.user]}).then(review =>{
        // console.log(review[0].dataValues)
        console.log(review[0].dataValues)
        res.render('reviews/all', {reviews: review})
    })
})




module.exports = router
