import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Container, Row, Image } from "react-bootstrap";
import "../App.css";
import QRImage from "../components/QR.jpg";

const PaymentDetails = ({ cart, setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount } = location.state;

  const handlePayment = () => {
    // Clear cart after successful payment
    localStorage.removeItem("cart");
    setCart([]);

    alert(
      "💳 Payment Received!!\n🎉 Your order is confirmed.\n🚚 Keep an eye on your inbox for shipping updates. Happy shopping!"
    );

    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zipCode: "",

    paymentMethod: "upi",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setFormData({
      paymentMethod: value,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
    });
  };

  const [activeSlide, setActiveSlide] = useState(1);

  const handleNextSlide = () => {
    setActiveSlide(activeSlide + 1);
  };

  const handlePreviousSlide = () => {
    setActiveSlide(activeSlide - 1);
  };

  const renderPaymentFields = () => {
    switch (formData.paymentMethod) {
      case "creditCard":
      case "debitCard":
        return (
          <div className="credit-card text-center">
            <Form.Group className="mb-3">
              <Form.Label className="mode">Card Number:</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="ENTER CARD NUMBER"
                className="mx-auto"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label className="mode">Expiry Date:</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                className="mx-auto"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label className="mode">CVV:</Form.Label>
              <Form.Control
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="ENTER CVV"
                className="mx-auto"
              />
            </Form.Group>
          </div>
        );

      case "upi":
        return (
          <Form.Group className="mb-3">
            <Form.Label className="mode">UPI ID:</Form.Label>
            <Form.Control
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              placeholder="ENTER UPI ID"
              className="mx-auto"
            />
          </Form.Group>
        );

      case "onlinePayment":
        return (
          <Form.Group>
            <Image src={QRImage} alt="QR Code" fluid className="mt-4 mx-auto" />
          </Form.Group>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-5 mt-5 mx-auto text-center">
            <div className="card card-blue p-4 text-white mb-3">
              <h2 style={{ textAlign: "center" }}>INVOICE</h2>
              <h4>Products List :</h4>
              <ul className="list-unstyled" style={{ color: "white" }}>
                {cart.map((item) => (
                  <ul>
                    <li key={item.id}>
                      <div>
                        <p>{item.title}</p>
                      </div>
                    </li>
                  </ul>
                ))}
              </ul>
              <div style={{ display: "flex" }}>
                <h4>Payable Amount : </h4>
                <h3 className="mb-0 yellow"> ${totalAmount}</h3>
              </div>
            </div>
          </div>

          <Col md={6} className="mt-5 payment-container">
            <Container className="mt-5">
              {activeSlide === 1 && (
                <Row className="justify-content-md-center">
                  <Col md={6}>
                    <Form onSubmit={handleNextSlide}>
                      <Form.Label className="title">
                        CUSTOMER DETAILS
                      </Form.Label>
                      <Form.Group controlId="name">
                        <label>NAME:</label>
                        <Form.Control
                          className="mx-auto"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="NAME"
                          // required
                        />
                      </Form.Group>

                      <Form.Group controlId="address">
                        <label>ADDRESS:</label>
                        <Form.Control
                          className="mx-auto"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="ADDRESS"
                          // required
                        />
                      </Form.Group>

                      <Form.Group controlId="zipCode">
                        <label>POSTAL CODE:</label>
                        <Form.Control
                          className="mx-auto"
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="POSTAL CODE"
                          // required
                        />
                      </Form.Group>

                      <Button type="success" className="next-btn">
                        Next <span> </span>
                        <i class="fa-solid fa-forward"></i>
                      </Button>
                    </Form>
                  </Col>
                </Row>
              )}

              {activeSlide === 2 && (
                <Row className="justify-content-md-center">
                  <Col>
                    <Form onSubmit={handlePayment}>
                      <Form.Group>
                        <Form.Label className="title">
                          SELECT PAYMENT MODE
                        </Form.Label>
                        <Form.Control
                          style={{ textAlign: "center" }}
                          as="select"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <option value="upi">UPI</option>
                          <option value="debitCard">DEBIT CARD</option>
                          <option value="creditCard">CREDIT CARD</option>
                          <option value="onlinePayment">ONLINE PAYMENT</option>
                          <option value="cod">CASH ON DELIVERY</option>
                        </Form.Control>
                      </Form.Group>

                      {renderPaymentFields()}
                      <Form.Group className="d-flex justify-content-around">
                        <button
                          className="previous-btn"
                          onClick={handlePreviousSlide}
                        >
                          <i class="fa-solid fa-backward"></i> <span> </span>
                          Previous
                        </button>
                        <button className="pay-btn" onClick={handlePayment}>
                          Place Order
                        </button>
                      </Form.Group>

                      {/* <button className="pay-btn">Pay Now</button> */}
                    </Form>
                  </Col>
                </Row>
              )}
            </Container>
          </Col>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
