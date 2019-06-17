import React,{Component} from 'react'
import {Switch,Route,HashRouter} from 'react-router-dom'
import Admin from './pages/admin/Admin.jsx'
import Login from './pages/login/Login'
export default class App extends Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}