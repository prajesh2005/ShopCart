import React from "react";
import "../App.css";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-left">
      <div
        className="text-center p-4"
        style={{ backgroundColor: "black", color: "white",fontWeight:'bold' }}
      >
        Copyright @2024 ShopCart
      </div>
    </MDBFooter>
  );
}

export default Footer;
