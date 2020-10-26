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
  let one = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  let two =  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`

  const requestOne = axios.get(one)
  const requestTwo = axios.get(two)

  axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    console.log(responseOne.data)
    console.log('------------------------------------------------')
    console.log(responseTwo.data)
    res.render('index')
  })).catch(errors => {
    // react on errors.
  })
    
})
// app.get('/', (req, res) => {
  
// });

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/reviews', require('./controllers/reviews'));
app.use('/movies', require('./controllers/movies'));
app.use('/favorites', require('./controllers/favorites'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
