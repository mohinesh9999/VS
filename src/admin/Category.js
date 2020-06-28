import React from  'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper' 
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar'
// import {postDataAndImage} from './FetchServices'
import {db,storage} from '../Firebase'

const useStyles = makeStyles(theme => ({
    paper:{padding:'30px',marginTop:'10px'},
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
      
  }));
function  Category(props){
    const classes = useStyles();
   const [categoryName,setCategoryName]=React.useState('')
   const [categoryDescription,setCategoryDescription]=React.useState('')
   const [categoryIcon,setCategoryIcon]=React.useState({icon:'',file:''})
   const [message,setMessage]=React.useState('')
   const [progress, setProgress] = React.useState(0);
   const [url, setUrl] = React.useState("");
   let abc=''
   const  handleUpload =  () => {
    const uploadTask =  storage.ref(`images/${categoryIcon.file.name}`).put(categoryIcon.file);
     uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
       storage
          .ref("images")
          .child(categoryIcon.file.name)
          .getDownloadURL()
          .then(url1 => {
            db.collection('category').doc().set({
                categoryName,categoryDescription,url:url1})
          });
      }
    );
  };

const addNewRecord=async()=>{
let result=1;
// console.log(storage,db);
try{
    
    await handleUpload()
    console.log(url)
    
}catch(e){
    console.log(e.message)
    result=e.message;
}
if(result===1)
{setCategoryDescription('')
 setCategoryName('')
 setCategoryIcon('')
 setMessage('successfully submitted')
}
else
{setMessage("Fail to Submit Record..")}
}
return(<Container maxWidth="xs">
   <Paper className={classes.paper}>
      <Typography>
      Category Registration
      </Typography>  
<Grid container>
 <Grid item xs={12}>
 <TextField
        id="outlined-dense"
        label="Category Name"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={categoryName}
        variant="outlined"
        onChange={(event)=>setCategoryName(event.target.value)}
        fullWidth
      />
 </Grid>   
 <Grid item xs={12}>
 <TextField
        id="outlined-dense"
        label="Description"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={categoryDescription}
        variant="outlined"
        onChange={(event)=>setCategoryDescription(event.target.value)}
        fullWidth
      />
 </Grid>   

 <Grid item xs={12} sm={6}>
 <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setCategoryIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
 </Grid>   
 <Grid item xs={12} sm={6}>
 <Avatar alt="Image" src={categoryIcon.icon} className={classes.bigAvatar} />
    </Grid>
  
 
 <Grid item xs={12}>
 <Button onClick={addNewRecord} variant="contained"   color="primary" className={classes.button} fullWidth>
        Submit
      </Button>
 </Grid>    
</Grid>
</Paper>
<Typography>
{message}
</Typography>

</Container>)
}
export default Category;