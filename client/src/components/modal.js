import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from 'react-date-picker';

import { fetchTodos, createTodo } from '../services';

const useStyles = makeStyles({
    content: {
        minHeight: "500px",
    },
    fields: {
        padding: "0.5em",
    }
})

export default function Modal(props) {
    const { onClose, open, setTodos } = props;
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const classes = useStyles();

    const addTodo = async () => {
      try {
        await createTodo({
          name,
          desc,
          expiresOn: new Date(date).getTime(),
          attachment: '',
        });
        
        const res = await fetchTodos();
        setTodos(res.data);
        onClose();
      } catch(e) {
        console.error(e)
      }
    }
    
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Add New Todo</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo Name"
            type="text"
            fullWidth
            className={classes.fields}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          
          <div className={classes.fields}>
              <p>Expiry Date</p>
              <DatePicker onChange={setDate} value={date} minDate={new Date()}/>
          </div>

          <TextField
            placeholder="Todo Description..."
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            className={classes.fields}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => addTodo()}>
            Add
          </Button>
        </DialogActions>
        </Dialog>
    )
}