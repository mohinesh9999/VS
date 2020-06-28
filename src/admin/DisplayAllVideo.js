import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
// import {getData,BaseUrl,postData,postDataAndImage} from './FetchServices'

export default function DisplayAllVideo() {
    const [stateCol, setStateCol] = React.useState({
        columns: [
            { title: 'videoid', field: 'videoid' },
            { title: 'subcategoryid', field: 'subcategoryid' },
            { title: 'videotitle', field: 'videotitle' },
            { title: 'videometadata', field: 'videometadata' },
            { title: 'videodescription', field: 'videodescription' },
            { title: 'status', field: 'status' },
            { title: 'amount', field: 'amount' },
            {   field: 'poster',
                title: 'poster',
                render: rowData => <img src={`/images/${rowData.poster}`} style={{width: 30, borderRadius: '50%'}}/>,
                editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])} />)
              },
              {   field: 'videourl',
              title: 'videourl',
              // render: rowData => <img src={`${BaseUrl}/images/${rowData.videourl}`} style={{width: 30, borderRadius: '50%'}}/>,
              editComponent:props=>(<input type='file' onChange={(event)=>setVideo(event.target.files[0])} />)
            }]

    })  
    const [state, setState] = React.useState({
        data: []});
     const [getFile,setFile]=React.useState('') 
     const [getVideo,setVideo]=React.useState('') 

     const readAllRecords=async()=>{
       var list=[]
       //await getData('video/displayall') 
       setState({data:list})
       }
    useEffect(()=>{
     readAllRecords()
   
    },[]) 
    const handleEdit=async(newData)=>{
     if(getFile=='' && getVideo=='')
     { 
     let body={'videoid':newData.videoid,
               'subcategoryid':newData.subcategoryid,
               'videotitle':newData.videotitle,
               'videometadata':newData.videometadata,
               'videodescription':newData.videodescription,
               'states':newData.states,
               'amount':newData.amount,
               
            }
     let result=1
     //await postData('video/editData',body) 
     if(!result.RESULT)
     alert('Record Updated')
     else
     alert('Fail to Update Record')
     }
     else{
       let formData=new FormData()
       formData.append('videoid',newData.videoid)
       formData.append('poster',getFile)
       formData.append('videoUrl',getVideo)
       const config={headers:{'content-type':'multipart/form-data'}}
       const result=1
       //await postDataAndImage('video/editicon',formData,config)
       if(result)
       {alert('Icon Updated')}
       else
       {alert('Fail to UpdateIcon')}
   
     }
   
     readAllRecords()
   
    }
   const handleDelete=async(oldData)=>{
     let body={'videoid':oldData.videoid}
     
   let result=1
   //await postData('video/deleteRecord',body) 
   if(!result)
   alert('Record Deleted')
   else
   alert('Fail to Delete Record')
   readAllRecords()
   
   }
  //  const addnewrecord=(newData)=>{
      
  //   let formData = new FormData()
  //   formData.append('videoid',newData.videoid)
  //   formData.append('subcategoryid',newData.subcategoryid)
  //   formData.append('videotitle',newData.videotitle)
  //   formData.append('videometadata',newData.videometadata)
  //   formData.append('videodescription',newData.videodescription)
  //   formData.append('status',newData.status)
  //   formData.append('amount',newData.amount)
  //   formData.append('poster',getFile)
  //   formData.append('videourl',getFile)
  //   const config={headers:{'content-type':'multipart/form-data'}}
  //   const result= postDataAndImage('video/addnewrecord',formData,config)
  //   readAllRecords()
  // }  

   
     const View=()=>{
     return(
   <MaterialTable
         title="Display"
         columns={stateCol.columns}
         data={state.data}
         editable={{
          //  onRowAdd: newData =>
          //    new Promise(resolve => {
          //      setTimeout(() => {
          //        resolve();
          //        const data = [...state.data];
          //        data.push(newData);
          //        setState({ ...state, data });
          //      }, 600);
          //    }),
           onRowUpdate: (newData, oldData) =>
             new Promise(resolve => {
               setTimeout(() => {
                 resolve();
                 const data = [...state.data];
                 data[data.indexOf(oldData)] = newData;
                 setState({ ...state, data });handleEdit(newData)
               }, 600);
             }),
           onRowDelete: oldData =>
             new Promise(resolve => {
               setTimeout(() => {
                 resolve();
                 const data = [...state.data];
                 data.splice(data.indexOf(oldData), 1);
                 setState({ ...state, data });handleDelete(oldData)
               }, 600);
             }),
         }}
       />
       
     )}
   
     return (
         <div> {View()} </div>
       
     );
   }
   