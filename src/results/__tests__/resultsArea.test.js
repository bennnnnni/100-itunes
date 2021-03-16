import React from "react";

import { render } from "../../test-utils";

import ResultsArea from "../resultsArea";

test("<ResultsArea/> renders info message when no results are found via search", () => {
  const fakeProps = { results: [], searched: true };
  const { getByText } = render(<ResultsArea {...fakeProps} />);

  expect(getByText(/found no results/i)).toBeInTheDocument();
});

const fakeAlbum = {
  name: "fake title",
  artist: "fake artist",
  year: "2020",
  genre: "fake genre",
  img: "fakeImgURL",
};

test("<ResultsArea/> renders album when given", () => {
  const fakeProps = { results: [fakeAlbum], searched: false };
  const { getByText, getByTestId } = render(<ResultsArea {...fakeProps} />);

  expect(getByText(/fake title/i)).toBeInTheDocument();
  expect(getByText(/fake artist/i)).toBeInTheDocument();
  expect(getByText(/2020/i)).toBeInTheDocument();
  expect(getByText(/fake genre/i)).toBeInTheDocument();
  expect(getByTestId("card-image")).toBeInTheDocument();
});

test("<ResultsArea/> renders multiple albums when given", () => {
  const fakeProps = {
    results: [fakeAlbum, fakeAlbum, fakeAlbum, fakeAlbum],
    searched: false,
  };
  const { getByTestId } = render(<ResultsArea {...fakeProps} />);

  const resultContainerNode = getByTestId("results-container");
  expect(resultContainerNode.hasChildNodes()).toEqual(true);
  expect(resultContainerNode.childNodes.length).toEqual(4);
});
