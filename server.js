require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


const apiKey = process.env.KEY

// Display home page of diffrent movies

app.get('/', (req,res) =>{
  // making three difreent api calls for diffrent movie data 
  const one = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  const two =  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  const three = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1` 
//  trending, now playing, upcoming
  const requestOne = axios.get(one)
  const requestTwo = axios.get(two)
  const requestThree = axios.get(three)

  axios.all([requestOne, requestTwo, requestThree])
    .then(axios.spread((...responses) => {
     res.render('index' ,
     {
         trending: responses[0].data.results,
         playing: responses[1].data.results,
         upcomming: responses[2].data.results,
         user: req.user
     })
  })).catch(errors => {
    // react on errors.
  })
    
})

app.use('/auth', require('./controllers/auth'));
app.use('/reviews', require('./controllers/reviews'));
app.use('/movies', require('./controllers/movies'));
app.use('/favorites', require('./controllers/favorites'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
