import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../Components/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";

const ProductScreen = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  console.log(productDetails)


  const { id } = useParams();

  console.log(product);
  console.log(listProductDetails(id));

  useEffect(() => {
    const pdata = listProductDetails(id);
    console.log(pdata);
    dispatch(listProductDetails(id));
  }, []);

  return (
    <>
      <div>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
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
        )}
      </div>
    </>
  );
};

export default ProductScreen;
