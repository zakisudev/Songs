const checkProperties = (res, body) => {
  const { title, artist, album, genre } = body;

  if (title && (title.length < 3 || title.length > 20)) {
    return res.status(400).json({
      message: 'Title must be between 3 and 20 characters',
      success: false,
    });
  }

  if (artist && (artist.length < 3 || artist.length > 20)) {
    return res.status(400).json({
      message: 'Artist must be between 3 and 20 characters',
      success: false,
    });
  }

  if (album && (album.length < 3 || album.length > 20)) {
    return res.status(400).json({
      message: 'Album must be between 3 and 20 characters',
      success: false,
    });
  }

  if (genre && (genre.length < 3 || genre.length > 20)) {
    return res.status(400).json({
      message: 'Genre must be between 3 and 20 characters',
      success: false,
    });
  }

  return true;
};

const checkAddValues = (res, body) => {
  const { title, artist, album, genre } = body;

  if (!title || !artist || !album || !genre) {
    return res.status(400).json({
      message: 'Please fill all fields',
      success: false,
    });
  }

  return true;
};

const checkUpdateValues = (res, body) => {
  const { title, artist, album, genre } = body;

  if (!title && !artist && !album && !genre) {
    return res.status(400).json({
      message: 'Please fill at least one field',
      success: false,
    });
  }

  return true;
};

module.exports = { checkProperties, checkAddValues, checkUpdateValues };
