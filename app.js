const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://brnms:815904260392@nodetuts.goteb.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//middlewares & static files
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs')

 
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', { title: 'About' });
});


// blog routes
app.use('/blogs', blogRoutes); 

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { title: '404' });
});