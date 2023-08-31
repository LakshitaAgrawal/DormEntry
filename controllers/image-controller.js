import File from "../models/file.js";

export const uploadImage = async (req, res) => {
  console.log("file from frontend",req.file);
  const roll = req.headers['roll'];
  if (!roll) {
    res.status(404).json({ error: 'Roll Number not found' });  
  } else {
    const fileObj = {
      path: req.file.path,
      name: req.file.originalname,
      rollno: roll
    };
    try {
      const file = await File.create(fileObj);
      console.log("file path is ", file);
      return res
        .status(200)
        .json({ path: `http://localhost:5000/file/${file._id}` });
    } catch (error) {
      console.log("error while posting image ", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

export const downloadImage = async (req, res) => {
  console.log("function is called");
  try {
    console.log("get request from frontend");
    console.log(req.params.fileId);
    const file = await File.findById(req.params.fileId);
    file.downloadContent++;
    await file.save();

    res.download(file.path, file.name);
    // res.status(200).json({path:file.path})
  } catch (error) {
    console.log("error while downloading images ", error.message);
    return res.status(500).json({ error: error.message });
  }
};
