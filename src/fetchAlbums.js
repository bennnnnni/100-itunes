export const fetchAlbums = async () => {
  const url = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry;
};
