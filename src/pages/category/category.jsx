import React, { Component } from 'react'
import {Card,Table ,Button,Icon,Modal,message} from 'antd'
import {reqCategory,reqUpdateCategory} from '../../api/index'

import LinkButton from '../../components/link-button'
import UpdateForm from './update-from'

  
  
  
export default class Category extends Component {

  state = {
    parentId: '0', // 当前分类列表的parentId
    parentName: '', // 当前分类列表的父分类名称
    categorys: [], // 一级分类数组
    subCategorys: [], // 二级分类数组
    loading: false, // 是否显示loading界面
    showStatus: 0, // 0: 都不显示, 1: 修改, 2: 添加
  }

  /* 
  显示一级列表
  */
  getCategorys=async()=>{
    this.setState({loading:true})
    const {parentId} = this.state
    const result = await reqCategory(parentId)
    this.setState({loading:false})
    
    if (result.status===0) {
      // 得到的分类数组可能是一级的, 也可能是二级的
      const categorys = result.data
      if (parentId==='0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
      
    }
  }

  /* 
    显示指定分类的子分类列表
  */
  showSubCategorys=(category)=>{
     /* 
    setState()是异步更新的状态数据, 在setState()的后面直接读取状态数据是旧的数据
    利用setState({}, callback): callback在状态数据更新且界面更新后执行
    */

    // 更新parentId为当前指定分类的id
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
        // 获取对应的列表显示
        this.getCategorys()
    })
  }

  /* 
    回退显示一级列表
  */

  showCategorys=()=>{
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }


/* 
  初始表格数组
*/
  initColumns=()=>{
    //columns 列
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',       
      },
      {
        title: '操作',
        width:300,
        className: 'column-money',
        render: (category) => {// 参数为当前行的数据
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
              {
                this.state.parentId === '0' && <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
              }
              
            </span>
          )
        }
      },
  ];
  }

    /* 
    显示更新的界面
    */
  showUpdate = category => {
    // 保存cateogory
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 1
    })
  }

  /* 
  更新分类
  */
  updateCategory =()=>{
    //进行表单验证
    this.form.validateFields(async (err,values)=>{
      if(!err){//只有验证通过才继续
            this.setState({
              showStatus:0
            })
            //得到输入的分类名称
            const categoryName = this.form.getFieldValue('categoryName')
            //重置输入数据
            this.form.resetFields()
            //得到分类的——id
            const categoryId = this.category._id

            //console.log(‘发送跟新请求’，categoryID,categoryName)
            const result = await reqUpdateCategory({ categoryId, categoryName })
            if (result.status===0) {
              message.success('更新分类成功')
              this.getCategorys()
            }
      }
    })
  }

  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getCategorys()
  }
    render() {
      const {categorys,loading,parentId,subCategorys,parentName,showStatus}  = this.state

      
      // 读取当前指定的分类
      const category = this.category || {}

      // 定义Card的左侧标题
      const title = parentId==='0' ? '一级分类列表' : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right"></Icon>&nbsp;&nbsp;
          <span>{parentName}</span>
        </span>
      )
      
      const extra = (
        <Button type='primary'>
          <Icon type='plus'/>
          添加
        </Button>
      )
        return (
            <Card title= {title} extra={extra} >
                  <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    columns={this.columns}
                    dataSource={parentId==='0'?categorys:subCategorys}//数组
                    pagination = {{defaultPageSize:4,showQuickJumper:true}}

                />

              <Modal
                        title="更新分类"
                        visible={showStatus===1}
                        onOk={this.updateCategory}
                        onCancel={() => {
                          this.form.resetFields()
                          this.setState({ showStatus: 0 })
                        }}
                      >
                        <UpdateForm categoryName={category.name} setForm={(form) => this.form = form}/>
                      </Modal>
            </Card>
        )
    }
}
