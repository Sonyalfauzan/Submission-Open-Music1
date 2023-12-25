// routes/albumRoutes.js
const Hapi = require('@hapi/hapi');
const albumController = require('../controllers/albumController');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route([
  { method: 'POST', path: '/albums', handler: albumController.createAlbum, options: {
    validate: {
      payload: {
        name: Joi.string().required(),
        year: Joi.number().integer().required(),
      },
    },
  }},
  { method: 'GET', path: '/albums/{id}', handler: albumController.getAlbumById },
  { method: 'PUT', path: '/albums/{id}', handler: albumController.updateAlbumById, options: {
    validate: {
      payload: {
        name: Joi.string().required(),
        year: Joi.number().integer().required(),
      },
    },
  }},
  { method: 'DELETE', path: '/albums/{id}', handler: albumController  },
  { method: 'DELETE', path: '/albums/{id}', handler: albumController.deleteAlbumById },
]);

server.start();

  