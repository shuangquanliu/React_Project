import React, { Component } from 'react'
import {
  Card,
  Table,
  Modal,
  Button,
  message,
} from 'antd'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import {formateDate} from '../../utils/dateUtils'
import {reqRoles,reqAddRole,reqUpdateRole} from  '../../api'
import AddForm from './add-from'
import AuthForm from './auth-from'

import memoryUtils from '../../utils/memoryUtils'
/**
 * 角色管理
 */
export default class Role extends Component {

  state = {
    roles:[],
    isShowAdd:false,
    isShowAuth:false,
  }

  constructor (props) {
    super(props)

    this.authRef = React.createRef()
  }


  /* 
  显示权限设置界面
  */
  showAuth=(role)=>{
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }


  initcolumns=()=>{
    this.columns= [
      {
        title:'角色名称',
        dataIndex:'name'
      },
      {
        title:'创建时间',
        dataIndex: 'create_time',
        render:formateDate
      },
      {
        title:'授权时间',
        dataIndex:'auth_time',
        render:auth_time => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={()=>  this.showAuth(role)}>设置权限</LinkButton> 

      }
    ]
  }

  /* 
  异步获取劫色列表显示
  */

  getRoles = async()=>{
    const result = await reqRoles()
    if(result.status === 0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  /* 
  点击添加页面
  */

  addRole=()=>{
    //进行表单验证
    this.form.validateFields(async (error,values)=>{
      if(!error){
        this.setState({isShowAdd: false})
        const result = await reqAddRole(values.roleName)
        if(result.status === 0){
          message.success('添加角色成功')
          const role = result.data
          //获取状态角色列表
          const roles = this.state.roles
          //更新状态列表，不直接操作，通过三点运算符拷贝，在后面增加一个数组
          this.setState({
            roles:[...roles,role]
          })
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }

  /* 
  给角色授权
  */

  updateRole = async()=>{
    this.setState({
      isShowAuth:false
    })
   
    //更新user 对象属性
    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    //发送请求跟新用户
    const result = await reqUpdateRole(role)
    console.log(result)
    if (result.status === 0) {
      message.success('授权成功')
      this.getRoles()
    }
  }


  componentWillMount(){
    this.initcolumns()
  }

  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles,isShowAdd,isShowAuth} = this.state
    const role = this.role || {}
    const title = (
      <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>
        创建角色
      </Button>
    )
    return (
      <Card title={title}>
        <Table
        bordered
        rowKey='_id'
        dataSource={roles}
        columns = {this.columns}
        pagination ={{defaultPageSize:PAGE_SIZE}}
        />
        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={()=>{
            this.setState({isShowAdd:false})
            this.form.resetFields()
          }}
        >
          <AddForm 
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title='设置角色权限'
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm role={role} ref={ this.authRef} />
        </Modal>
      </Card>
    )
  }
}
