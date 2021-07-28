import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../../App.css'
import { addUser, getUser } from '../../Mongo';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            fontSize: '0.8rem',
        },
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));



const Login = (props) => {
    const [count, setCount] = useState(0);
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("");
    const handleLogin = async () => {

        localStorage.setItem("userName", name);

        history.push("/");
    }
    return (
        <div className="login">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <Button className={classes.button} variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            </form>
        </div>
    )
}

export default Login
