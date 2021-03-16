import React from "react";

import { render, waitFor } from "../test-utils";
import userEvent from "@testing-library/user-event";

import MainView from "../MainView";
import { loadingStates } from "../constants";

const fakeAlbum = {
  rank: 1,
  name: "fake title",
  artist: "fake artist",
  year: "fake year",
  img: "fake img",
  genre: "fake",
};

const fakeAlbum2 = {
  rank: 2,
  name: "fake title 2",
  artist: "fake artist 2",
  year: "fake year 2",
  img: "fake img 2",
  genre: "fake 2",
};

test("users can search for album title", async () => {
  const { getByTestId, getByPlaceholderText } = render(
    <MainView
      items={[fakeAlbum, fakeAlbum2]}
      loading={loadingStates.SUCCEEDED}
    />
  );
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
