import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import "./MainView.scss";
import ResultsArea from "./results/resultsArea";

const MainView = props => {
  const { items, loading, error } = props;
  const [filteredItems, setFilteredItems] = useState(null);
  const [advancedItems, setAdvancedItems] = useState(null);
  const [searchFields, setSearchFields] = useState({
    artist: "",
    year: "",
    genre: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleTitleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    const filterItems = items =>
      items.filter(item =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    let filtered = filterItems(advancedItems ? advancedItems : items);

    //reset filtered items when search term is empty
    if (e.target.value === "") {
      filtered = null;
    }
    setFilteredItems(filtered);
  };

  const handleAdvancedSearchChange = e => {
    const fieldId = e.target.id;
    setSearchFields({ ...searchFields, [fieldId]: e.target.value });
  };

  const submitAdvancedSearch = () => {
    //start either with items or filtered items
    let startItems = filteredItems ? filteredItems : items;

    if (searchFields.artist) {
      startItems = startItems.filter(item =>
        item.artist.toLowerCase().includes(searchFields.artist.toLowerCase())
      );
      setAdvancedItems(startItems);
    }

    if (searchFields.year) {
      startItems = startItems.filter(item =>
        item.year.toLowerCase().includes(searchFields.year.toLowerCase())
      );

      setAdvancedItems(startItems);
    }

    if (searchFields.genre) {
      startItems = startItems.filter(item =>
        item.genre.toLowerCase().includes(searchFields.genre.toLowerCase())
      );

      setAdvancedItems(startItems);
    }

    //if all advanced filters are empty, set startItems back to filtered or unfiltered albums
    if (!searchFields.artist && !searchFields.year && !searchFields.genre) {
      setAdvancedItems(null);
    }
  };

  const resetSearch = () => {
    setSearchFields({
      artist: "",
      year: "",
      genre: "",
    });
    setFilteredItems(null);
    setAdvancedItems(null);
    setSearchTerm("");
  };

  // conditoinal rendering for the items
  let results = null;
  if (loading) {
    results = (
      <Row className="d-flex justify-content-center no-results">
        <Spinner animation="border" className="primary" />
      </Row>
    );
  } else if (error) {
    results = (
      <Row className="d-flex justify-content-center no-results">
        Sorry, an error occured
      </Row>
    );
  } else if (items) {
    results = (
      <ResultsArea
        results={
          advancedItems ? advancedItems : filteredItems ? filteredItems : items
        }
      />
    );
  }

  return (
    <div className="root">
      <Container fluid>
        <Row className="d-flex justify-content-start align-items-start">
          <Accordion as={Col} xs={10} md={6} className="accordion">
            <Card className="search-card">
              <Card.Header>
                <Form onSubmit={e => e.preventDefault()}>
                  <Form.Group controlId="title">
                    <Form.Control
                      placeholder="Search for title"
                      onChange={handleTitleChange}
                      value={searchTerm}
                      className="form-input"
                    />
                  </Form.Group>
                </Form>
                <Row>
                  <Col>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="0"
                      className="link-button"
                    >
                      Advanced Search
                    </Accordion.Toggle>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-start align-items-center">
                  <Col>
                    <Button
                      bsPrefix="button reset-button"
                      onClick={resetSearch}
                    >
                      Reset
                    </Button>
                    {Object.values(searchFields).map((filter, idx) => {
                      if (filter) {
                        return (
                          <div className="badge" key={idx}>
                            {filter}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form onSubmit={e => e.preventDefault()}>
                    <Row>
                      <Col>
                        <Form.Group controlId="artist">
                          <Form.Control
                            placeholder="Artist"
                            onChange={handleAdvancedSearchChange}
                            value={searchFields.artist}
                            className="form-input"
                          />
                          <Form.Text className="text-muted">
                            Search for artist
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Group lg={6} as={Col} controlId="year">
                        <Form.Control
                          placeholder="Realease Year"
                          onChange={handleAdvancedSearchChange}
                          value={searchFields.year}
                          className="form-input"
                        />
                        <Form.Text className="text-muted">
                          Search for release year
                        </Form.Text>
                      </Form.Group>

                      <Form.Group lg={6} as={Col} controlId="genre">
                        <Form.Control
                          placeholder="Genre"
                          onChange={handleAdvancedSearchChange}
                          value={searchFields.genre}
                          className="form-input"
                        />
                        <Form.Text className="text-muted">
                          Search for genre
                        </Form.Text>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          bsPrefix="button"
                          onClick={submitAdvancedSearch}
                        >
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
        {results}
      </Container>
    </div>
  );
};

export default MainView;
