import React, { useEffect } from "react"
import {db} from '../Firebase'
 

function DisplayAllCategories(props){
    
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
var list=[]
await db.collection('category').get().then((a)=>{
    a.forEach((b)=>{
        let obj=b.data()
        obj.id=b.id
        list.push(obj)
    })
})
setList(list)   
}
const displayList=()=>{
 return getlist.map((item,index)=>{

  return(<tr><td>{item.id}</td><td>{item.categoryName}</td><td><img src={item.url} width='30' height='30'></img></td></tr>)

 })

}
useEffect(()=>{
readAllRecords() 

},[])
return(<div>
<table border='1'>
<caption>List of Categories</caption>    
<tr><th>Category Id</th><th>Category Name</th><th>Icon</th></tr>    
{displayList()}
</table>
</div>)

}

export default DisplayAllCategories;



