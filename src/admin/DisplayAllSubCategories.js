// import React,{useEffect} from 'react';
// import {getData,BaseUrl} from './FetchServices'

// export default function DisplayAllCategory() {
//   const [getlist,setList]=React.useState([])

//     const readAllRecords=async()=>{
//       var list=await getData('subcategory/displayAll')
//       setList(list)  //rendering
//     }

//     const displayList=()=>{
//       return getlist.map((item,index)=>{
//         return(<h1><tr><td>{item.categoryid}</td><td>{item.subcategoryid}</td><td>{item.subcategoryname}</td><td>{item.subcategorydescription}</td><td><img src={`${BaseUrl}/images/${item.subcategoryicon}`} width='100' height='100'/> </td></tr></h1>)
//       })
//     }

//     useEffect(()=>{
//       console.log("first")
//       readAllRecords()
//     },[])

//   return(
//     <div>
//       <table border='1' width='80%'>
//       <tr><th>Category ID</th><td><th>Sub-Category Id</th></td><td><th>Sub-Category Name</th></td><td><th>Sub-Category Description</th><th>Sub-category Icon</th></td></tr>
//       <tr>
//       {displayList()}
//       </tr>
//       </table>
//     </div>
//   );
// }
// import { forwardRef } from 'react';
import React, { useEffect,forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { Redirect } from 'react-router-dom'

// import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {Grid,Button,Avatar} from '@material-ui/core'
// import {MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import {getData,BaseUrl,postData,postDataAndImage} from './FetchServices'
import { db ,storage} from '../Firebase';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
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

export default function FormattedDisplay(props) {
  const classes = useStyles();
  

 const [getFile,setFile]=React.useState('')
 const [state, setState] = React.useState({
    data: []});  
    
   const [l1,sl1]=React.useState([])
    const [stateCol, setStateCol] = React.useState({
        columns: [
            { title: 'Sub Category ID', field: 'subcategoryid', editable:'never' },
            { title: 'Category ID', field: 'categoryid' , editable:'never'
            },
            { title: 'SubCategory Name', field: 'subCategoryName' },
            { title: 'Description', field: 'subCategoryDescription' },
        
            {
                field: 'url',
                title: 'Icon',
                // render: rowData => <img src={`${BaseUrl}/images/${rowData.subcategoryicon}`} style={{width: 30, borderRadius: '50%'}} />,
                 render: rowData=><Avatar alt="Image" src={rowData.url} className={classes.bigAvatar} />,

                // editComponent:props=>(<input type="file" onChange={(event)=>setFile(event.target.files[0])}/>)
                 editComponent:props=>(<Grid><input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"
                onChange={(event)=>setFile(event.target.files[0])}/><label htmlFor="contained-button-file"><Button variant="contained" component="span" className={classes.button} fullWidth>Upload<CloudUploadIcon className={classes.rightIcon} /></Button></label></Grid>),
                
                }]


    })  
    
   
 useEffect(()=>{
  readAllRecords()
 },[]) 

 let list1=[];
 const readAllRecords=async()=>{
   
   try{
       
   await db.collection('category').get().then((a)=>{
       a.forEach(async b=>{
           let obj=b.data()
           obj.url1=obj.url
           delete obj.url
           obj.categoryid=b.id
           await db.collection('category').doc(b.id)
           .collection('subcategory').get().then((c)=>{
               c.forEach(d=>{
                   let obj2=d.data()
                   obj2={...obj,...obj2,subcategoryid:d.id}
                   delete obj2.url1
                   delete obj2.categoryName
                   delete obj2.categoryDescription
                   // sl1(list1,()=>{})
                //    l1.push(obj2)
                   sl1([...l1,obj2])
                   
               })
           })
       })
   }) }
   catch(e){}

   }
   const  handleUpload =  (newData) => {
    const uploadTask =  storage.ref(`images/${getFile.name}`).
    put(getFile);
     uploadTask.on(
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
          .child(getFile.name)
          .getDownloadURL()
          .then(url1 => {
            db.collection('category').doc(newData.categoryid).collection('subcategory')
            .doc(newData.subcategoryid).update({subCategoryName:newData.subCategoryName,
                subCategoryDescription:newData.subCategoryDescription,url:url1})
          });
      }
    );
  };

 const handleEdit=async(newData)=>{
   if(getFile==''){
        console.log(newData)
        let body={
          'subCategoryName':newData.subCategoryName,
          'subCategoryDescription':newData.subCategoryDescription,
        }
        var result=1
        try{console.log(newData);
           await db.collection('category').doc(newData.categoryid).collection('subcategory').
           doc(newData.subcategoryid).update(body)
        }catch(e){
            result=e.message
        }
        //  await postData('subcategory/edit',body)
        if(result===1){
          alert("Record Updated")
        //   return <Redirect to='/category' />
        // props.history.push('/category')
        }
        else{
          alert(result)
        //   props.history.push('/category')
        //   return <Redirect to='/category' />
        }
    }
    else{
        var result=1
      try{
          await handleUpload(newData)
      }
      catch(e){
        result=0
      }
        if(result===1){
          alert("Icon Updated...")
        }
        else{
          alert("Fail to Update Icon...")
        }
    }
    readAllRecords()
 }

 const handleDelete=async(oldData)=>{
  console.log(oldData)
  let body={
    'subCategoryId':oldData.subCategoryId
  }
 var result= 1
 try{
    await db.collection('category').doc(oldData.categoryid).collection('subcategory').
    doc(oldData.subcategoryid).delete()
 }catch(e){
     result=0
 }
 if(result==1){
   alert("Record deleted")
 }
 else{
   alert("Fail to delete record")
 }
 readAllRecords()
}



  const View=()=>{
      console.log('object',l1);
  return(

    
<MaterialTable
      title="Sub-Category Table"
      columns={stateCol.columns}
      icons={tableIcons}
      data={l1}
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
              sl1({ ...state, data });
              handleEdit(newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              sl1({ ...state, data });
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