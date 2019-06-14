import React,{Component} from 'react'
<<<<<<< HEAD
import { Button } from 'antd'

export default class App extends Component{
    render(){
        return(
            <div className="App">
                <Button type="primary">Button</Button>
            </div>
        )
    }
}
=======
import {HashRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login/Login.jsx'
import Admin from './pages/admin/Admin.jsx'

export default class App extends Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    {/* <div>asdasd</div> */}
                    <Route path='/' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}

>>>>>>> dev
