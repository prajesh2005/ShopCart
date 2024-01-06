import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

// ... (previous imports)

function Testing() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      setLoading(true);
      axios({
        method: "GET",
        url: "https://fakestoreapi.com/products",
      })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <>
        <Row xs={1} md={2} lg={3} className="mx-3">
          {data.map((product, idx) => (
            <Col key={idx} className="mb-3">
              <Card>
                <Card.Img variant="top" className="mx-auto" id="img" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{`Category: ${product.category}`}</ListGroup.Item>
                  <ListGroup.Item>{`Price: ${product.price}`}</ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <p>
                      {product.rating && (
                        <div>
                          <p>{`Rating: ${product.rating.rate}`}</p>
                          <br />
                          <p>{`Available Count: ${product.rating.count}`}</p>
                        </div>
                      )}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
                <Button> Add to Cart</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
  
  export default Testing;
  