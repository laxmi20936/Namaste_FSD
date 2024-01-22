// const express = require('express')
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.all("/", (req, res) => {
  console.log("Request = ", req);
  console.log("Response = ", res);
  res.send("PPP");
});

const todosList = [
  {
    id: 1,
    title: "Task 1",
    completed: true,
  },
  {
    id: 2,
    title: "Task 2",
    completed: false,
  },
];
app.get("/todos", (req, res) => {
  res.json(todosList);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body; //coming from client in string now install body-parser
  todosList.push(newTodo);
  res.json({
    message: "Data added successfully",
  });
});

app.put("/todos/:id", (req, res) => {
  const updatedData = req.body;
  const todoParamsId = Number(req.params.id);
  const todoIndex = todosList.findIndex((td) => td.id === todoParamsId);

  if (todoIndex !== -1) {
    todosList[todoIndex] = {
      id: todoParamsId,
      ...updatedData,
    };
    res.json({
        message: "Updated the prev data succesfully"
      })
  }

  res.status(400).json({
    message: "Not Updated the prev data succesfully"
  })
});

app.delete("/todos/:id", (req, res)=>{
    const todoParamsId = Number(req.params.id);
    const todoIndex = todosList.findIndex(td => td.id === todoParamsId)

    if (todoIndex !== -1) {
        todosList.splice(todoIndex, 1)
        res.json({
            message: "Delete the  data succesfully"
          })
    }

    res.json({
        message: "Delete failed"
      })



})

const portNumber = "5001";
app.listen(portNumber, () => {
  console.log("I am running on" + " " + portNumber);
});
