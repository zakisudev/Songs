const Song = require('../models/song.model');
const mongoose = require('mongoose');

// @desc    Get all songs
// @route   GET /api/songs
// @access  Public
const getSongs = async (_, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ songs, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

// @desc    add new song
// @route   POST /api/songs
// @access  Public
const addSong = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    if (!title || !artist || !album || !genre) {
      return res
        .status(400)
        .json({ message: 'Please fill in all fields', success: false });
    }

    const newSong = await Song.create({ title, artist, album, genre });
    if (!newSong) {
      return res
        .status(400)
        .json({ message: 'Song not created', success: false });
    }

    res.status(201).json({ song: newSong, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// @desc    update a song
// @route   PUT /api/songs/:id
// @access  Public
const updateSong = async (req, res) => {
  const songId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(songId)) {
    return res.status(404).json({ message: 'Invalid song id', success: false });
  }

  try {
    const { title, artist, album, genre } = req.body;
    const updatedSong = await Song.findByIdAndUpdate({
      _id: songId,
      title,
      artist,
      album,
      genre,
    });
    if (!updatedSong) {
      return res
        .status(400)
        .json({ message: 'Song not updated', success: false });
    }

    res.status(200).json({ song: updatedSong, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// @desc    delete a song
// @route   DELETE /api/songs/:id
// @access  Public
const deleteSong = async (req, res) => {
  const songId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(songId)) {
    return res.status(404).json({ message: 'Invalid song id', success: false });
  }

  try {
    const deletedSong = await Song.findByIdAndDelete(songId);
    if (!deletedSong) {
      return res
        .status(400)
        .json({ message: 'Song not deleted', success: false });
    }

    res.status(200).json({ song: deletedSong, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
};
