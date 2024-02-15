const Song = require('../models/song.model');

const getStat = async (_, res) => {
  try {
    // Get total songs
    const totalSongs = await Song.countDocuments();

    // Get total albums
    const totalAlbums = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]).then((albums) => albums.length);

    // Get total artists
    const totalArtists = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]).then((artists) => artists.length);

    // Get total genres
    const totalGenres = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]).then((genres) => genres.length);

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
    console.log(error.message);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = getStat;
