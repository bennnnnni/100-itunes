import React from "react";

import { getByPlaceholderText, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MainView from "../MainView";
import * as fetchModule from "../fetchAlbums";

const fakeAlbum = {
  "im:name": { label: "fake title" },
  "im:artist": {
    label: "fake artist",
  },
  "im:releaseDate": { attributes: { label: "12 november 2020" } },
  category: { attributes: { term: "fake genre" } },
  "im:image": [{}, {}, { label: "fakeImgURL" }],
};

const fakeAlbum2 = {
  "im:name": { label: "fake title 2" },
  "im:artist": {
    label: "fake artist",
  },
  "im:releaseDate": { attributes: { label: "12 november 2020" } },
  category: { attributes: { term: "fake genre" } },
  "im:image": [{}, {}, { label: "fakeImgURL" }],
};

test("users can search for album title", async () => {
  jest
    .spyOn(fetchModule, "fetchAlbums")
    .mockResolvedValue([fakeAlbum, fakeAlbum2]);

  const { getByTestId, getByPlaceholderText } = render(<MainView />);
  await waitFor(() => {
    expect(getByTestId("results-container")).toBeInTheDocument();
    expect(getByTestId("results-container").childNodes.length).toEqual(2);
  });
  const inputNode = getByPlaceholderText(/search for title/i);

  //user action
  userEvent.type(inputNode, "2");

  //assert on results
  await waitFor(() => {
    expect(getByTestId("results-container").childNodes.length).toEqual(1);
  });
});
