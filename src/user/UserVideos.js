import React, { useEffect } from "react"
// import {postData,BaseUrl} from '../FetchServices'
import { deepOrange} from '@material-ui/core/colors';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
});

function UserVideos(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
    let body={'subcategoryid':props.subcategoryid}
    var list=[]
    try{
        await db.collection('category').doc(props.categoryid)
        .collection('subcategory').doc(props.subcategoryid)
        .collection('video').get().then(a=>{
            a.forEach(b=>{
                let obj=b.data()
                obj.id=b.id
                list.push(obj)
            })
        })
    }catch(e){}
    console.log(list,'yeee',props.categoryid,props.subcategoryid);
    //await postData('video/displayAllBySubCategory',body) 
    setList(list)   
}
const handleClick=(id)=>{
  props.setViews("EPISODE",[props.categoryid,props.subcategoryid,id])
  
  }
const handleClickPlay=(url)=>{
props.setViews("PLAY",url)

}
const handleAddToCart=(item)=>{
 if(!localStorage.getItem("US_USER"))
 {
  props.setViews("USERLOGIN_CART",'')
 } 
 else
 {  console.log(item);
  item.categoryid=props.categoryid
   item.subcategoryid=props.subcategoryid
   var video=JSON.stringify(item)
   
   localStorage.setItem('CT_V_'+item.id,video)} 
  props.countCartItems()
  }




const displayList=()=>{
  console.log(getlist);
 return getlist.map((item,index)=>{
   let status=''
  if(item.statusepisode=='yes')
   status='Episodes'
   
   
  return(
    <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
      component='img'
        className={classes.media}
        image={item.p}
        title={item.videotitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.videotitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <div>{item.videometadata}</div>    
        <div>{item.videodescription}</div>
        </Typography>
        <Avatar className={classes.orangeAvatar}>{item.amount}/-</Avatar> 
        <Button size="small" color="primary" onClick={()=>handleAddToCart(item)}>
        ADD TO CART
        </Button>
      
      
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" onClick={()=>handleClickPlay(item.v)}>
        Play
      </Button>
      <Button size="small" color="primary" onClick={()=>handleClick(item.id)}>
        {status}
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

export default UserVideos;



