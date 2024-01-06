import "./App.css";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import CartList from "./components/CartList";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ProductDetail from "./components/ProductDetails";
import PaymentDetails from "./components/PaymentDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  });
  const [showCart, setShowCart] = useState(false);
  const [warning, setWarning] = useState(false);

  // Local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // new codess
  const addToCart = (data) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (data.id === product.id) {
        isPresent = true;
      }
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
      return;
    }
    setCart([...cart, { ...data, quantity: 1 }]);
  };

  const handleShow = (value) => {
    setShowCart(value);
  };
  //

  return (
    // <>
    //   <div className="App">
    //     <Navbar
    //       setToken={setToken}
    //       count={cart.length}
    //       handleShow={handleShow}
    //     />

    //     {token ? (
    //       showCart ? (
    //         cart.length === 0 ? (
    //           <div className="emptycart">Your Cart is Empty...</div>
    //         ) : (
    //           <CartList cart={cart} setCart={setCart} />
    //         )
    //       ) : (
    //         <Product addToCart={addToCart} />
    //       )
    //     ) : (
    //       <Login token={token} setToken={setToken} />
    //     )}

    //     {warning && (
    //       <div className="warning">
    //         Product is already available in the cart
    //       </div>
    //     )}

    //     {/* <Footer /> */}
    //   </div>
    // </>
    <>
      {/* <div className="App">
        <Header
          setToken={setToken}
          count={cart.length}
          handleShow={handleShow}
        />
        {showCart ? (
          token ? (
            cart.length === 0 ? (
              <div className="emptycart">Your Cart is Empty...</div>
            ) : (
              <CartList cart={cart} setCart={setCart} />
            )
          ) : (
            <Login token={token} setToken={setToken} />
          )
        ) : (
          <Product addToCart={addToCart} />
        )}

        {warning && (
          <div className="warning">
            Product is already available in the cart
          </div>
        )}

        <Footer />
      </div> */}

      <Router>
        <div className="App">
          <Header
            setToken={setToken}
            count={cart.length}
            handleShow={handleShow}
          />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {showCart ? (
                    token ? (
                      cart.length === 0 ? (
                        <div className="emptycart">Your Cart is Empty...</div>
                      ) : (
                        <CartList cart={cart} setCart={setCart} />
                      )
                    ) : (
                      <Login token={token} setToken={setToken} />
                    )
                  ) : (
                    <Product addToCart={addToCart} />
                  )}
                </div>
              }
            />
            <Route
              path="/product/:productId"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/payment"
              element={<PaymentDetails cart={cart} setCart={setCart} />}
            />
          </Routes>
          {warning && (
            <div className="warning">
              Product is already available in the cart...
            </div>
          )}
          {/* <Footer /> */}
        </div>
      </Router>
    </>
  );
};

export default App;

//  "email": "eve.holt@reqres.in",
// "password": "cityslicka"
