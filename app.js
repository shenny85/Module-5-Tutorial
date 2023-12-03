const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//envoke app
const app = express();

//connect to mongo db  replace username and password with appropriate text
const dbURI = 'mongodb+srv://shenny:test2325@saavycoder.wiry4bc.mongodb.net/node-tutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');

//listen for requests at port 3000
// app.listen(5500) move to our then statement;

//middleware & static files (css, images to be made public)
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
/*app.get('/add-blog', (req, res) => {
   const blog = new Blog({
         title: 'new blog2',
         snippet:'about my new blog',
         body: 'more about my new blog'
   });
   blog.save()
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
   })
})

//retrieve all the blogs from the collection
app.get('/all-blogs', (req, res) => {
   Blog.find()
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
   })
})

//find a single blog
app.get('/single-blog', (req, res) => {
   Blog.findById('656a329bb4366a5a0ece62ba')
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
   })
}) */

//routes
app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
   // res.send('<p>about page</p>');
res.render('about',  {title: 'About'});
});


//blog routes
app.get('/blogs', (req, res) =>{
   Blog.find().sort({createdAt: -1})
   .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result} )

   })
   .catch((err) => {
      console.log(err);
   })
})

app.post('/blogs', (req, res) => {
   console.log(req.body);
} )

app.get('/blogs/create', (req, res) => {
res.render('create',  {title: 'Create a new Blog'});
 });

//creates middleware
 app.use((req, res) => {
    res.status(404).render('404',  {title: '404'});
 });