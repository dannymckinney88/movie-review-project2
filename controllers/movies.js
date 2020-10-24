const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');
const axios = require('axios')


const router = express.Router()

//middleware
router.use(express.urlencoded({ extended: false }));

// variables 
const apiKey = process.env.KEY


// route for displaying resluts of movies search
router.get('/', (req,res) => {

    console.log(apiKey)
    const movieSeach = req.query.movies
    const qs = {
        params:{
            api_key: apiKey
        }
    }

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSeach}&page=1`)
        .then(movies =>{
            console.log(movies.data)
        })
    res.send('We are in movies')
})

// GET route for displaying single movie with info
router.get('/:id', (req, res) =>{
    res.send('hey ')
})



module.exports = router
