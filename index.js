const express= require('express');
const app= express();
const ejsLayouts= require('express-ejs-layouts');

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
    let searchedMovie= req.query.movie_title;
    //console.log('this is query string', searchedMovie );
    //console.log(req.query);
    res.render('results.ejs', {movie: searchedMovie});
})

//As a user, I want to pick a movie result and see detailed information about the movie.
app.get('/movies/:movie_id', (req, res)=> {
    let movieId= req.params;
    res.render('show.ejs');
})

//As a user, I want to save movies from my search results to a list of my faves.

//As a user, I want to perform this action from the movie detail page.

app.listen(8000, ()=> {
    console.log('listening on port 8000');
})
