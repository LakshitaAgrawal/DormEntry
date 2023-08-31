import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { spawn } from "child_process";
import connectDB from "./config/db.js";
import Router from "./routes/AuthRoute.js";
import cors from "cors";
import multer from "multer";
import studentModel from "./models/studentModel.js";
import File from "./models/file.js";

// configure env
dotenv.config();

// db config
connectDB();

// rest object
const app = express();

// middle ware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", Router);
app.use("/", Router);

// rest api
app.get("/", async (req, res) => {
  // await studentModel.deleteMany({});
  // await File.deleteMany({});
  res.send("<h1>welcome</h1>");
});

app.get("/api/py-fetch", async (req, res) => {
  try {
    const files = await File.find({});
    const students = await studentModel.find({});
    res.status(200).json({
      files,
      students,
    });
  } catch {
    res.status(500).json({ error: "Internal Server Errpr" });
  }
});

app.get("/api/face-match", async (req, res) => {
  try {
    const pythonProcess = spawn("python", ["facepython/Project/rough.py"]);
    let flag = false;
    pythonProcess.stdout.on("data", async (data) => {
      const roll = data.toString().trim();
      console.log(roll);
      const student = await studentModel.findOne({
        rollno: `${roll}`,
      });
      console.log(student);
      if (student) {
        res.status(200).json({
          status: 200,
          student: student,
          message: "Face verified successfully",
        });
        flag = true;
        return;
      } else {
        res.status(404).json({ status: 404, error: "Student not found" });
        flag = true;
        return;
      }
    });
    if (!flag) {
      pythonProcess.stderr.on("data", (data) => {
        console.error(data.toString());
      });
      pythonProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  } catch {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

// port
const PORT = process.env.PORT || 5000;

// run listen
app.listen(PORT, () => {
  console.log(`server on ${process.env.DEV_MODE} mode on port is ${PORT}`);
});
