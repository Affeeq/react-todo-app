import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../components/modal';
import Todo from '../components/todo';

import { fetchTodos } from '../services';

const useStyles = makeStyles({
    root: {
        padding: "2em 1em",
    },
    pageTitle: {
        "text-align": "center",
        "font-size": "2.5em",
        "padding": "1em",
    },
    colTitle: {
        "text-align": "center",
        "margin-bottom": "1.5em",
    },
    colContainer: {
        // border: '1px solid grey',
    },
    task: {
        padding: "0.5em",
    },
    addTask: {
        padding: "0.2em",
    }
})

export function Home() {
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState([]);

    const filterTodo = (todoId) => setTodos(todos.filter(todo => todo._id !== todoId));
    const handleModal = (bool) => setShowModal(bool);
    const fetchTodosOnLoad =  async () => {
        try {
            const res = await fetchTodos();
            setTodos(res.data);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchTodosOnLoad();
    }, []);

    return (
        <div>
            <div className={classes.pageTitle}>TODO App</div>
            <Grid container className={classes.root}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={classes.colTitle}>
                            Ongoing
                            <IconButton variant="outlined" size="small" className={classes.addTask} onClick={() => handleModal(true)}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Grid item xs={12} className={classes.colContainer}>
                            {todos.length ? todos.map(todo => todo.status === "ongoing" && <Todo {...todo} key={todo._id} filterTodo={filterTodo} setTodos={setTodos} />) : null}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.colTitle}>Dismissed</div>
                        <Grid item xs={12} className={classes.colContainer}>
                        {todos.length ? todos.map(todo => todo.status === "dismissed" && <Todo {...todo} key={todo._id} filterTodo={filterTodo} setTodos={setTodos} />) : null}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.colTitle}>Done</div>
                        <Grid item xs={12} className={classes.colContainer}>
                        {todos.length ? todos.map(todo => todo.status === "done" && <Todo {...todo} key={todo._id} filterTodo={filterTodo} setTodos={setTodos} />) : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal setTodos={setTodos} open={showModal} onClose={() => handleModal(false)} />
        </div>
    )
}