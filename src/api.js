export const fetchPodcasts = async () => {
  const proxyURL = "https://thingproxy.freeboard.io/fetch/";
  const url =
    "https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/100/explicit.json";
  const response = await fetch(proxyURL + url);
  const data = await response.json();
  return data.feed.results;
};

export const fetchAlbums = async () => {
  const url = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry;
};
