import React, { useEffect } from "react"
// import {getData,BaseUrl} from '../FetchServices'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {db} from '../Firebase'

const useStyles = makeStyles({
  root:{
    display:'flex',
    flexWrap:'wrap',
   justifyContent:'center'
  },
    card: {
      
    maxWidth: 345,
    margin:10
  },
  media: {
    width:'100%',
    height:'100%'
  },
});

function UserCategoryAll(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
var list=[]
try{
    await db.collection('category').get()
    .then(a=>{
        a.forEach(b=>{
            let obj=b.data()
            obj.id=b.id
            list.push(obj)
        })
    })
}catch(e){}
//await getData('category/displayall') 
setList(list)   
}
const handleClick=(categoryid)=>{
props.setViews('SUBCATEGORY',[categoryid])

}

const displayList=()=>{
 return getlist.map((item,index)=>{

  return(
    <Card className={classes.card}>
    <CardActionArea onClick={()=>handleClick(item.id)}>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${item.url}`}
        title={item.categoryName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.categoryName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {item.categoryDescription}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>
  
  )

 })

}
useEffect(()=>{
readAllRecords() 

},[])
return(<div className={classes.root}>
 
{displayList()}
 
</div>)

}

export default UserCategoryAll;



