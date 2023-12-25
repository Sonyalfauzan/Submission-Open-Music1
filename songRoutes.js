// routes/songRoutes.js
const Hapi = require('@hapi/hapi');
const songController = require('../controllers/songController');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route([
  { method: 'POST', path: '/songs', handler: songController.createSong, options: {
    validate: {
      payload: {
        title: Joi.string().required(),
        year: Joi.number().integer().required(),
        performer: Joi.string().required(),
        genre: Joi.string().required(),
        duration: Joi.number().integer(),
        albumId: Joi.string(),
      },
    },
  }},
  { method: 'GET', path: '/songs', handler: songController.getSongs },
  { method: 'GET', path: '/songs/{id}', handler: songController.getSongById },
  { method: 'PUT', path: '/songs/{id}', handler: songController.updateSongById, options: {
    validate: {
      payload: {
        title: Joi.string().required(),
        year: Joi.number().integer().required(),
        performer: Joi.string().required(),
        genre: Joi.string().required(),
        duration: Joi.number().integer(),
        albumId: Joi.string(),
      },
    },
  }},
  { method: 'DELETE', path: '/songs/{id}', handler: songController.deleteSongById },
]);

server.start();
