import React,{Component} from 'react'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import Admin from './pages/admin/Admin.jsx'
import Login from './pages/login/Login'
export default class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}