import { nanoid } from "nanoid";

export const transformAlbums = albums => {
  let transformedAlbums = null;
  try {
    transformedAlbums = albums.map((album, idx) => {
      return {
        id: `album_${nanoid()}`,
        rank: idx + 1,
        artist: album["im:artist"].label,
        name: album["im:name"].label,
        img: album["im:image"][2].label,
        year: album["im:releaseDate"].attributes.label.split(" ")[2],
        genre: album.category.attributes.label,
        fav: false,
      };
    });
  } catch (e) {
    console.error(e);
  }
  return transformedAlbums;
};

export const transformPodcasts = podcasts => {
  let transformedPodcasts = null;
  try {
    transformedPodcasts = podcasts.map((podcast, idx) => {
      return {
        id: `album_${nanoid()}`,
        rank: idx + 1,
        artist: podcast["im:artist"].label,
        name: podcast["im:name"].label,
        img: podcast["im:image"][2].label,
        year: podcast["im:releaseDate"].attributes.label.split(" ")[2],
        genre: podcast.category.attributes.label,
        fav: false,
      };
    });
  } catch (e) {
    console.error(e);
  }
  return transformedPodcasts;
};

export const isAlbum = item => {
  if (item.id.startsWith("album")) return true;
  return false;
};

export const isPodcast = item => {
  if (item.id.startsWith("podcast")) return true;
  return false;
};
