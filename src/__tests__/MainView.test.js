import React from "react";

import { render } from "../test-utils";

import { loadingStates } from "../constants";
import MainView from "../MainView";
import * as api from "../api";

test("<MainView/> renders searcharea", () => {
  const { getByRole, getByPlaceholderText } = render(<MainView />);
  //searchfield
  expect(getByPlaceholderText(/search for title/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/artist/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/release year/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/genre/i)).toBeInTheDocument();
  expect(getByRole("button", { name: "Advanced Search" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Reset" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Apply" })).toBeInTheDocument();
});

test("<MainView/> renders error screen when error", async () => {
  jest.spyOn(api, "fetchAlbums").mockRejectedValue(new Error("Async error"));

  const { getByText } = render(<MainView loading={loadingStates.FAILED} />);
  expect(getByText(/Sorry, an error occured/i)).toBeInTheDocument();
});

const fakeItems = [
  {
    rank: 1,
    name: "fake title",
    artist: "fake artist",
    year: "fake year",
    img: "fake img",
    genre: "fake",
  },
];

test("<MainView/> renders results when given", async () => {
  const { getByTestId } = render(
    <MainView loading={loadingStates.SUCCEEDED} items={fakeItems} />
  );
  expect(getByTestId("results-container")).toBeInTheDocument();
});
