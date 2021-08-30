import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Timer from 'react-compound-timer';

import { deleteTodo, fetchTodos, updateTodo } from '../services';

const useStyles = makeStyles({
    task: {
        padding: '0.5em',
    },
    actionButtons: {
        display: "flex"
    }
})

function Todo({ _id, name, desc, expiresOn, status, filterTodo, setTodos }) {
    const classes = useStyles();
    const [initialTime] = useState(new Date(expiresOn).getTime() - new Date().getTime());

    const handleDelete = async () => {
      try {
          await deleteTodo({ todoId: _id });
          filterTodo(_id);
      } catch(e) {
          console.error(e);
      }
    }

    const handleUpdate = async (status) => {
        try {
            await updateTodo({ todoId: _id, status });
            const res = await fetchTodos();
            setTodos(res.data);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <Paper elevation={2} className={classes.task}>
            <Box display="flex" justifyContent="space-between">
                <div>{name}</div>
                <div className={classes.actionButtons}>
                    <IconButton onClick={() => handleUpdate("done")}>
                        <DoneIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Box>

            <div>{desc}</div>

            <Box display="flex" justifyContent="space-between">
                <span>Attachment</span>
                {status === "ongoing" 
                    ? (<span>
                    Expires in: 
                    {<Timer 
                        initialTime={initialTime} 
                        direction="backward"
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => handleUpdate("dismissed"),
                            }
                        ]}
                    >
                        <Timer.Days/>:<Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                    </Timer>}
                </span>) : null}
            </Box>
        </Paper>
    )
}

export default Todo;