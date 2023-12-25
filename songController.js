// controllers/songController.js
const { Song } = require('../models');

exports.createSong = async (req, h) => {
  try {
    const song = await Song.create(req.payload);
    return h.response({
      status: 'success',
      data: {
        songId: song.id,
      },
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: error.message,
    }).code(400);
  }
};

exports.getSongs = async (req, h) => {
  try {
    const songs = await Song.findAll();
    return h.response({
      status: 'success',
      data: {
        songs,
      },
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};

exports.getSongById = async (req, h) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return h.response({
        status: 'fail',
        message: 'Song not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      data: {
        song,
      },
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};

exports.updateSongById = async (req, h) => {
  try {
    const song = await Song.update(req.payload, {
      where: {
        id: req.params.id,
      },
    });
    if (!song) {
      return h.response({
        status: 'fail',
        message: 'Song not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      message: 'Song updated successfully',
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};

exports.deleteSongById = async (req, h) => {
  try {
    const song = await Song.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!song) {
      return h.response({
        status: 'fail',
        message: 'Song not found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      message: 'Song deleted successfully',
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};
