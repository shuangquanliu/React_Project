import React,{Component} from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';
import AdminHeader from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render(){
        const user =  memoryUtils.user
        console.log(user)
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
                  <AdminHeader/>
              <Content style={{ backgroundColor: 'white', margin: 30}}>
                <Switch>
                    <Route path='/home' component={Home}/>
                </Switch>
              </Content>
              <Footer style={{textAlign:'center',color:'#aaaaaa'}}>React后台，页面管理系统</Footer>
            </Layout>
          </Layout>

        )
    }
}