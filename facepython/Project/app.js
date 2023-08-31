// // const express = require('express');
// // const app = express();
// // const port = 3000;
// // const bodyParser = require('body-parser');
// // const MongoClient = require('mongodb').MongoClient;


// // const path = require('path');
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');


// // // Database connection string
// // const uri = "mongodb+srv://priyanshibr:9zECnmNkBL2S54UC@dormEntry.mongodb.net/test?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true });

// // // Parse URL-encoded bodies (as sent by HTML forms)
// // app.use(bodyParser.urlencoded({ extended: true }));

// // // Parse JSON bodies (as sent by API clients)
// // app.use(bodyParser.json());

// // // Serve the index.html file on the root URL
// // app.get('/', function(req, res) {
// //   res.sendFile(__dirname + '/index.html');
// // });

// // // Handle form submission
// // app.post('/submit', function(req, res) {
// //   // Get the form data
// //   const name = req.body.name;
// //   const date = req.body.date;
// //   const time = req.body.time;

// //   // Connect to the database
// //   client.connect(err => {
// //     const collection = client.db("test").collection("attendance");

// //     // Insert the attendance record
// //     collection.insertOne({ name: name, date: date, time: time }, function(err, result) {
// //       if (err) throw err;

// //       console.log('Attendance marked for ' + name);
// //       res.send('Attendance marked for ' + name);
// //     });
// //   });
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/attendanceDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Create attendance schema and model
// const attendanceSchema = new mongoose.Schema({
//   name: String,
//   date: String
// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// // Use body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from public directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle form submission
// app.post('/submit', async (req, res) => {
//   const { name } = req.body;

//   // Save attendance record to database
//   const attendance = new Attendance({
//     name: name,
//     date: new Date().toLocaleString()
//   });

//   await attendance.save();

//   res.redirect('/');
// });

// // Get attendance records from database
// app.get('/attendance', async (req, res) => {
//   const attendance = await Attendance.find({});

//   res.json(attendance);
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Database connection string
const uri = "mongodb+srv://priyanshibr:9zECnmNkBL2S54UC@dormEntry.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve the index.html file on the root URL
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', function(req, res) {
  // Get the form data
  const name = req.body.name;
  const date = req.body.date;
  const time = req.body.time;

  // Connect to the database
  client.connect(err => {
    //const collection = client.db("test").collection("attendance");
    const collection = client.db("livedetails").collection("test")

    // Insert the attendance record
    collection.insertOne({ name: name, date: date, time: time }, function(err, result) {
      if (err) throw err;

      console.log('Attendance marked for ' + name);
      res.send('Attendance marked for ' + name);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
