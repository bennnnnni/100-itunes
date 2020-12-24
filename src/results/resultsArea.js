import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Resultitem from "./ResultItem";
import "./resultsArea.scss";

const ResultsArea = props => {
  const { albums } = props;

  if (albums.length === 0)
    return (
      <Row className="d-flex justify-content-center">Found no results</Row>
    );

  return (
    <Row data-testid="results-container">
      {albums.map((album, idx) => (
        <Col className="card-col" key={idx}>
          <Resultitem result={album} idx={idx} />
        </Col>
      ))}
    </Row>
  );
};

export default ResultsArea;
