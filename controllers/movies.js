const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');
const axios = require('axios')


const router = express.Router()

//middleware
app.use(express.urlencoded({ extended: false }));

// variables 
const apiKey = process.env.effaabb70719da90c304ab5e986eb29f


// route for displaying resluts of movies search
router.get('/', (req,res) => {
    

    res.render('movieSearchResults')
})

// GET route for displaying single movie with info
router.get('/:id', (req, res) =>{
    res.send('hey ')
})



module.exports = router
