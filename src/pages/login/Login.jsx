import React,{Component} from 'react'
import logo from '../../assets/images/logo.png'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button,message} from 'antd'
import './Login.less'
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import {setstore} from '../../utils/storeUtils'

 class Login extends Component {
    handerPWD=(rule,value='',callback)=>{
        value = value.trim()
        if(!value){
            callback('密码不能为空')
        } else if(value.length<4){
            callback('密码不能少于4位')
        } else if (value.length>12){
            callback('密码不能大于12位')
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('必须英文，数组，下划线')
        } else {
            callback()
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const { validateFields } = this.props.form;
        validateFields(async (err,values)=>{
            if(!err){
                // console.log('登录成功',values)
                const result = await reqLogin(values.username,values.password)
             if(result.status === 0){
                // 存入local storage中
                setstore(result.data)
                // 存入内存中
                memoryUtils.user = result.data

                // 跳转到admin中
                this.props.history.replace('/')
             } else {
                message.error(result.msg, 2)
             }
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        if(memoryUtils.user._id){
            return <Redirect to ='/'/>
        }
        return (
            <div className='login'>
                <header className = 'login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React后台:服务器系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue:'',
                            rules: [
                                { required: true, message: '请输入用户名' },
                                { min:4,message:'用户名不少于4位'},
                                { max:12,message:'用户名不能超过12为'},
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'必须英文，数组，下划线'}
                        ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { validator:this.handerPWD }
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

 const WrappedNormalLoginForm = Form.create()(Login);
 export default WrappedNormalLoginForm

 