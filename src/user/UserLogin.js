import React,{useEffect,useState} from 'react';
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
// import {postData} from '../FetchServices'
// import OTPInput, { ResendOTP } from "otp-input-react";
import OTPInput, { ResendOTP } from "react-otp-input";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import otp from 'otp-generator'
import { async } from 'q';
import {db} from '../Firebase'
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AdminLogin(props) {
  const classes = useStyles();
  const [OTP, setOTP] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [cnfPwd, setCnfPwd] = useState("");
  const [openPwd, setOpenPwd] = React.useState(false);
  const [userOtp, setUserOtp] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [emailid,setemailid]=React.useState('')
  const [password,setPassword]=React.useState('')
  useEffect(()=>{
   setemailid(props.emailid)
    
    },[]) 
  const checkuserlogin=async()=>{
  let body={'emailid':emailid,
                 'password':password}
   let result=1
   try{
    result=await db.collection('user').doc(emailid).get()
    result=result.data()
    result.emailid=emailid
    console.log(result);
    if(password!=result.password){result=0}
   }catch(e){
       console.log(e.message);
       result=0
   }
   //await postData('user/checkuserlogin',body)
   //alert(result.RESULT)
   if(result!=0)
   {var user=JSON.stringify(result)  
    localStorage.setItem("US_USER",user)
    props.setViews("CATEGORY",'')
   }
   else
   {
     alert('Invalid UID/Password')
   }


  }

  function openChangePassword()
  { return (
    <div>
   
      <Dialog open={openPwd} onClose={handleClosePwd} aria-labelledby="form-dialog-title">
        
        <DialogContent>
          <DialogContentText>
           Change Password
          </DialogContentText>
          <DialogContentText>
          <TextField
        id="standard-password-input"
        label="New Password"
        onChange={setNewPwd}
        
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
     </DialogContentText>
     <DialogContentText>
     <TextField
        id="standard-password-input"
        label="Confirm Password"
        className={classes.textField}
        onChange={setCnfPwd}
        
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePwd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function handleSavePassword()
{}
  




  function handleCheckOtp()
  { setOpen(false)
    if(userOtp==OTP)
    { 
      setOpenPwd(true)
    }
    else{alert('Invalid OTP..')}

  }

  function handleSignUp()
  {
   
   props.setViews('USERREGISTRATION','')

  }
 const  handleOtp=async()=>
 {let body={'emailorphone':emailid,
 }
  var v=otp.generate(4, { alphabets:false,upperCase: false, specialChars: false })
setUserOtp(v)
let result=1
//await postData('user/checkemailandmobile',body)
//alert(result.RESULT)
if(result.RESULT)
{ console.log(result.RESULT)
body={otp:v,
    mobile:result.RESULT[0].phonenumber
  }
  let res=1
  //await postData('api/sendotp',body)
  var mobile='xxxxxx'+(result.RESULT[0].phonenumber).substring(6)
 setMobile(mobile)

  setOpen(true)
}
else
{
alert('Invalid UID/Password')
}
   
  
 
   
 }
 function dialogOtp()
 {return (
  <div>
    
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Mobile No:{mobile}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {OtpWindow()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
         
        <Button onClick={handleCheckOtp} color="primary" autoFocus>
          Set Password
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);}
const handleClose = () => {
  setOpen(false);
};
const handleClosePwd = () => {
  setOpenPwd(false);
};
  function OtpWindow() {

    return (
      <div>
      <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
        secure
      />
      <ResendOTP handelResendClick={() => console.log("Resend clicked")} />
      </div>
    );
  }





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={emailid}
            label="Email ID"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>setemailid(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(event)=>setPassword(event.target.value)}

            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={checkuserlogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={()=>handleOtp()}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={handleSignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
         {dialogOtp()}
         {openChangePassword()}
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}