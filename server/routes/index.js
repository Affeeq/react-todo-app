const express = require('express');
const Todo = require("../models/todo");
const router = express.Router();

router.get("/fetch", async (_, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
})

router.post("/create", async (req, res) => {
    const newTodo = new Todo({ ...req.body, expiresOn: new Date(req.body.expiresOn) });
    try {
        await newTodo.save();
        res.status(200).send("Successfully created a new todo");
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
})

router.put("/update", async (req, res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: req.body.todoId },
            { status: req.body.status }
        )

        res.status(200).send("Successfully updated a todo");
    } catch(e) {
        console.error(e);
        res.status(500).send(e);
    }
})

router.delete("/delete", async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.body.todoId });
        res.status(200).send("Successfully deleted a todo");
    } catch(e) {
        console.error(e);
        res.status(500).send(e);
    }
})

module.exports = router;