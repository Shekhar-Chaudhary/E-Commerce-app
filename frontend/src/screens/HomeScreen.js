import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";
import { useParams } from "react-router-dom";
import Paginate from "../Components/Paginate/Paginate";
import ProductCarousel from "../Components/ProductCarousel/ProductCarousel";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const keyword = useParams();

  const pageNumber = useParams() || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword.keyword, pageNumber.pageNumber));
  }, [dispatch, keyword.keyword, pageNumber.pageNumber]);

  return (
    <>
      <Meta />
      {keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-light" >Go Back</Link> }
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
