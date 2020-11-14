const express = require("express");
const app = express();
const connectDB = require("./db/mongoose");

app.use(express.json()); //to parse json

//connecting to database
connectDB();

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});

// Load in the mongoose models
const { List, Task } = require("./db/models");

// ROUTE HANDLERS

// LIST ROUTES

// GET /lists
// Purpose: Get all lists
app.get("/lists", (req, res) => {
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

// POST /lists
// Purpose: Create a list
app.post("/lists", (req, res) => {
  let title = req.body.title;
  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

// PATCH /lists/id
// Purpose: Update a list
app.patch("/lists/:id", (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => res.sendStatus(200));
});

// DELETE /lists/id
// Purpose: Delete a list
app.delete("/lists/:id", (req, res) => {
  List.findOneAndRemove({ _id: req.params.id }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

// GET /lists/listId/tasks
// Purpose: Get all tasks of a particular list
app.get("/lists/:listId/tasks", (req, res) => {
  Task.find({ _listId: req.params.listId }).then((tasks) => {
    res.send(tasks);
  });
});

// // GET /lists/listId/tasks/taskId
// // Purpose: Get a particular task of a particular list
// app.get("/lists/:listId/tasks/:taskId", (req, res) => {
//   Task.findOne({ _id: req.params.taskId, _listId: req.params.listId }).then(
//     (task) => {
//       res.send(task);
//     }
//   );
// });

// POST /lists/listId/tasks
// Purpose: Create a task in a particular list
app.post("/lists/:listId/tasks", (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((taskDoc) => {
    res.send(taskDoc);
  });
});

// PATCH /lists/listId/tasks/taskId
// Purpose: Update a task in a particular list
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId, _listId: req.params.listId },
    {
      $set: req.body,
    }
  ).then(() => res.sendStatus(200));
});

// DELETE /lists/listId/tasks/taskId
// Purpose: Delete a task in a particular list
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
