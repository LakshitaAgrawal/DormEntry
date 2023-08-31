import React from "react";
import Layout from "../components/Layout/Layout";
import phone from "./images/phone.png";
import address from "./images/address.png";
import facebook from "./images/facebook.png";
import twitter from "./images/twitter.png";
import instagram from "./images/instagram.png";
import email from "./images/email.png";
import "./Contact.css";
// import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <Layout title={"Contact us - DormEntry"}>
      <div>
        <div className="contact-container">
          <div>
            <h1 className="con-title">
              Contact <span> Info</span>
            </h1>
          </div>
          <div className="contact-items">
            <div className="row">
              <div className="col itemcontact" style={{backgroundColor: "lightgray"}}>
                <div className="iconcontact">
                  <img src={phone} alt="phone" />
                </div>
                <div className="info">
                  <h2>Phone</h2>
                  <h4>+91-123456789</h4>
                  <h4>+91-987654321</h4>
                </div>
              </div>
              <div className="col itemcontact" style={{backgroundColor: "lightgray"}}>
                <div className="iconcontact">
                  <img src={email} alt="email" />
                </div>
                <div className="info">
                  <h2>Email</h2>
                  <h4>dormentry@gmail.com</h4>
                  <h4>enterdorm043@gmail.com</h4>
                </div>
              </div>
              <div className="col itemcontact" style={{backgroundColor: "lightgray"}}>
                <div className="iconcontact">
                  <img src={address} alt="address" />
                </div>
                <div className="info">
                  <h2>Address</h2>
                  <h4>House no-18 , this town</h4>
                  <h4>This This</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-container">
          <div className="social-icon">
            <div className="row">
              <div className="col social-items">
                <a href="https://www.facebook.com/">
                  <img
                    src={facebook}
                    alt="facebook"
                    style={{ width: "50px" }}
                  />
                </a>
              </div>
              <div className="col social-items">
                <a href="https://www.instagram.com/">
                  <img
                    src={instagram}
                    alt="instagram"
                    style={{ width: "50px" }}
                  />
                </a>
              </div>
              <div className="col social-items">
                <a href="https://twitter.com/">
                  <img src={twitter} alt="twitter" style={{ width: "50px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
