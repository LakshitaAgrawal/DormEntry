import userModel from "../models/userModel.js";
import studentModel from "../models/studentModel.js";
import livedataModel from "../models/livedataModel.js";
import { hashPassword,comparePassword } from "../helpers/AuthHelper.js";
import JWT from "jsonwebtoken";

// Post signup
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


// Post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


// Post student register
export const stuRegisterController = async (req, res) => {
  console.log("req is ",req.body)
  try {
    const { name, email, room, rollno, course, semester, phoneno, parentphone, address, image } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!room) {
      return res.send({ message: "Room no is required" });
    }
    if (!rollno) {
      return res.send({ message: "Roll no is required" });
    }
    if (!course) {
      return res.send({ message: "Course is required" });
    }
    if (!semester) {
      return res.send({ message: "Semester is required" });
    }
    if (!phoneno) {
      return res.send({ message: "Phone no is required" });
    }
    if (!parentphone) {
      return res.send({ message: "Parent phone no is required" });
    }
    if (!address) {
      return res.send({ message: "Permanent address is required" });
    }
    if (!image) {
      return res.send({ message: "Image is required" });
    }
    
    //check user
    const exisitingUser = await studentModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    // const hashedPassword = await hashPassword(password);
    //save
    const user = await new studentModel({
      name,
      room,
      email, 
      rollno, 
      course, 
      semester, 
      phoneno, 
      parentphone, 
      address,
      image,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};



// Post student live data
export const stuLiveController = async (req, res) => {
  try {
    const { date, time , place, id, type } = req.body;
    //validations
    if (!id) {
      return res.send({message: "Id is required"});
    }
    if (!date) {
      return res.send({ message: "Date is Required" });
    }
    if (!time) {
      return res.send({ message: "Time is Required" });
    }
    if (!place) {
      return res.send({ message: "Place is required" });
    }
    if (!type) {
      return res.send({message: "Entry type is required"});
    }
    
    
    // check user
    const exisitingUser = await studentModel.findById(id);
    if (!exisitingUser){
      return res.status(404).send({
        success: false,
        message: "Student not found"
      })
    } else {
      let liveData = await livedataModel.create({
        student_id: id,
        date,
        time,
        place,
        type
      });
      res.status(201).send({
        success: true,
        message: "Entry created successfully",
        liveData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro while creating the entry",
      error,
    });
  }
};



//  test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};