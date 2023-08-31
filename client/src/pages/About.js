import React from "react";
import Layout from "../components/Layout/Layout";
import "./About.css"
import group from "./images/group.png";
import commitment from "./images/commitment.png";
import improvement from "./images/improvement.png";
import team from "./images/team.png";

const About = () => {
  return (
    <Layout title={"About us - DormEntry"}>
      <div>
        <h1 className="headingabout">
          WELCOME TO DORM ENTRY
        </h1>
        <div className="title wrapper">
          <p className="first">
            At Dorm Entry, we understand the importance of having a secure and
            efficient entry system in place for dormitories and other
            residential spaces. Whether you're a student, a resident, or a
            property manager, we aim to provide you with the knowledge and tools
            you need to ensure the safety and well-being of everyone
            involved.Our team is passionate about helping others by creating a
            safe and welcoming environment.{" "}
          </p>
        </div>
        <div className="container">
          <h2 className="h2about">OUR COMPANY VALUES</h2>
          <div className="container-items">
            <div className="row">
              <div className="col itemabout" style={{backgroundColor: "lightgray"}}>
                <div className="iconabout">
                  <img src={group} alt="group" />
                </div>
                <div className="info">
                  <h2>Transperancy</h2>
                  <h4>
                    Openness with our team &amp; clients. We raise issue &amp;
                    provide solutions prompthy
                  </h4>
                </div>
              </div>
              <div className="col itemabout" style={{backgroundColor: "lightgray"}}>
                <div className="iconabout">
                  <img src={commitment} alt="commitment" />
                </div>
                <div className="info">
                  <h2>Commitment</h2>
                  <h4>
                    Our Word and hard work over everything else. Our clients and
                    vision are our guiding beacons{" "}
                  </h4>
                </div>
              </div>
              <div className="col itemabout" style={{backgroundColor: "lightgray"}}>
                <div className="iconabout">
                  <img src={improvement} alt="improvement" />
                </div>
                <div className="info">
                  <h2>Improvement</h2>
                  <h4>
                    Never stop learning. never stop evolving into who we want to
                    be and where we want to be.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Team wrapper">
          <h2 className="h2about"> OUR TEAM</h2>
          <p className="second">
            We are all very different. we were born in different cities, at
            different times , in different cities , we love different music ,
            food , movies . We are a group of friends wanted to showcase our
            talent by giving society something that they need. But we have
            something that unites us all. It is our webite.We are its hearts. We
            are a Family.{" "}
          </p>
          <div className="images">

              <img className="photo" src={team} alt="team" />

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
