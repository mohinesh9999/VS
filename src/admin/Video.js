import React from 'react';
import clsx from 'clsx';
import { Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper' 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import {postDataAndImage,getData,postData} from './FetchServices';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'; 
import Select from '@material-ui/core/Select';
import {db,storage} from '../Firebase'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
    
    paper:{padding:'20px',marginTop:'20px'},
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 170,
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    group: {
        margin: theme.spacing(1, 0),
      },
      bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
      input: {
        display: 'none',
      },
  }));
  

 function Video(props){
    const classes = useStyles();
    const [categoryid,setcategoryid]=React.useState('');
    const[subcategoryid,setsubcategoryid]=React.useState('');
    const[videotitle,setvideotitle]=React.useState('');
    const[videometadata,setvideometadata]=React.useState('');
    const[videodescription,setvideodescription]=React.useState('');
    const[status,setstatus]=React.useState('');
    const[amount,setamount]=React.useState('');
    const[poster,setposter]=React.useState({icon:'',file:''});
    const[Videourl,setvideourl]=React.useState({file:''});
    const[message,setMessage]=React.useState('')
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [getList,setList]=React.useState([])
    const [getSCList,setSCList]=React.useState([])
    const [purl1,spurl1]=React.useState("")
    const [Progress,setProgress]=React.useState(0)
    React.useEffect(() => {
      readAllRecords()
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
    const readAllSCRecords=async(categoryid)=>{
      let body={'categoryid':categoryid}
      var list=[]
      await db.collection('category').doc(categoryid).collection('subcategory').get().
      then(a=>{
          a.forEach(b=>{
              let obj=b.data()
              obj.id=b.id
              list.push(obj)
          })
      })
      setSCList(list)   
      }
      const menuSCList=()=>{
        return getSCList.map((item,index)=>{
         
         return( <MenuItem value={item.id}>{item.subCategoryName}</MenuItem>)
         
        })
         
         }  
    
    const readAllRecords=async()=>{
      var list=[]
    //   await getData('category/displayall') 
        await db.collection('category').get().then(a=>{
            a.forEach(b=>{
                let obj=b.data()
                obj.id=b.id
                list.push(obj)
            })
        })
      setList(list)   
      }
      const menuList=()=>{
        return getList.map((item,index)=>{
         
         return( <MenuItem value={item.id}>{item.categoryName}</MenuItem>)
         
        })
         
         }
         const hu2=()=>{
            const uploadTask1 =  storage.ref(`images/${poster.file.name}`).put(poster.file);
            uploadTask1.on(
             "state_changed",
             snapshot => {
               const progress = Math.round(
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               );
               // setProgress(progress);
             },
             error => {
               console.log(error);
             },
             () => {
              storage
                 .ref("images")
                 .child(poster.file.name)
                 .getDownloadURL()
                 .then(purl => {
                  spurl1(purl)
                 });
             }
           )
         }
         const  handleUpload =  () => {
            const uploadTask =  storage.ref(`videos/${Videourl.file.name}`).put(Videourl.file);
             uploadTask.on(
              "state_changed",
              snapshot => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progress,'mmm');
                setProgress(progress);
              },
              error => {
                console.log(error);
              },
              () => {
               storage
                  .ref("videos")
                  .child(Videourl.file.name)
                  .getDownloadURL()
                  .then( vurl => {
                    const uploadTask1 =  storage.ref(`images/${poster.file.name}`).put(poster.file);
                    uploadTask1.on(
                     "state_changed",
                     snapshot => {
                       const progress = Math.round(
                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                       );
                       // setProgress(progress);
                     },
                     error => {
                       console.log(error);
                     },
                     () => {
                      storage
                         .ref("images")
                         .child(poster.file.name)
                         .getDownloadURL()
                         .then(purl => {
                        //   spurl1(purl)
                          console.log('object');
    db.collection('category').doc(categoryid).
    collection('subcategory').doc(subcategoryid)
    .collection('video').doc().set({p:purl,v:vurl,videotitle,videometadata,
        videodescription,status,amount,statusepisode:'no'
    })
                         });
                     }
                   )
    
                    
              }
            );
          })}
        
    const addnewrecord=async ()=>{
        let result= 1
        try{
            // await hu2();
            console.log('looo',purl1);
           await handleUpload();
           console.log('0');
        }catch(e){
            result=0
        }
        // postDataAndImage('video/addnewrecord',formData,config)
        if(result===1)
        {
         
          setMessage('Record Submitted.....yo')
        }
        else{
          setMessage('Not Submitted..........')
        }
        
    }
  const onCategoryChange=(event)=>{
    setcategoryid(event.target.value)
    readAllSCRecords(event.target.value)

  }  

 
    return(<Container maxWidth='xs'>
        <Paper className={classes.paper}>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
         Categories
        </InputLabel>
        <Select
          value={categoryid}
          onChange={(event)=>onCategoryChange(event)}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          {menuList()}
         </Select>
      </FormControl>          
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
         Sub Categories
        </InputLabel>
        <Select
          value={subcategoryid}
          onChange={(event)=>setsubcategoryid(event.target.value)}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          {menuSCList()}
         </Select>
      </FormControl>          
          
        </Grid>
       
        <Grid item xs={12}>
          <TextField
        id="outlined-dense"
        label="Video Title"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        onChange={(event)=>setvideotitle(event.target.value)}
        fullWidth
      /> 
        </Grid>
     
        <Grid item xs={12}>
          <TextField
        id="outlined-dense"
        label="VideoMetadata"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        onChange={(event)=>setvideometadata(event.target.value)}
        fullWidth
      />  
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="outlined-multiline-flexible"
        label="Video Description"
        multiline
        rowsMax="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={(event)=>setvideodescription(event.target.value)}
        fullWidth
      />
        </Grid>
        <Grid item xs={12}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          
        >
          <FormControlLabel value="free"  onChange={(event)=>setstatus(event.target.value)} control={<Radio />}  label="Free" />
          <FormControlLabel value="Paid" onChange={(event)=>setstatus(event.target.value)} control={<Radio />} label="Paid" />
        </RadioGroup>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
          <TextField
        id="outlined-dense"
        label="Amount"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        onChange={(event)=>setamount(event.target.value)}
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
        onChange={(event)=>setposter({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
        
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
 </Grid>
 <Grid item xs={12} sm={6}>
    
    <Avatar alt="Remy Sharp" src={poster.icon} className={classes.bigAvatar} />
  </Grid>
 <Grid item xs={8} >
 <input
        accept="video/*"
        className={classes.input}
        id="contained-button-file1"
        multiple
        type="file"
        onChange={(event)=>setvideourl({file:event.target.files[0]})}
        
      />
      <label htmlFor="contained-button-file1">
        <Button variant="contained" component="span" className={classes.button} fullWidth>
          Upload Video
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
 </Grid> 
 <Grid item xs={4}>
 <CircularProgress variant="static" value={Progress} />
 </Grid>
 <Grid item xs={12}>
 <Button variant="contained" color="primary" onClick={addnewrecord} className={classes.button} fullWidth>
        Submit
      </Button>
 </Grid>
 </Grid>  
        <Typography>
          {message}
        </Typography>
        </Paper>

    </Container>)
 }
 export default Video;