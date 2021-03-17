export const fetchPodcasts = async () => {
  // const proxyURL = "https://thingproxy.freeboard.io/fetch/";
  const url =
    "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppodcasts/limit=100/json";
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry;
};

export const fetchAlbums = async () => {
  const url = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry;
};
