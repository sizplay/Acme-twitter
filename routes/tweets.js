const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Twitter' });
});

router.get('/tweets', (req, res, next) => {
  db.getTweets((err, name) => {
    if (err) return next(err);
    res.render('tweets', { title: 'Tweets', name: name });
  });
});

router.get('/tweets/:id', (req, res, next) => {
  db.getTweet(req.params.id, (err, tweet) => {
    if (err) return next(err);
    res.render('tweet', { title: 'Tweet', tweet: tweet });
  });
});


module.exports = router;
