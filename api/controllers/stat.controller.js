const Song = require('../models/song.model');

const getStat = async (_, res) => {
  try {
    const totalSongs = await Song.find().countDocuments();
    const totalArtists = await Song.find().distinct('artist').countDocuments();
    const totalAlbums = await Song.find().distinct('album').countDocuments();
    const totalGenres = await Song.find().distinct('genre').countDocuments();

    // Get genre counts
    const genreCounts = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);

    // Get songs and albums for each artist
    const artistAlbumCounts = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          totalSongs: { $sum: 1 },
          totalAlbums: { $addToSet: '$album' },
        },
      },
      {
        $project: {
          _id: 0,
          artist: '$_id',
          totalSongs: 1,
          totalAlbums: { $size: '$totalAlbums' },
        },
      },
    ]);

    // Get song stats for each album
    const songStats = await Song.aggregate([
      { $group: { _id: '$album', totalSongs: { $sum: 1 } } },
    ]);

    res.json({
      stats: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        genreCounts,
        artistAlbumCounts,
        songStats,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = getStat;
