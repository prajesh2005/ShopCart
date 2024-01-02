import React, { useEffect, useState } from "react";
import "../App.css";

function CartList({ cart,setCart }) {
  const [CART, setCART] = useState([]);

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  // to remove the item
  const handleRemove = (id) =>{
    const arr = cart.filter((item)=>item.id !== id);
    setCart(arr);
    // handlePrice();
}

  // checkout button
  const handleReload = () => {
    window.location.reload();
    alert("Thankyou!!!\nOrder Placed Sucessfully..");
  };

  return (
    <div>
      {CART?.map((cartItem, cartIndex) => {
        return (
          <div className="cart-details">
            <img src={cartItem.image} alt="" />
            <h4>{cartItem.title}</h4>
            <br></br>
            <h4>{cartItem.price}</h4>
            <button className="dec-btn"
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
            >-</button>
            <h4>{cartItem.quantity}</h4>
            <button className="inc-btn"
              onClick={() => {
                const updCart = CART.map((item, index) => {
                  return cartIndex === index
                    ? { ...item, quantity: item.quantity + 1 }
                    : item;
                });
                setCART(updCart);
              }}
            >+</button>
            <div
              onClick={() => handleRemove(cartItem.id)} className="remove-btn">Remove</div>
            <h4 className="prod-amt"> {cartItem.price * cartItem.quantity}</h4>
          </div>
        );
      })}

      <div className="total">
        <h4 className="final-amt">
          Final Amount: $
          {CART.map((item) => item.price * item.quantity).reduce(
            (total, value) => total + value,
            0
          )}
        </h4>
        <button className="checkout" onClick={handleReload}>
          CheckOut
        </button>
      </div>
    </div>
  );
}

export default CartList;
