import React,{Component} from 'react'
import logo from './images/logo.png'
import { Form, Icon, Input, Button} from 'antd'
import './Login.less'
 class App extends Component{
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if (!err) { // 验证成功了
                console.log('发登陆ajax请求: ', values)
              }
        })

    }
    usercallback=(rule,value='',callback)=>{
        value = value.trim()
        if(!value){
            callback('密码不能为空')
        } else if(value.length<4){
            callback('密码不少于4位')
        } else if (value.length>12){
            callback('密码不得超过12位')
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('必须以任意字符，数字，下划线')
        } else{
            callback()
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
           
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>Reacth项目：后台服务系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item> 
                            {getFieldDecorator('username',{
                                initialValue:'',
                                rules:[
                                    {required:true,whitespace:true},
                                    {min:4,message:'用户名不少于4位'},
                                    {max:12,message:'用户名不得在超过12位'},
                                    {pattern:/^[a-z-Z0-9_]+$/,message:'必须以任意字符，数字，下划线'}
                                ]
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />
                            )}                     
                                             
                        </Form.Item>
                        <Form.Item> 
                            {getFieldDecorator('password',{
                                rules:[
                                    {validator:this.usercallback}
                                ]
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
 />      
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

const WrappedNormalLoginForm = Form.create()(App);

export default WrappedNormalLoginForm;