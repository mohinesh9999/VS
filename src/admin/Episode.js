import React,{useEffect} from 'react'
import clsx from 'clsx'
import {Typography,Grid,TextField,Container,Paper,Radio,RadioGroup,Button,Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {FormControl,MenuItem} from '@material-ui/core';
// import FormLabel from '@material-ui/core/FormLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import {postDataAndImage,getData,postData} from './FetchServices'
import {db,storage} from '../Firebase'


const useStyles = makeStyles(theme => ({
    paper:{
        padding:'30px',
        marginTop:'10px'
    },    
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
    margin: {
        margin: theme.spacing(1),
    },
    textField1: {
        flexBasis: 200,
    },
    menu: {
		width: 200,
	}, 
  }));

  let a='';
export default function Episode(props){
    const [categoryId,setCategoryId]=React.useState('')
    const [subCategoryId,setSubCategoryId]=React.useState('')
    const [videoId,setVideoId]=React.useState('')
    const [episodeTitle,setEpisodeTitle]=React.useState('')
    const [episodeDescription,setEpisodeDescription]=React.useState('')
    const [episodeIcon,setEpisodeIcon]=React.useState({icon:'',file:''})
    const [episodeUrl,setEpisodeUrl]=React.useState('')
    const [message,setMessage]=React.useState('see here..')
    const [p,setProgress]=React.useState(0)
    const classes=useStyles();
    const  handleUpload =  () => {
        const uploadTask =  storage.ref(`videos/${episodeUrl.name}`).put(episodeUrl);
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
              .child(episodeUrl.name)
              .getDownloadURL()
              .then( vurl => {
                const uploadTask1 =  storage.ref(`images/${episodeIcon.file.name}`).
                put(episodeIcon.file);
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
                     .child(episodeIcon.file.name)
                     .getDownloadURL()
                     .then(purl => {
                    //   spurl1(purl)
                      console.log('object');
 db.collection('category').doc(categoryId).collection('subcategory').doc(subCategoryId)
.collection('video').doc(videoId).collection('episode').doc().set({p:purl,v:vurl,episodeDescription,episodeTitle,d:new Date()
})
 db.collection('category').doc(categoryId).collection('subcategory').doc(subCategoryId)
.collection('video').doc(videoId).update({statusepisode:'yes'})
                     });
                 }
               )

                
          }
        );
      })}
    const addNewRecord=async()=>{
        var result =1
        try{
            await handleUpload()
        }catch(e){
            result=0
            console.log(e.message);
        }
        
        //await postDataAndImage('episode/addnewepisode',formData,config)
        if(result==1){
            setMessage('Record Submitted...')
            setCategoryId('')
            setSubCategoryId('')
            setVideoId('')
            setEpisodeTitle('')
            setEpisodeDescription('')
            setEpisodeIcon({icon:''})
            setEpisodeUrl('')
        }
        else{
            setMessage('Fail to Submit Record...')
            setCategoryId('')
            setSubCategoryId('')
            setVideoId('')
            setEpisodeTitle('')
            setEpisodeDescription('')
            setEpisodeIcon({icon:''})
            setEpisodeUrl('')
        }
    }

    const [getCategoryList,setCategoryList]=React.useState([])


	const readAllRecords=async()=>{
        var list=[]
        // await getData('category/displayall')
        try{
            await db.collection('category').get().then(a=>{
                a.forEach(b=>{
                    let obj=b.data()
                    obj.id=b.id
                    list.push(obj)
                })
            })
        }catch(e){

        }
		setCategoryList(list)
	}

	useEffect(()=>{
		readAllRecords()
    },[])
    
    const [getSubCategoryList,setSubCategoryList]=React.useState([])

    const [getVideoList,setVideoList]=React.useState([])

    const readAllSCrecords=async(Categoryid)=>{
        // let body={'categoryid':Categoryid}
        var list=[]
        setCategoryId(Categoryid)
        // await postData('subcategory/displayByCategoryId',body)
        await db.collection('category').doc(Categoryid).collection('subcategory')
        .get().then(a=>{
            a.forEach(b=>{
                let obj=b.data()
                obj.id=b.id
                list.push(obj)
            })
        })
		setSubCategoryList(list)
    }

    const handleCategory=(event)=>{
        setCategoryId(event.target.value)
        a=event.target.value
        readAllSCrecords(event.target.value)
        
    }

    const readAllVRecords=async(Subcategoryid)=>{
        var list=[]
        setSubCategoryId(Subcategoryid)
        try{
        await db.collection('category').doc(a).collection('subcategory')
            .doc(Subcategoryid).collection('video').get().then(a1=>{
                a1.forEach(b=>{
                    console.log('rff');
                    let obj=b.data()
                    obj.id=b.id
                    list.push(obj)
                })
            })
            console.log('hi',list);
        }catch(e){
            console.log(e.message,setCategoryId,categoryId,a,subCategoryId,'ok');
        }
        console.log('object',getVideoList);
        // await postData('video/displayAllBySubCategory',body)
		setVideoList(list)
    }

    const handleSubCategory=(event)=>{
        setSubCategoryId(event.target.value)
        readAllVRecords(event.target.value)
    }
   


    return(
        <div>
            <Container maxWidth='xs'>
                <Paper className={classes.paper}>
                    <Typography>
                        Episode
                    </Typography>
                    <Grid container>
                    <Grid item xs={12}>
						<TextField
							id="outlined-select-currency"
							select
							label="Category"
							className={(classes.textField)}
							value={categoryId}
							onChange={(event)=>handleCategory(event)}
							SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
							}}
							margin="normal"
							variant="outlined"
							fullWidth
						>
							{getCategoryList.map(item => (
							<MenuItem key={item.id} value={item.id} fullWidth>
								{item.categoryName}
							</MenuItem>
							))}
						</TextField>

					</Grid>
                    <Grid item xs={12}>
						<TextField
							id="outlined-select-currency"
							select
							label="Sub-category"
							className={(classes.textField)}
							value={subCategoryId}
							onChange={(event)=>handleSubCategory(event)}
							SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
							}}
							margin="normal"
							variant="outlined"
							fullWidth
						>
							{getSubCategoryList.map(item => (
							<MenuItem key={item.id} value={item.id} fullWidth>
								{item.subCategoryName}
							</MenuItem>
							))}
						</TextField>

					</Grid>
                    <Grid item xs={12}>
						<TextField
							id="outlined-select-currency"
							select
							label="Video"
							className={(classes.textField)}
							value={videoId}
							onChange={(event)=>setVideoId(event.target.value)}
							SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
							}}
							margin="normal"
							variant="outlined"
							fullWidth
						>   {console.log(categoryId,subCategoryId,videoId)}
							{getVideoList.map(item => (
							<MenuItem key={item.id} value={item.id} fullWidth>
								{item.videotitle}
							</MenuItem>
							))}
						</TextField>

					</Grid>
                        <Grid item xs={12}>
                        <TextField
							id="outlined-dense"
							label="Episode Title"
							className={clsx(classes.textField, classes.dense)}
							margin="dense"
							variant="outlined"
							onChange={(event)=>setEpisodeTitle(event.target.value)}
							fullWidth
						/>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
							id="outlined-dense"
							label="Description"
							className={clsx(classes.textField, classes.dense)}
							margin="dense"
							variant="outlined"
							onChange={(event)=>setEpisodeDescription(event.target.value)}
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
                                onChange={(event)=>setEpisodeIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" className={classes.button}>
                                Upload
                                <CloudUploadIcon className={classes.rightIcon} />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Avatar alt="Image" src={episodeIcon.icon} className={classes.bigAvatar} />   
                        </Grid>
                        <Grid item xs={12}>
                        <input
                                className={classes.input}
                                id="contained-button-file1"
                                multiple
                                type="file"
                                onChange={(event)=>setEpisodeUrl(event.target.files[0])}
                            />
                            <label htmlFor="contained-button-file1">
                                <Button variant="contained" component="span" className={classes.button} fullWidth>
                                Upload Video
                                <CloudUploadIcon className={classes.rightIcon} />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={addNewRecord} color="primary" className={classes.button} fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography>
                    {p==100 ? message : p}
                </Typography>
            </Container>
        </div>
    )
} 