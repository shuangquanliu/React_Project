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
import { reqRoles } from '../../../../../190218_AdminClient/src/api';

/**
 * 角色管理
 */
export default class Role extends Component {

  state = {
    roles:[],
    isShowAdd:false,
    isShowAuth:false,
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
        render: (role) => <LinkButton >设置权限</LinkButton> 
      }
    ]
  }

  /* 
  异步获取劫色列表显示
  */

  getRoles = ()=>{
    const result = await reqRoles()
  }
  componentWillMount(){
    this.initcolumns()
  }

  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles,isShowAdd,isShowAuth} = this.state
    const title = (
      <Button type='primary'>
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

        >

        </Modal>
      </Card>
    )
  }
}
