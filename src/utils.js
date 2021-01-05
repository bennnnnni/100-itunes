export const transformAlbums = albums => {
  let transformedAlbums = null;
  try {
    transformedAlbums = albums.map((album, idx) => {
      return {
        rank: idx + 1,
        artist: album["im:artist"].label,
        name: album["im:name"].label,
        img: album["im:image"][2].label,
        year: album["im:releaseDate"].attributes.label.split(" ")[2],
        genre: album.category.attributes.label,
      };
    });
  } catch (e) {
    console.error(e);
  }
  return transformedAlbums;
};
