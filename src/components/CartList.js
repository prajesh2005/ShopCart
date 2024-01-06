import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function CartList({ cart, setCart }) {
  const [CART, setCART] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  // to remove the item
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    // handlePrice();
  };

  // checkout button
  const handleReload = () => {
    // Clear cart in local storage
    localStorage.removeItem("cart");

    // Clear cart in state
    setCart([]);

    // Reload the page
    window.location.reload();

    // Display a thank you message (optional)
    alert("Thank you!!!\nOrder Placed Successfully..");
  };

  // payment
  // const handleBuyNow = () => {
  //   const totalAmount = CART.reduce((total, item) => {
  //     const quantity = item.quantity || item.amount || 1;
  //     return total + item.price * quantity;
  //   }, 0).toFixed(2);

  //   // Log the totalAmount to verify it's correct
  //   console.log("Total Amount:", totalAmount);

  //   // Navigate to the payment details page and pass the cart data and total amount as props
  //   navigate("/payment", { state: { cart: CART, totalAmount } });
  // };
  const handleBuyNow = () => {
    const totalAmount = CART.reduce((total, item) => {
      const quantity = item.quantity || item.amount || 1;
      return total + item.price * quantity;
    }, 0).toFixed(2);

    // Log the totalAmount to verify it's correct
    console.log("Total Amount:", totalAmount);

    // Clear cart in local storage
    // localStorage.removeItem("cart");

    // Clear cart in state
    // setCart([]);

    // Navigate to the payment details page and pass the cart data and total amount as props
    navigate("/payment", { state: { cart: CART, totalAmount } });
  };

  // ... (remaining code)

  return (
    <div>
      {CART?.map((cartItem, cartIndex) => {
        return (
          <>
            <div className="cart-details">
              <img src={cartItem.image} alt="" />
              <div className="imgtitle">
                <h4>{cartItem.title}</h4>
                <h4>{`$${cartItem.price}`}</h4>
              </div>
              <div className="incdec-btn">
                <button
                  className="dec-btn"
                  onClick={() => {
                    const updCart = CART.map((item, index) => {
                      return cartIndex === index
                        ? {
                            ...item,
                            quantity:
                              item.quantity > 1
                                ? item.quantity - 1
                                : (item.quantity = 1),
                          }
                        : item;
                    });
                    setCART(updCart);
                  }}
                >
                  -
                </button>
                <h4>{cartItem.quantity}</h4>
                <button
                  className="inc-btn"
                  onClick={() => {
                    const updCart = CART.map((item, index) => {
                      return cartIndex === index
                        ? { ...item, quantity: item.quantity + 1 }
                        : item;
                    });
                    setCART(updCart);
                  }}
                >
                  +
                </button>
              </div>
              <div className="removetotal-btn">
                <h4 className="prod-amt">
                  {"$"}
                  {cartItem.price * cartItem.quantity}
                </h4>
                <div
                  onClick={() => handleRemove(cartItem.id)}
                  className="remove-btn"
                >
                  Remove
                </div>
              </div>
            </div>
          </>
        );
      })}

      <div className="total">
        <h4 className="final-amt">
          Total Amount: $
          {CART.map((item) => item.price * item.quantity)
            .reduce((total, value) => total + value, 0)
            .toFixed(2)}
        </h4>
        <button className="checkout" onClick={handleBuyNow}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartList;
