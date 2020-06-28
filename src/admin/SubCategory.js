import React,{useEffect} from  'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Button, TextField, Grid } from '@material-ui/core'; 
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Avatar} from '@material-ui/core';
// import {postDataAndImage,getData} from './FetchServices'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {db,storage} from '../Firebase'
import Select from '@material-ui/core/Select';


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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	  },
	menu: {
		width: 200,
	}, 
  }));

export default function SubCategory(props){
	const classes = useStyles();
	const [getlist,setList]=React.useState([])     
    const[categoryId,setCategoryId]=React.useState('')
	const[subCategoryName,setSubCategoryName]=React.useState('')
	const[subCategoryDescription,setSubCategoryDescription]=React.useState('')
	const[subCategoryIcon,setSubCategoryIcon]=React.useState({icon:'',file:''})
	const[message,setMessage]=React.useState('')
	const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
	useEffect(()=>{
        const readAllRecords=async()=>{
        try{await db.collection('category').get().then((a)=>{
                let x=[]
                a.forEach(b=>{
                    var obj=b.data()
                    obj.id=b.id
                    x.push(obj)
                })
                setList(x)
            })}catch(e){
        
            }
            }
		readAllRecords() 
        },[])
        
        const getlist1=[1,2,3,4,5,6]
		// const menuList=()=>{
		// 	return getlist.map((item,index)=>{
		   
		// 	 return( <option value={item.id}>{item.id}</option>)
		   
		// 	})
		   
		//    }
        const  handleUpload =  () => {
            const uploadTask =  storage.ref(`images/${subCategoryIcon.file.name}`).
            put(subCategoryIcon.file);
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
                  .child(subCategoryIcon.file.name)
                  .getDownloadURL()
                  .then(url1 => {
                    db.collection('category').doc(categoryId).collection('subcategory').doc().set({
                        subCategoryName,subCategoryDescription,url:url1})
                  });
              }
            );
          };


	const addNewRecord=async()=>{
        let result=1
		try{await handleUpload()}
        catch(e){result=e.message}
		if(result===1){
			setMessage('Record Submitted...')
		}
		else{
			setMessage('Fail to Submit Record...')
		}
	}




    return(
        <Container maxWidth='xs'>
            <Paper className={classes.paper}>
				<Typography>
				Sub-Category Registration
				</Typography>
				<Grid container>  
				<Grid item xs={12}>
				<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
         Category Id
        </InputLabel>
        <Select
          value={categoryId}
		  onChange={(event)=>setCategoryId(event.target.value)}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          {getlist.map((item,index)=>( <MenuItem value={item.id}>{item.categoryName}</MenuItem>))}
		   </Select>
      </FormControl>
						
						 
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="outlined-dense"
							label="Sub-Category Name"
							className={clsx(classes.textField, classes.dense)}
							margin="dense"
							variant="outlined"
							onChange={(event)=>setSubCategoryName(event.target.value)}
							fullWidth
						/>
					</Grid>   
					<Grid item xs={12}>
						<TextField
							id="outlined-dense"
							label="Sub-Category Description"
							className={clsx(classes.textField, classes.dense)}
							margin="dense"
							variant="outlined"
							onChange={(event)=>setSubCategoryDescription(event.target.value)}
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
							onChange={(event)=>setSubCategoryIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
						/>
						<label htmlFor="contained-button-file">
							<Button variant="contained" component="span" className={classes.button} fullWidth>
							Upload
							<CloudUploadIcon className={classes.rightIcon} />
							</Button>
						</label>
					</Grid>   
					<Grid item xs={12} sm={6}>
						<Avatar alt="Image" src={subCategoryIcon.icon} className={classes.bigAvatar} />
					</Grid>					
					<Grid item xs={12}>
						<Button variant="contained" onClick={addNewRecord} color="primary" className={classes.button} fullWidth>
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