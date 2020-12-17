import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ResultsArea = props => {
  const { albums } = props;

  if (albums.length === 0)
    return (
      <Row className="d-flex justify-content-center">Found no results</Row>
    );

  return (
    <Row data-testid="results-container">
      {albums.map((album, idx) => (
        <Col md={10} xl={6} className="card-col" key={idx}>
          <Card className="d-flex flex-row justify-content-start align-items-center">
            <p className="chart-number">{album.rank}</p>
            <Card.Body>
              <Card.Title>{album["im:name"].label}</Card.Title>
              <Card.Subtitle>{album["im:artist"].label}</Card.Subtitle>
              <Card.Text>
                {`${album["im:releaseDate"].attributes.label.split(" ")[2]} - ${
                  album["category"].attributes.term
                }`}
              </Card.Text>
            </Card.Body>
            <Card.Img
              data-testid="card-image"
              variant="left"
              style={{ width: "150px" }}
              src={album["im:image"][2].label}
            ></Card.Img>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ResultsArea;
