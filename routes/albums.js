var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Albums() {
  return knex('albums');
}

router.get('/albums', function(req, res, next) {
  Albums().select().then(function (records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.get('/albums/:id', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function (record) {
    res.render('albums/show', {theAlbum: record});
  });
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.get('/albums/:id/edit', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function (record) {
    res.render('albums/edit', {theAlbum: record});
  });
});

router.post('/albums', function(req, res, next) {
  Albums().insert({ artist: req.body.artist, name: req.body.album_name, genre: req.body.genre, stars: req.body.star_rating, explicit: req.body.explicit }).then(function () {
    res.redirect('/albums');
  });
});

router.put('/albums/:id/update', function(req, res, next) {
  Albums().where({id: req.params.id}).update({
    artist: req.body.artist,
    name: req.body.album_name,
    genre: req.body.genre,
    stars: req.body.star_rating,
    explicit: req.body.explicit
  }).then(function () {
    res.redirect('/albums');
  });
});

router.delete('/albums/:id/delete', function(req, res, next) {
  Albums().where({id: req.params.id}).first().del().then(function() {
    res.redirect('/albums');
  })
})
module.exports = router;
