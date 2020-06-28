import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {Grid,Button,Avatar} from '@material-ui/core'
// import {MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import {getData,BaseUrl,postData,postDataAndImage} from './FetchServices'

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
menu: {
  width: 200,
}, 
}));

export default function DisplayAllVideo() {
  const classes = useStyles();
  const [getStatus,setStatus]=React.useState('')
    const [stateCol, setStateCol] = React.useState({
        columns: [
            {
                title: 'Episode ID', field: 'episodeid' , editable:'never'
            },
            { title: 'Video ID', field: 'videoid' , editable:'never'
            },
            { title: 'Episode Title', field: 'episodetitle' },
            { title: 'Description', field: 'episodedescription' },
            {
                field: 'episodeicon',
                title: 'Icon',
                 render: rowData=><Avatar alt="Image" src={`/images/${rowData.episodeicon}`} className={classes.bigAvatar} />,

                // editComponent:props=>(<input type="file" onChange={(event)=>setFile(event.target.files[0])}/>)
                 editComponent:props=>(<Grid><input accept="image/*" value={getIcon} className={classes.input} id="contained-button-file" multiple type="file" onChange={(event)=>setIcon(event.target.files[0])}/><label htmlFor="contained-button-file"><Button variant="contained" component="span" className={classes.button} fullWidth>Upload Icon<CloudUploadIcon className={classes.rightIcon} /></Button></label></Grid>),
                
                },
                {
                    field:'episodeurl',
                    title: 'Video',
                
                //  render: rowData=><Avatar alt="Image" src={`${BaseUrl}/images/${rowData.videourl}`} className={classes.bigAvatar} />,

                  editComponent:props=>(<Grid><input accept="video/*" value={getVideo} className={classes.input} id="contained-button-file1" multiple type="file" onChange={(event)=>setVideo(event.target.files[0])}/><label htmlFor="contained-button-file1"><Button variant="contained" component="span" className={classes.button} fullWidth>Upload Video<CloudUploadIcon className={classes.rightIcon} /></Button></label></Grid>),
                }
            ]


    })  
  const [state, setState] = React.useState({
     data: []});   
   
  const readAllRecords=async()=>{
    var list=[]
    //await getData('episode/displayAllEpisode')
    setState({data:list})
    }


 useEffect(()=>{
  readAllRecords()
 },[]) 

 const [getIcon,setIcon]=React.useState('')
 const [getVideo,setVideo]=React.useState('')


 const handleEdit=async(newData)=>{
    console.log(newData)
   if(getIcon=='' && getVideo==''){
        let body={
          'episodeId':newData.episodeid,  
          'episodeTitle':newData.episodetitle,
          'episodeDescription':newData.episodedescription,         
        }
        var result=[]
         //await postData('episode/editData',body)
        if(result){
          alert("Record Updated")
          await setIcon('')
        }
        else{
          alert("Record not Updated")
        }
    }
     else {/*if(getIcon=='' && getVideo!='')*/}{
        let formData=new FormData();
        formData.append('episodeId',newData.episodeid)
        formData.append('episodeIcon',getIcon)
        formData.append('episodeUrl',getVideo)
        const config={headers:{'content-type':'multipart/form-data'}};
        const result=1
        //await postDataAndImage('episode/editVideo',formData,config);
        if(result){
          alert("Icon/Video Updated...")
          await setIcon('')
          await setVideo('')
        }
        else{
          alert("Fail to Update Icon/Video...")
          await setIcon('')
          await setVideo('')
        }
    }
    // else if(getIcon!='' && getVideo==''){
    //   let formData=new FormData();
    //     formData.append('videoId',newData.videoid)
    //     formData.append('videoIcon',getIcon)
    //     const config={headers:{'content-type':'multipart/form-data'}};
    //     const result=await postDataAndImage('video/editIcon',formData,config);
    //     if(result){
    //       alert("Icon Updated...")
    //     }
    //     else{
    //       alert("Fail to Update Icon...")
    //     }
  //  }
    readAllRecords()
 }

 const handleDelete=async(oldData)=>{
  console.log(oldData)
  let body={
    'episodeId':oldData.episodeid
  }
 var result= []
 //await postData('episode/delete',body)
 if(result){
   alert("Record deleted")
 }
 else{
   alert("Fail to delete record")
 }
 readAllRecords()
}

// const handleAdd=async(newData)=>{
//   console.log(newData)
//   let formData=new FormData();
//     formData.append('categoryId')
// 		formData.append('subCategoryName',newData.subcategoryname)
// 		formData.append('categoryDescription',newData.categorydescription)
// 		formData.append('categoryIcon',getFile)
// 		const config={headers:{'content-type':'multipart/form-data'}};
// 		const result=await postDataAndImage('category/addnewrecord',formData,config);
// 		if(result){
// 			await alert("Record submitted...")
// 		}
// 		else{
// 			await alert("Fail to submit Record...")
//     }
// }


  const View=()=>{
  return(
<MaterialTable
      title="Sub-Category Table"
      columns={stateCol.columns}
      data={state.data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       const data = [...state.data];
        //       data.push(newData);
        //       // handleAdd(newData);
        //       setState({ ...state, data });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
              handleEdit(newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
              handleDelete(oldData)
            }, 600);
          }),
      }}
    />
    
  )}

  return (
      <div> {View()} </div>
    
  );
}