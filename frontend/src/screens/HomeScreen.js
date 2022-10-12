import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
       <Message variant="danger"></Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
