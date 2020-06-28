import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Category from './Category'
import  DisplayCategory from './FormattedDisplay'
import SubCategories from './SubCategory'
import DisplayAllSubCategory  from './DisplayAllSubCategories'
import DisplayAllVideos from './DisplayAllVideo'
import Video from './Video'
import Episode from './Episode'
import DisplayAllEpisode from './DisplayAllEpisode'
export default function MainListItems(props){
const handleClick=(view)=>{
props.changeView(view)
}  
const mainListItems = (
  <div>
    <ListItem button onClick={()=>handleClick(<Category/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Add Categories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<DisplayCategory/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<SubCategories/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Categories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<DisplayAllSubCategory/>)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Subcategories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Video/>)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Add Videos"  />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllVideos/>)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Videos" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<Episode/>)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Add Episodes" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllEpisode/>)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Episodes"  />
    </ListItem>
    <ListItem button onClick={()=>handleClick('Logout')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>

  </div>
);

 return(<div>
   {mainListItems}
 </div>);

}
