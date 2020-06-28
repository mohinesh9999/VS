import React,{useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import {getData,postData} from '../FetchServices'
import UserCategoryAll from './UserCategoryAll'
import UserSubcategory from './UserSubcategory'
import UserVideos from './UserVideos'
import PlayVideo from './PlayVideo'
import UserEpisode from './UserEpisode'
import UserLogin from './UserLogin'
import ViewCart from './ViewCart'
import UserRegisteration from './UserRegisteration'
import AdminLogin from '../admin/AdminLogin'
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import {db} from '../Firebase'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
const StyledBadge1 = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
    width:20,
    height:20
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function UserMainPage(props) {
  const classes = useStyles();
  
  const setViews=(views,id)=>{
    if(views=='USERLOGIN_CART')
        {
          setView(<UserLogin  setViews={setViews} emailid={''} />)

        }  
   else if(views=="CATEGORY")
    {setView(<UserCategoryAll setViews={setViews} />)}
    else if(views=='SUBCATEGORY')
    {setView(<UserSubcategory categoryid={id[0]} setViews={setViews}/>)
      }
      else if(views=='SUBCATEGORY')
    {setView(<UserSubcategory categoryid={id[0]} setViews={setViews}/>)
      }
    else if(views=='VIDEOS')
    {setView(<UserVideos categoryid={id[0]} subcategoryid={id[1]} setViews={setViews} countCartItems={countCartItems}/>)
      }
      else if(views=='PLAY')
      {
        
        setView(<PlayVideo url={id}/>)
        } 
        else if(views=='EPISODE')
        {setView(<UserEpisode categoryid={id[0]} subcategoryid={id[1]} videoid={id[2]} setViews={setViews}/>)
          }    
        else if(views=='USERREGISTRATION')
        {
          setView(<UserRegisteration  setViews={setViews} />)

        }  
        else if(views=='USERLOGIN')
        {
          setView(<UserLogin  setViews={setViews} emailid={id} />)

        }  
 
   }
 
  const [counter,setCounter]=React.useState(0) 
   const [anchorElAM, setAnchorElAM] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getMlist,setMList]=React.useState([])   
  const [getSClist,setSCList]=React.useState([])
  const [view, setView] = React.useState(<UserCategoryAll setViews={setViews} />);       
const readAllRecords=async()=>{
var list=[]
//await getData('category/displayall') 
try{
    await db.collection('category').get().then(a=>{
        a.forEach(b=>{
            let obj=b.data()
            obj.id=b.id
            list.push(obj)
        })
    })
}catch(e){}
setMList(list)   
}
const readAllSCRecords=async(categoryid)=>{
  let body={'categoryid':categoryid}
  var list=[]
  //await postData('subcategory/displayByCategoryId',body) 
  try{
    await db.collection('category').doc(categoryid)
    .collection('subcategory').get().then(a=>{
        a.forEach(b=>{
            let obj=b.data()
            obj.id=b.id
            list.push(obj)
        })
    })
  }catch(e){}
  setSCList(list)   
  }
const setSubCategory=()=>{
  return getSClist.map((item,index)=>{

    return(
    <MenuItem onClick={handleClose} value={item.id}>{item.subCategoryName}</MenuItem>
       )})


} 
const setMainCategory=()=>{
return getMlist.map((item,index)=>{

  return(<Button value={item.id} color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={(event)=>handleClick(event)}>
  {item.categoryName}
</Button>)})}



useEffect(()=>{
  readAllRecords() 
  countCartItems()
 
  },[])
  function handleClick(event) {
    //alert(event.currentTarget.value)
    readAllSCRecords(event.currentTarget.value)
    setAnchorEl(event.currentTarget);
  }
  function handleClickAM(event) {

    setAnchorElAM(event.currentTarget);
     

  }
  const handleClickAMMenu=(opt)=>
  {  if(opt=='USER LOGIN')
  {
    setView(<UserLogin setViews={setViews} emailid={''} />)
  }
  else if(opt=='ADMIN LOGIN')
  {
    setView(<AdminLogin  history={props.history} />)
  }
  else if(opt=='LOGOUT')
  {
   localStorage.clear();
   countCartItems()

  }
  else if(opt=='CLEAR CART')
  {
   clearCartItems()
   

  }
    setAnchorElAM(null); 

  } 

  function handleCloseAM() {
    setAnchorElAM(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }
function countCartItems()
{ let c=0
  for(let i=0;i<localStorage.length;i++)
  { let value=localStorage.key(i)
    if(value.startsWith('CT_V_'))
    {c++}

  }
  setCounter(c)
}

function clearCartItems()
{ let c=0
  for(let i=localStorage.length-1;i>=0;i--)
  { let value=localStorage.key(i)
    if(value.startsWith('CT_V_'))
    {localStorage.removeItem(value)}

  }
  setCounter(0)
  setView(<ViewCart setViews={setViews} countCartItems={countCartItems} />);
}







function avatarMenu(){
 return(
  <div>
  <Avatar aria-controls="simple-menuAM" aria-haspopup="true" alt="user" src="http://localhost:3000/user.jpg" className={classes.avatar} onClick={handleClickAM}/>
  <Menu
        id="simple-menuAM"
        anchorEl={anchorElAM}
        keepMounted
        open={Boolean(anchorElAM)}
        onClose={handleCloseAM}
      >
        <MenuItem onClick={()=>handleClickAMMenu("USER LOGIN")} >User Login</MenuItem>
        <MenuItem onClick={()=>handleClickAMMenu("ADMIN LOGIN")} >Admin Login</MenuItem>
        
      </Menu>
  </div>

 )


}

function avatarMenuAfterLogin(){
  return(
   <div>
   <Avatar aria-controls="simple-menuAM" aria-haspopup="true" alt="user" src="http://localhost:3000/user.jpg" className={classes.avatar} onClick={handleClickAM}/>
   <Menu
         id="simple-menuAM"
         anchorEl={anchorElAM}
         keepMounted
         open={Boolean(anchorElAM)}
         onClose={handleCloseAM}
       >
         <MenuItem onClick={()=>handleClickAMMenu("ACCOUNT STATUS")} >Account Status</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("CHANGE PROFILE")} >Change Profile</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("CLEAR CART")} >Clear Cart</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("LOGOUT")} >Logout</MenuItem>
       </Menu>
   </div>
 
  )
  }
function showMenu()
{ let menu=''
  if(!localStorage.getItem('US_USER'))
  menu=avatarMenu
  else
  menu=avatarMenuAfterLogin
  return(<div>{menu()}</div>)


}


function showCart()
{
setView(<ViewCart setViews={setViews} countCartItems={countCartItems} />)

}
function cartBadges(){
  

return(<Box display="flex">
<Box m={1}>
  <IconButton aria-label="cart" onClick={showCart}>
    <StyledBadge1 badgeContent={counter} color="primary">
      <ShoppingCartIcon />
    </StyledBadge1>
  </IconButton>
</Box> </Box>)
}
function notificationBadges(){
  

return(<Box display="flex">
<Box m={1}>
  <IconButton aria-label="cart" onClick={showCart}>
    <StyledBadge1 badgeContent={'2'} color="primary">
      <NotificationImportantIcon />
    </StyledBadge1>
  </IconButton>
</Box> </Box>)
}





  return (
  

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
       {setMainCategory()}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       
       {setSubCategory()}
       
      </Menu>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {notificationBadges()}
          {cartBadges()}
        {showMenu()}
        </Toolbar>
      </AppBar>
      {view}
    </div>
  );
}
