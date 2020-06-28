import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import AdminLogin from './admin/AdminLogin'
import SubCategory from './user/UserMainPage'
// import Category from './admin/Category'
import DashBoard from './admin/Dashboard'

export default function Router1(props){
    return(
     <Router>
        <div>
            <Route path='/AdminLogin' exact strict component={AdminLogin}  history={props.history}/>
            <Route path='/Category' exact strict component={SubCategory}  history={props.history}/>
            <Route path='/DashBoard' exact strict component={DashBoard}  history={props.history}/>
            {/* <Route path='/UserMainPage' exact strict component={UserMainPage}  history={props.history}/> */}
        </div>
     </Router>  
   
     
   
    )
   }