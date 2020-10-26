const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');
const axios = require('axios')


const router = express.Router()

//middleware
router.use(express.urlencoded({ extended: false }));

// variables 
const apiKey = process.env.KEY


//Displays info about a single movie 

router.get('/info/:id', (req,res) =>{
    const id = req.params.id

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
        .then(info =>{
            console.log(info.data)
            const movieInfo = info.data
            res.render('movies/info', { info: movieInfo })
        })
})

// route to display movies from search using the id for the correct page to display
router.get('/:id', (req, res) =>{
    let pageNum = req.params.id
    let movieSearch = req.query.movies
    // console.log(movieSearch)
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearch}&page=${pageNum}`)
        .then(movies =>{
            const movieData = movies.data.results
            const numberOfPages = movies.data.total_pages
            res.render('movies/search', { movies: movieData, movieSearch:movieSearch , pages:numberOfPages})
        })
})



module.exports = router
