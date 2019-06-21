import React, { Component } from 'react'
import {
    Card,
    Select,
    Icon,
    Table,
    Button,
    Input,
    message,
} from 'antd'
import { reqProducts,reqSearchProducts,reqUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button'

import Detail from '../../utils/detail'

const { Option } = Select

export default class ProductHome extends Component {
    
    state = {
        loading:false,//是否显示请求中的loading
        products:[],//当前页的商品数组
        total:0,//所有商品的总个数
        searchType:'productName',
        serchName:'',
    }

    /* 
    更新商品的状态
    */
   updateStatus=async (status,productId)=>{
        const result = await reqUpdateStatus(productId, status)
        if(result.status === 0){
            message.success('更新状态成功')
             // 重新获取当前页显示
             this.getProducts(this.pageNum)

        }
   }
   showDetail=(product)=>{
    Detail.list = product
    console.log(product)
    this.props.history.push('/product/detail')
   }

    //初始化columns 猎头
    initColumns=()=>{
        this.columns = [
            {
                title:'商品名称',
                dataIndex:'name',
            },
            {
                title:'商品描述',
                dataIndex:'desc',
            },
            {
                title:'价格',
                dataIndex:'price',
                render:(price)=> '￥'+ price
            },
            {
                title:'状态',
                width:100,
                render:(product)=>{
                    const {status,_id} = product
                    const btnText = status===1 ? '下架' : '上架'
                    const text = status===1 ? '在售':'以下架'
                    return (
                        <span>
                            <Button type="primary" onClick={() => this.updateStatus(status === 1 ? 2 : 1, _id)}>{btnText}</Button>
                            <span>{text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                 <span>
                    <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton>
                   <LinkButton>修改</LinkButton>
                 </span>
                )
              },
        ]
    }

   /* 
   发送异步请求，获取指定页码的上坪列表数据
   */
    getProducts= async (pageNum)=>{
        //保存当前请求的页码
        this.pageNum = pageNum

        this.setState({loading:true})
        const {searchName,searchType} = this.state
        let result 
        if(!searchName){
             result = await reqProducts({pageNum,pageSize:2})
        } else {
             result = await reqSearchProducts({pageNum,pageSize:2,searchType,searchName})
        }
       
        this.setState({loading:false})
        if(result.status === 0){
            const {total,list} = result.data
            this.setState({
                total,
                products:list
            })
        }
    }


    componentWillMount(){
        //表头数组数据，枪药挂载设置初始值
        this.initColumns()
    }

    componentDidMount(){
        //默认显示第一页
        this.getProducts('1')
    }

    render() {

        const {loading,products,total,searchType,searchName} = this.state

        const title = (
            <span>
                <Select 
                    value={searchType}
                    onChange = {value => this.setState({searchType: value})} 
                    style={{width:150}}
                  >
                    <Option value='productName'>按名称搜索 </Option>
                    <Option value='productDesc'>按描述搜索 </Option>
                </Select>
                <Input 
                    placeholder='关键字'
                    style = {{margin:'0 15px',width:150}}
                    value={searchName}
                    onChange={event => this.setState({searchName:event.target.value})}
                    >
                </Input>
                <Button type='primary' onClick={()=> this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' >
                <Icon type='plus'/>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>  
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}//表头设置自定义与请求参数有对对应关系
                    dataSource={products}//产品数组
                    pagination={{//配置分页器属性
                        defaultPageSize:2,//默认每页展示2个
                        showQuickJumper:true,//是否能条状，默认不能跳转
                        total,//接收数据总数/每页条数 自动生成页数，
                        onChange:this.getProducts//点击/跳转 页面变化每页发送ajax请求
                    }}
                />
            </Card>
        )
    }
}
