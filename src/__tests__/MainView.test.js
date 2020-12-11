import React from "react";

import { render, waitFor } from "@testing-library/react";

import MainView from "../MainView";
import * as fetchModule from "../fetchAlbums";

test("<MainView/> renders header and searchfield", () => {
  const { getByText, getByPlaceholderText } = render(<MainView />);
  //header
  expect(getByText(/top 100/i)).toBeInTheDocument();
  expect(getByText(/albums/i)).toBeInTheDocument();

  //searchfield
  expect(getByPlaceholderText(/search for title/i)).toBeInTheDocument();
});

test("<MainView/> renders error screen when error", async () => {
  jest
    .spyOn(fetchModule, "fetchAlbums")
    .mockRejectedValue(new Error("Async error"));

  const { getByText } = render(<MainView />);
  await waitFor(() =>
    expect(getByText(/Sorry, an error occured/i)).toBeInTheDocument()
  );
});

const fakeAlbum = {
  "im:name": { label: "fake title" },
  "im:artist": {
    label: "fake artist",
  },
  "im:releaseDate": { attributes: { label: "12 november 2020" } },
  category: { attributes: { term: "fake genre" } },
  "im:image": [{}, {}, { label: "fakeImgURL" }],
};

test("<MainView/> renders results when given", async () => {
  jest.spyOn(fetchModule, "fetchAlbums").mockResolvedValue([fakeAlbum]);

  const { getByTestId } = render(<MainView />);
  await waitFor(() =>
    expect(getByTestId("results-container")).toBeInTheDocument()
  );
});
