const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_SYNC = 'DROP TABLE IF EXISTS tweets; CREATE TABLE tweets(id SERIAL PRIMARY KEY, name varchar(255), tweet varchar(255));';

const SQL_SEED = 'INSERT INTO tweets(name, tweet) values(\'Ernest Hemingway\', \'But man is not made for defeat. A man can be destroyed but not defeated.\'); INSERT INTO tweets(name, tweet) values(\'Adele Laurie Blue Adkins\', \'Hello It is me. I was wondering if after all these years you would like to meet\'); INSERT INTO tweets(name, tweet) values(\'Barack Obama\', \'If you are walking down the right path and you are willing to keep walking, eventually you will make progress.\');';

const seed = (cb) => {
  client.query(SQL_SEED, cb);
};

const sync = (cb) => {
  client.query(SQL_SYNC, cb);
};

const getTweets = (cb) => {
  client.query('SELECT * from tweets', (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getTweet = (id, cb) => {
  client.query('SELECT * from tweets WHERE id=$1', [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

module.exports = {
  seed,
  sync,
  getTweets,
  getTweet
};

