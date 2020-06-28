import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
// import {getData,BaseUrl,postData,postDataAndImage} from './FetchServices'

export default function FormattedDisplay() {
    const [stateCol, setStateCol] = React.useState({
        columns: [
            { title: 'Category ID', field: 'categoryid',editable:'never' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Description', field: 'categorydescription' },
            {   field: 'categoryicon',
                title: 'Icon',
                render: rowData => <img src={`/images/${rowData.categoryicon}`} style={{width: 30, borderRadius: '50%'}}/>,
                editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])} />)
              }]

    })  
  const [state, setState] = React.useState({
     data: []});
  const [getFile,setFile]=React.useState('') 
   
  const readAllRecords=async()=>{
    var list=[]
    //await getData('category/displayall') 
    setState({data:list})
    }
 useEffect(()=>{
  readAllRecords()

 },[]) 
 const handleEdit=async(newData)=>{
  if(getFile=='')
  { 
  let body={'categoryId':newData.categoryid,
            'categoryName':newData.categoryname,
            'categoryDescription':newData.categorydescription}
  let result=1
  //await postData('category/editData',body) 
  if(result.RESULT)
  alert('Record Updated')
  else
  alert('Fail to Update Record')
  }
  else{
    let formData=new FormData()
    formData.append('categoryId',newData.categoryid)
    formData.append('categoryIcon',getFile)
    const config={headers:{'content-type':'multipart/form-data'}}
    const result=1
    //await postDataAndImage('category/editIcon',formData,config)
    if(result)
    {alert('Icon Updated')}
    else
    {alert('Fail to UpdateIcon')}

  }

  readAllRecords()

 }
const handleDelete=async(oldData)=>{
  let body={'categoryId':oldData.categoryid}
  
let result=1
//await postData('category/deleteRecord',body) 
if(result.RESULT)
alert('Record Deleted')
else
alert('Fail to Delete Record')
readAllRecords()

}

const addNewRecord=async(newData)=>{
  let formData=new FormData()
  formData.append('categoryName',newData.categoryname)
  formData.append('categoryDescription',newData.categorydescription)
  formData.append('categoryIcon',getFile)
  const config={headers:{'content-type':'multipart/form-data'}}
  const result=1
  //await postDataAndImage('category/addnewrecord',formData,config)
  readAllRecords()
  }

  const View=()=>{
  return(
<MaterialTable
      title="Editable Example"
      columns={stateCol.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });addNewRecord(newData)
            }, 600);
          }),
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
