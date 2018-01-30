const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const nunjucks = require('nunjucks');
const routes = require('./routes/tweets.js');

nunjucks.configure( { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(__dirname + './routes'));
app.use('/', routes);

app.listen(port, () => {
  console.log('listening on port ' + port);
});

db.sync((err) => {
  if (err) return console.log(err);
  db.seed((err) => {
    if (err) return console.log(err);
    db.getTweets((err) => {
      if (err) return console.log(err);
      db.getTweet(2, (err, tweets) => {
        if (err) return console.log(err);
        //console.log('user with an id of 2 is ' + tweets.name);
      });
    });
  });
});
