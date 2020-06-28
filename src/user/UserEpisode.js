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

function UserEpisode(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
    let body={'videoId':props.videoid}
    var list=[]
    try{await db.collection('category').doc(props.categoryid)
    .collection('subcategory').doc(props.subcategoryid).collection('video')
    .doc(props.videoid).collection('episode').get().then(a=>{
      a.forEach(b=>{
        list.push(b.data())
      })
    })}catch(e){console.log(e.message);}
    //await postData('episode/fetchByVideoId',body) 
    setList(list)   
    console.log(list);
}
const handleClickPlay=(url)=>{
props.setViews("PLAY",url)

}
const displayList=()=>{
 return getlist.map((item,index)=>{
   
   
  return(
    <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${item.p}`}
        title={item.episodeTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.episodeTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
       
        <div>{item.episodeDescription}</div>
        </Typography>
         
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" onClick={()=>handleClickPlay(item.v)}>
        Play
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

export default UserEpisode;



