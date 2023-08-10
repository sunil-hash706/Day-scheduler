const express = require("express");
const cors = require("cors");
require("./DB/Config");
const User = require("./DB/User");
const Job = require("./DB/Job");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/add-job", async (req, res) => {
  const job = new Job(req.body);
  // console.log(req.body);
  let result = await job.save();
  result = result.toObject();
  res.send(result);
});

app.post("/register", async (req, res) => {
  // const { name, email, password, cnfPassword } = req.body;
  // console.log(name);
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  delete result.cnfpassword;
  res.send(result);
});

app.delete("/deletejob/:id", async (req, res) => {
  console.log(req.params.id);
  const result = await Job.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/jobs", async (req, res) => {
  let jobs = await Job.find().sort({ workDate: 1, workStartTime: 1 });
  res.send(jobs);
});

// app.post("/delete-job", async (req, res) => {
//   let jobs = await Job.find();
//   // res.send(jobs);
//   // jobs.deleteOne({ _id: ObjectId(body.jobId) });
// });

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) res.send(user);
    else res.send({ result: "No user found" });
  } else if (req.body.password) res.send({ result: "Enter email address" });
  else res.send({ result: "Enter Password" });
});

app.get("/", (req, res) => {
  res.send("Ye bhai karte hai");
});

// app.post("/add-college", async (req, res) => {
//   let college = new College(req.body);
//   let result = await college.save();
//   result = result.toObject();
//   res.send(result);
// });

// app.post("/Colleges/Review", async (req, res) => {
//   let review = new Review(req.body);
//   let result = await review.save();
//   result = result.toObject();
//   res.send(result);
// });

// app.get("/colleges", async (req, res) => {
//   let colleges = await College.find();
//   if (colleges.length > 0) {
//     res.send(colleges);
//   } else {
//     res.send("No college Found");
//   }
// });

// app.get("/users", async (req, res) => {
//   let users = await User.find();
//   if (users.length > 0) {
//     res.send(users);
//   } else {
//     res.send("No college Found");
//   }
// });

const http = require("http");
const server = http.createServer(app);
server.listen(5000);

// app.listen(5000);
