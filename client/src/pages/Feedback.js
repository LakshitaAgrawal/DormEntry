import React from "react";
import Layout from "../components/Layout/Layout";
import "./Services.css";
import Communication from './images/Communication.png';
import design from './images/design.png';
import happycustomer from './images/happycustomer.png';

const Feedback = () => {
  return (
    <Layout title={"Services - DormEntry"}>
      <div>
        <h1>Our Features &amp; Services</h1>
        <div className="row">
          <div className="box">
            <img className="security" src={happycustomer} alt="" style={{height: "220px"}} />
            <h3>Visitor Management</h3>
            <p>
              {" "}
              DormEntry website offer visitor management solutions that help
              organizations manage their visitor's entry and exit and keep all
              the record.
            </p>
          </div>
          <div className="box">
            <img src={design} alt="" />
            <h3>Security Services</h3>
            <p>
              DormEntry websites may offer security services that provide
              screening and monitoring of visitors and Residents at entry
              points.
            </p>
          </div>
          '
          <div className="box">
            <img className="security" src={Communication} alt="" />
            <h3>Communication</h3>
            <p>
              {" "}
              We provide social media accounts and contact so user can stay up
              to date and make it easier to contact with your brand in case of
              any query.{" "}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
