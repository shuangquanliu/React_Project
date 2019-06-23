import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu,Item }  = Menu;
 class LiftNav extends Component {
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname
        return  menuList.map(item=>{
            if(!item.children){
                return (
                <Item key={item.key}>
                    <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                    </Link>
                </Item>
                )
            } else {
                  // 如果请求的是当前item的children中某个item对应的path, 当前item的key就是openKey
                const cItem = item.children.find((cItem, index) => path.indexOf(cItem.key)===0)
                if (cItem) { // 当前请求的是某个二级菜单路由
                this.openKey = item.key
                }
                return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {
                        this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        
        // 将请求的路由路径作为选中的key
        let selectedKey = this.props.location.pathname
        if (selectedKey.indexOf('/product')===0) {
        selectedKey = '/product'
        }
        // 得到要展开Submenu的key值
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/home' className='nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台服务系统</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark" 
                    selectedKeys={[selectedKey]}
                     defaultOpenKeys={[openKey]} 
                    >
                        {this.menuNodes}
                    {/* <Item key="/home">
                        <Link to='/home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>   
                    </Item>               
                    <SubMenu
                        key="/product"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Item key="/home">
                        <Link to='/home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>   
                        </Item>       
                        <Item key="/home">
                            <Link to= '/home'>
                                <Icon type="home" />
                                <span>首页</span>
                            </Link>   
                        </Item>       
                    </SubMenu> */}
                    
                    </Menu>
            </div>
        )
    }
}
export default withRouter(LiftNav)