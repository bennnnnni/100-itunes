export const fetchPodcasts = async () => {
  const proxyURL = "https://api.allorigins.win/get?url=";
  const url =
    "https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/100/explicit.json";
  const response = await fetch(proxyURL + encodeURIComponent(url));
  console.log(response);
  const data = await response.json();
  const parsedData = await JSON.parse(data.contents);
  return parsedData.feed.results;
};

export const fetchAlbums = async () => {
  const url = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry;
};
