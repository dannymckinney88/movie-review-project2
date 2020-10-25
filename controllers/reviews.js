const express = require('express')
const db = require('../models')
const passport = require('../config/ppConfig');


const router = express.Router()


// POST route for creating a new post 
router.post('/', (req,res) => {
    res.redirect('/')
})

// GET route for displaying single review 
router.get('/:id', (req, res) =>{
    res.send('hey ')
})

// GET route for displaying form to create new review
router.get('/new', (req,res) =>{

})

module.exports = router
