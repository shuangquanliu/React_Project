import React, { Component } from 'react'
import LinkButton from '../link-button/index'
import memoryUtils from '../../utils/memoryUtils'
import {withRouter} from 'react-router-dom'
import {removestore} from '../../utils/storeUtils'
import { Modal } from 'antd';
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'


import './index.less'


const confirm = Modal.confirm;


 class Header extends Component {

    //状态不断改变的和异步请求要设置状态值
    state = {
        currentTime :formateDate(),
        dayPictureUrl:'',
        weather:''
    }
    removeLogin=()=>{
        confirm({
            title: '确定要退出登录吗?',
            onOk() {
              //清楚store储存
                memoryUtils.user = []
                //清楚内存缓存
                removestore()
                //回到login页面
                this.props.history.replace('/login')
            }
          });
        
    }
    //没过1秒更新时间显示
    showCurrentTime = ()=>{
        setInterval(()=>{
            const currentTime = formateDate()
            
                this.setState({currentTime})
           
        },1000)
    }
    /* 
    获取天气信息
    */
    getWeather = async ()=>{
        const {dayPictureUrl, weather} = await  reqWeather('北京')
        this.setState({
            dayPictureUrl,
             weather
        })
    }
    /* 
    动态获取请求路径对应的tittle
    */
    getTitle=()=>{
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach(item=>{
            if(item.key === path){
                title = item.title
            } else if(item.children){
                const cItem = item.children.find(item=> item.key ===path)
                if(cItem){
                    title = cItem.title
                }

            }
        })
        return title
    }

    //异步请求，定时器
    componentDidMount(){
        this.showCurrentTime()
        this.getWeather()
    }
    
    render() {
        //动态获取登录的用户名
        const username = memoryUtils.user.username
        //获取时间，图片地址，天气
        const {currentTime,dayPictureUrl,weather} = this.state
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className ='header-top'>
                    <span>欢迎：{username}</span>
                    <LinkButton onClick={this.removeLogin}>登出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'> {title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather" />}
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( Header)