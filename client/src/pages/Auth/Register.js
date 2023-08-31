import React, { useState, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Register.css";

import { uploadFile } from '../../service/api';


const Register = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [phoneno, setPhone] = useState("");
  const [parentphone, setParentPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const fileInputRef=useRef();

  const onUploadClick=()=>{
    fileInputRef.current.click();
  }

  // form function submit- button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgPath = await getImage();
      const res = await axios.post("/api/v1/auth/register", {
        name,
        room,
        email,
        rollno,
        course,
        semester,
        phoneno,
        parentphone,
        address,
        image: imgPath
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  const getImage=async ()=>{
    if(image){
      const data= new FormData();
      data.append("name", image.name);
      data.append("file",image);
    let response=await uploadFile(data, rollno);
    return response.path;
    }
  }


  return (
    <Layout title={"Student Register"}>
      <div className="form-student" style={{ backgroundColor: "lightgray"}}>
        <form onSubmit={handleSubmit}>
          <h4 className="titlestu">Registration Form</h4>
          <hr className="hr-title" />
          <div className="user-details">
            <div className="row">
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Full Name
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
              </div>
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Roll no
                </label>
                <input
                  type="number"
                  value={rollno}
                  onChange={(e) => setRoll(e.target.value)}
                  className="form-control"
                  id="exampleInputRoll"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Room no
                </label>
                <input
                  type="number"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="form-control"
                  id="exampleInputRoom"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Course
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="form-control"
                  id="exampleInputCourse"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Semester
                </label>
                <input
                  type="number"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="form-control"
                  id="exampleInputSemester"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Phone number
                </label>
                <input
                  type="number"
                  value={phoneno}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Parent Phone number
                </label>
                <input
                  type="number"
                  value={parentphone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputParentno"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="col input_box">
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
              </div>
            </div>
            <div className="row">
              <div className="col input_box">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Permanent Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputAddress"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
          </div>

          <div className="gender">
            <span className="gender_title">Gender</span>
            <input type="radio" name="gender" id="radio_1" />
            <input type="radio" name="gender" id="radio_2" />
            <input type="radio" name="gender" id="radio_3" />
            <div className="category">
              <label htmlFor="radio_1">
                <span className="dot one" />
                <span>Male</span>
              </label>
              <label htmlFor="radio_2">
                <span className="dot two" />
                <span>Female</span>
              </label>
              <label htmlFor="radio_3">
                <span className="dot three" />
                <span>Prefer not to say</span>
              </label>
            </div>
            <div className="uploadimage">
              {/* <label htmlFor="imgs">Upload Image</label> */}
              <button className="uploadbtn" onClick={()=> onUploadClick()}>Upload Image</button>
              <input
                id="imgs"
                // name="image"
                type="file"
                // files={image}
                // accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImage(e.target.files[0])}
                ref={fileInputRef}
                // required
              /> 
              {/* <input type='file' onChange={(e)=>setImage(e.target.files[0])} style={{display:"none"}} >
              </input> */}



            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
