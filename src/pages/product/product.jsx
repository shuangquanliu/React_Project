import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-updata'

/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/product' component={ProductHome}/>
        <Route  path='/product/detail' component={ProductDetail}/>
        <Route  path='/product/addupdate' component={ProductAddUpdate}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
