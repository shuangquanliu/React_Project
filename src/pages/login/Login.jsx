import React,{Component} from 'react'
import { Form, Icon, Input, Button} from 'antd'
import logo from './images/logo.png'
import './Login.less'

class Login extends Component{
    handleSubmit=(e)=>{
      e.preventDefault()
    //   const {getFieldValue} = this.props.form
    //   const userName = getFieldValue('userName')
    //   const passWord = getFieldValue('passWord')
    //   const values = this.props.form.getFieldsValue()
    //   console.log(userName,passWord,values)
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('验证提交发送ajax请求 ', values);
        }
      });


    }
    rulesPwd=(rule,value = '',callback)=>{
        value = value.trim()
        if(!value){
            callback('请输入用户名')
        } else if(value.length<4){
            callback('密码不能小于4位')
        } else if(value.length>12){
            callback('密码长度不能大于12位')
        } else if(!/^[a-zA-Z0-9_]+$/){
            callback('必须为英文，数组，下划线开头')
        } else {
            callback()
        }
    }
    render(){
        const {getFieldDecorator} = this.props.form

        return(
            <div className='login'>
               <header className = 'login-header'>
                   <img src={logo} alt="logo"/>
                   <h1>React项目: 后台管理系统</h1>
               </header>
               <section className='login-content'>
                   <h2>用户登陆</h2>
                   <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>

                            {getFieldDecorator('userName',{
                                initialValue:'',
                                rules:[
                                    {required:true,whitespace:true,message:'请输入用户名'},
                                    {min:4,message:'密码不能小于4位'},
                                    {max:12,message:'密码长度不能大于12位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'必须为英文，数组，下划线开头'}
                                ]
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                />,
                            )}
                    
                        </Form.Item>
                        <Form.Item>

                        {getFieldDecorator('passWord',{
                            rules:[
                                {validator:this.rulesPwd}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
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

export default WrappedNormalLoginForm;