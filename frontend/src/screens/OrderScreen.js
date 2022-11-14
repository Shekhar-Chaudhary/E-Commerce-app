import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { deliverOrder, getOrderDetails, payOrder } from "../actions/orderActions.js";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants.js";

const OrderScreen = () => {
  const id = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    //Calculate Price
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);

    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed()));
  }

  const makePayment = async(token) => {
    const body = {
      token,
      order,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    console.log(token)
    dispatch(payOrder(id, token))
    console.log(dispatch(payOrder(id, token)))

    // fetch("https://localhost:5000/api/config/stripe", {
    //   method:"POST",
    //   headers,
    //   body: JSON.stringify(body),
    // })
    // .then((res) => {
    //   console.log(res);
    //   const { status } = res;
    //   console.log(status);
    // })
    // .catch((err) => console.log(err));
    
    
   const resPay = axios
      .post("/api/config/stripe", {
        headers,
        body: JSON.stringify(body),
      })
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => console.log(err));
      console.log(resPay)
  };

  useEffect(() => {
    if (!order || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong> {order.user.name}
              </p>
              <p>
                <strong>Email : </strong>{" "}
                <a
                  href={`mailto:${order.user.email}`}
                  className="text-decoration-none text-dark"
                >
                  {" "}
                  {order.user.email}{" "}
                </a>
              </p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.country} -{" "}
                {order.shippingAddress.postalCode}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items : </h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <StripeCheckout
                    stripeKey="pk_test_51M2ZZ1SEnBqVwV4rzpygirQlWfYm4GwfgZI6n72M24DWYmh8qjH0U4HZPhw6D2NFEphvtQmX4F7c5Bm7mYLZ5ZJ9009ZnVra5p"
                    token={makePayment}
                    name="Pro Shop"
                    amount={order.totalPrice * 100}
                  />
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
