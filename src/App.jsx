import React from 'react'
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'
//推送远程dev分支111122222222333333344444
import {HashRouter,Route,Switch} from 'react-router-dom'
import Longin from './pages/login/Login'
import Admin from './pages/admin/Admin'


export default class App extends React.Component{
    render(){
        return(
           <HashRouter>
               <Switch>
                   <Route path='/' component={Longin} />
                   <Route path='/admin' component={Admin} />
               </Switch>
           </HashRouter>
        )
    }
}
