import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Buttons from "../components/Layout/Buttons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-hot-toast";
import moment from "moment";

const HomePage = () => {
  
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [entryType, setEntryType] = useState('');

  const verifyFace = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/api/face-match");
      console.log(res.data);
      if (res.data?.status === 200) {
        toast.success(res.data?.message);
        setStudent(res.data?.student);
        setDate(moment().format("DD MMM YYYY"));
        setTime(moment().format("hh:mm:a"));
      } else {
        toast.error(res.data?.error);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!place || !date || !time || !student?._id || !entryType) return;
    try {
      const res = await axios.patch("/api/v1/auth/student", {
        date,
        time,
        place,
        id: student?._id,
        type: entryType
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setDate('');
        setTime('');
        setStudent({});
        setPlace('');
        setEntryType('');
        console.log(res.data?.liveData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-login">
          <div
            className="row"
            style={{ margin: "150px", marginInlineStart: "500px" }}
          >
            <div className="col-md-6">
              <div className="card-login" style={{borderRadius: "10px", backgroundColor: "lightgray"}}>
                <div className="card-body">
                  <h5 className="card-title">Face Verification</h5>
                  <p className="card-text">
                    Face verification is starting, kindly wait
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (student?.rollno) {
    return (
      <Layout title={"Student Dashboard"}>
        <div className="container-login">
          <form onSubmit={handleSubmit}>
          <div
            style={{
              backgroundColor: "#665A48",
              padding: "5px",
              borderRadius: "12px",
              marginLeft: "300px",
              marginBlock: "60px",
              width: "60%",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#665A48",
              }}
            >
              <div
                style={{
                  height: "40px",
                  width: "40px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
                onClick={() => {
                  setStudent({});
                }}
              >
                <img
                  src="./close.png"
                  alt="close-icon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <img
                src={student.image}
                alt="student-img"
                style={{
                  height: "300px",
                  width: "300px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  padding: "30px",
                }}
              />
              <h3 className="card-title" style={{color: "white"}}>{student.name}</h3>
            </div>
            <div
              style={{
                backgroundColor: "#F3F1F5",
                padding: "30px",
              }}
            >
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <div className="col">
                  <h5>Roll Number :</h5>
                </div>
                <div className="col">
                  <h5>{student.rollno}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5 className="">Room Number :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.room}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Course :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.course}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Semester :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.semester}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Phone no :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.phoneno}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Email :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.email}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Permanent Address :</h5>
                </div>
                <div className="col">
                  <h5 className="">{student.address}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Date :</h5>
                </div>
                <div className="col">
                  <h5 className="">{date}</h5>
                </div>
              </div>
              <div
                className="row"
                styles={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div className="col">
                  <h5>Time Out :</h5>
                </div>
                <div className="col">
                  <h5 className="">{time}</h5>
                </div>
              </div>
            </div>
            <div
              className="livedata"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                backgroundColor: "#F3F1F5",
                padding: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 style={{ padding: "0px 10px", margin: 0 }}>Place :</h5>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                  style={{
                    borderRadius: '6px',
                    border: '2px solid #665A48',
                    height: '30px',
                    padding: '6px'
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 style={{ padding: "0px 10px", margin: 0 }}>Entry Type :</h5>
                <select
                  style={{
                    minWidth: '150px',
                    borderRadius: '6px',
                    border: '2px solid #665A48',
                    height: '30px',
                  }}
                  value={entryType}
                  onChange={(e) => {
                    setEntryType(e.target.value)
                  }}
                >
                  <option value={''} disabled>Choose entry type</option>
                  <option value={'IN'}>In</option>
                  <option value={'OUT'}>Out</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#665A48",
              }}
            >
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!auth.user ? (
        <>
          <div className="home-main">
            <div className="home-head">
              <h1 style={{ fontSize: "60px" }}>Welcome to Dorm Entry</h1>
              <h3 style={{ color: "#704F4F" }}>Gate Entry Made Smarter </h3>
            </div>
            <div className="homesty">
              <Buttons onClick={() => navigate("/Login")}>
                <span>Login </span>
              </Buttons>
              <Buttons onClick={() => navigate("/Signup")}>
                <span>Signup </span>
              </Buttons>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-login">
            <div
              className="row"
              style={{ marginBlockStart: "150px", marginInlineStart: "400px"}}
            >
              <div className="col-md-4">
                <div className="card-login" style={{borderRadius: "10px", backgroundColor: "lightgray"}}>
                  <div className="card-body">
                    <h5 className="card-title">Student Entry</h5>
                    <p className="card-text">Face verification</p>
                    <Buttons onClick={verifyFace} className="btn btn-primary">
                      Face
                    </Buttons>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-login" style={{borderRadius: "10px", backgroundColor: "lightgray"}}>
                  <div className="card-body">
                    <h5 className="card-title">Registration</h5>
                    <p className="card-text">
                      Register here for a new student.
                    </p>
                    <Buttons
                      onClick={() => navigate("/Register")}
                      className="btn btn-primary"
                    >
                      Register
                    </Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
