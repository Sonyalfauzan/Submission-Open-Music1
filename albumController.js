// controllers/albumController.js
const { Album, Song } = require('../models');

exports.createAlbum = async (req, h) => {
  try {
    const album = await Album.create(req.payload);
    return h.response({
      status: 'success',
      data: {
        albumId: album.id,
      },
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: error.message,
    }).code(400);
  }
};

exports.getAlbumById = async (req, h) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Song,
          as: 'songs',
          attributes: ['id', 'title', 'performer'],
        },
      ],
    });
    if (!album) {
      return h.response({
        status: 'fail',
        message: 'Album not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      data: {
        album,
      },
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};

exports.updateAlbumById = async (req, h) => {
  try {
    const album = await Album.update(req.payload, {
      where: {
        id: req.params.id,
      },
    });
    if (!album) {
      return h.response({
        status: 'fail',
        message: 'Album not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      message: 'Album updated successfully',
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};

exports.deleteAlbumById = async (req, h) => {
  try {
    const album = await Album.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!album) {
      return h.response({
        status: 'fail',
        message: 'Album not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      message: 'Album deleted successfully',
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};
