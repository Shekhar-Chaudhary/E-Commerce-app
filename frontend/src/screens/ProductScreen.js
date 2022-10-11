import { useState, useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../Components/Rating/Rating";
import axios from "axios";
// import products from "../products";

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>

        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews.`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status : </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <h6 className="text-success ">In Stock</h6>
                      ) : (
                        <span className="text-danger">Out Of Stock</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn btn-secondary btn-block w-75 d-flex mx-auto text-center"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    <span className="text-center mx-auto">Add To Cart</span>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductScreen;
