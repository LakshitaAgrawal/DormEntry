import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // form function submit- button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/v1/auth/signup', {
          name,
          email,
          password
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
  };

  return (
    <Layout title={"Signup"}>
      <div className="form-container">

        <form onSubmit={handleSubmit}>
        <h4 className="title">Signup Form</h4>
        <hr/>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              required
              autoFocus
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
