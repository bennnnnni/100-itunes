export const fetchPodcasts = async () => {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const url =
    "https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/100/explicit.json";
  const response = await fetch(proxyURL + url);
  const data = await response.json();
  return data.feed.results;
};
