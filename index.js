require('dotenv').config();
const express= require('express');
const app= express();
const ejsLayouts= require('express-ejs-layouts');
const axios= require('axios');
//const fs= require('fs');

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//ROUTES
//As a user, I want to go to a home page to search a database full of movies.
app.get('/', (req, res)=> {
    res.render('home.ejs');
})

//As a user, I want to see movie results based on my search query.
app.get('/movies', (req, res)=> {
    let searchedMovie= req.query.q;
    //console.log('this is query string', searchedMovie );
    //console.log(req.query);
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.q}`)
    .then(response=> {
        //let movieResults= JSON.stringify(response.data);
        //console.log(typeof movieResults); 
        //let movieData= JSON.parse(movieResults);
        //console.log('MOVIEDATA', movieData);
        //console.log('RESPONSE DATA', response.data);
        
        res.render('results.ejs', {movie: searchedMovie, movieData: response.data, /*data: movieData */});
        //res.send(movieData);
    })
    .catch(err=> {
        console.log('your error is: ', err);
    })
})

//As a user, I want to pick a movie result and see detailed information about the movie.
app.get('/movies/:movie_id', (req, res)=> {
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.movie_id}`)
    .then(response => {
        console.log(response.data);
        res.render('show.ejs', {movieId: req.params.movie_id, movieDetails: response.data});
    })
})

//As a user, I want to save movies from my search results to a list of my faves.

//As a user, I want to perform this action from the movie detail page.

app.listen(8000, ()=> {
    console.log('listening on port 8000');
})
