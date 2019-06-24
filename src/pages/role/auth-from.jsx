import React, { Component } from 'react'
import { Form,Input,Tree } from 'antd';
import menuList from '../../config/menuConfig'
import PropTypes from 'prop-types'
const { TreeNode } = Tree;
const { Item } = Form
export default class AuthFrom extends Component {

    static propTypes = {
        role: PropTypes.object
      }
    
      constructor (props) {
        super(props)
       
        // 读取当前角色的权限
        const menus = this.props.role.menus
        // 初始化状态
        this.state = {
          checkedKeys: menus
        }
      }

      getMenus=()=>{
          return this.state.checkedKeys
      }


    
     
    //初始化
    initTreeNodes=(menuList)=>{
        return menuList.reduce((pre, item) => {
            // 添加一个<TreeNode>
            pre.push(
              <TreeNode title={item.title} key={item.key}>
                {item.children ? this.initTreeNodes(item.children) : null}
              </TreeNode>
            )
            return pre
          }, [])
    }

    /* 
    点击勾选框的对调，
    */
   onCheck = (checkedKeys)=>{
        this.setState({
            checkedKeys
        })
   }

     /* 
      接收收到的新属性时候自动调用（初始化不会执行）可以复用提高效率
      需要接收新组建的时候更新,自身改变不会触发
      */
     componentWillReceiveProps(nextProps){
        const menus = nextProps.role.menus
        //更新状态
        this.setState({
            checkedKeys: menus
        })
     }

     
    componentWillMount(){
        this.treeNodes = this.initTreeNodes(menuList)
    }
    render() {
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        const role = this.props
        const {checkedKeys} = this.state
        return (
            <div>
            <Item label='角色名称' {...formItemLayout}>
              <Input value={role.name} disabled/>
            </Item>
    
            <Tree
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={this.onCheck}
            >
              <TreeNode title="平台权限" key="all">
              {this.treeNodes}
              </TreeNode>
            </Tree>
          </div>
        )
    }
}
