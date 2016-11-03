const express = require('express');
const hbs = require('hbs');//will check views directly
const fs = require('fs');

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

// middleware
app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});

// app.use((request,response,next) => {
//   response.render('maintenance.hbs',{
//     welcomeBackMessage : 'site under maintenance, be back'
//   });
// });

app.get('/',(request,response) =>{
  response.render('home.hbs', {
    welcomeMessage : 'Welcome to new Era',
    pageTitle : 'Home page'
  });
});

app.get('/about',(request,response) =>{
  response.render('about.hbs',{
    pageTitle : 'about page'
  });
});

app.get('/bad', (request,response) => {
  response.send({
    errorMessage : 'unable to process request'
  });
});

app.listen(3000, () => {
  console.log('app has started');
});
