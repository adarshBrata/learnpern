const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//routes
//create
app.post("/todos", async(req, res) =>{
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//get all
app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodo.rows)
    } catch (e) {
        console.error(e.message);
    }
});

//get a todo
app.get("/todos/:tid", async (req, res) => {
   try {
       const { tid } = req.params;
       const todo = await pool.query(
           "SELECT * FROM todo WHERE tid = $1",
           [tid]
       );
       res.json(todo.rows[0]);
   } catch (e) {
       console.error(e.message);
   }
});

//update
app.put("/todos/:tid", async (req, res) => {
    try {
        const { tid } = req.params;
        const { description } = req.body;
        const editTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE tid = $2",
            [description, tid]
        );
        res.json('UPDATE: todo updated');
    } catch (e) {
        console.error(e.message);
    }
});

//delete
app.delete("/todos/:tid", async (req, res) => {
    try {
        const { tid } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE tid = $1",
            [tid]
        );
        res.json("DELETE: todo deleted");
    } catch (e) {
        console.error(e.message);
    }
});

//server
app.listen('5000', (req, res) => {
    console.log('server started at port 5000');
});