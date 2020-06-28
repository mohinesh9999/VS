import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { async } from 'q';
// import { postData } from '../FetchServices'
 import {db} from '../Firebase'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [firstname, setfirstname]= React.useState();
  const [lastname, setlastname]= React.useState();
  const [emailid, setemailid]= React.useState();
  const [phonenumber, setphonenumber]= React.useState();
  const [password, setpassword]= React.useState();

  const userregisteration= async()=>{
      let body={'firstname': firstname,
            'lastname': lastname,
            'emailid': emailid,
            'phonenumber': phonenumber,
            'password': password
        }
    let result=-1
    // await postData('user/newuser', body)
        try{
            let x=await db.collection('user').doc(emailid).get()
            x=x.data()
            if(x){
                result=2
            }else{
                await db.collection('user').doc(emailid).set({firstname,lastname,emailid,phonenumber,password})
                result=1
            }
        }catch(e){

        }
    if (result==1){
        alert("Registeration Done Successfully")
        let body={'firstname': firstname,
  
        'emailid': emailid,
     
         
    }
// let result= 1
//await postData('email/sendemail', body)
        props.setViews('USERLOGIN',emailid)
    }
    else if(result==2){
        alert("already registered")
        props.setViews('USERLOGIN',emailid)

    }
    else{
        alert('Failed to Register')
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={firstname}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event)=>setfirstname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={lastname}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event)=>setlastname(event.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phonenumber"
                value={phonenumber}
                label="Phone Number"
                name="phonenumber"
                autoComplete="phonenumber"
                onChange={(event)=>setphonenumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={emailid}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event)=>setemailid(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>setpassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Send Confirmation Mail"
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            onClick={userregisteration}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}