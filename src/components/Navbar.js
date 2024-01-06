// import React from "react";
// import "../App.css";

// const Navbar = ({ setToken, count, handleShow }) => {
//   const logoutHandeler = () => {
//     setToken("");
//     localStorage.clear();
//   };

//   return (
//     <div className="navbar">
//       <div className="nav-left">
//         <h1 className="logo" onClick={() => handleShow(false)}>
//           ShopCart
//         </h1>
//       </div>

//       <div className="nav-right">
//         <div className="cart">
//           <i class="fa-solid fa-cart-plus" onClick={() => handleShow(true)}></i>{" "}
//           <sup>{count}</sup>
//         </div>

//         <button className="logout-btn" onClick={logoutHandeler}>
//           {" "}
//           Logout <i class="fa-solid fa-right-from-bracket"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// Navbar.js

import React, { useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ setToken, count, handleShow }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    setToken("");
    localStorage.clear();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* <div className="navbar">
        <div className="nav-left">
          <h1 className="logo" onClick={() => handleShow(false)}>
            ShopCart
          </h1>
        </div>

        <div className={`nav-right ${isMenuOpen ? "active" : ""}`}>
          <div className="cart" onClick={() => handleShow(true)}>
            <i className="fa-solid fa-cart-plus"></i> <sup>{count}</sup>
          </div>

          <button className="logout-btn" onClick={logoutHandler}>
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>

        <div className="menu-btn" onClick={toggleMenu}>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div> */}

      <Navbar collapseOnSelect expand="lg" id="nav">
        <Container>
          <Navbar.Brand className="logo" onClick={() => handleShow(false)}>
            ShopCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Button
                variant="dark"
                className="cart"
                onClick={() => handleShow(true)}
              >
                <i className="fa-solid fa-cart-plus"></i> <sup>{count}</sup>
              </Button>
              <Button
                variant="dark"
                className="logout-btn"
                onClick={logoutHandler}
              >
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
