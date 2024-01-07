import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

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

          {/* Credit Card Details */}
          <div className="col-md-7 mt-5">
            <div className="payment-container">
              <section className="credit-card">
                <div className="paymentinside-container">
                  <div className="card-holder">
                    <div className="card-box bg-news">
                      <form className="payment-details-form">
                        <div className="card-details">
                          <h3 className="title">CREDIT CARD DETAILS</h3>
                          <div className="row">
                            <div className="form-group col-md-7">
                              <div className="inner-addon right-addon">
                                <label htmlFor="cardHolder">Card Holder</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  id="cardHolder"
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-5">
                              <label htmlFor="expirationDate">
                                Expiry Date
                              </label>
                              <div className="input-group expiration-date">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="MM"
                                  id="expirationMonth"
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="YY"
                                  id="expirationYear"
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-7">
                              <div className="inner-addon right-addon">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Card number"
                                  id="cardNumber"
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="cvv">CVV</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="CVV"
                                id="cvc"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <button
                                className="pay-btn"
                                onClick={handlePayment}
                              >
                                Pay
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
