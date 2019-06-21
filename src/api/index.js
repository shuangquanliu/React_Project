import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
const BASE = ''


export const reqLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST')

//获取分类列表（一级/耳机）
export const reqCategory = (parentId)=> ajax(BASE+'manage/category/list',{parentId})

// 更新分类的名称
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update',{categoryId, categoryName}, 'POST')

//获取商品信息
export const reqProducts =({pageNum,pageSize})=> ajax(BASE+'/manage/product/list',{pageNum,pageSize},'GET')

// 根据分类ID获取分类
export const reqCategorya = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

//搜索商品信息
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 搜索类型 值为'productDesc' / 'productName'
  searchName // 搜索的关键字
}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

export const reqUpdateStatus = (productId,status)=> ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')



// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

/* 
发jsonp请求获取当前天气信息
*/

export const reqWeather = (location)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

    return new Promise((resolve,reject)=>{
         // 执行请求
    setTimeout(() => {
        jsonp(url, {}, (error, data) => {
          if (!error && data.status === 'success') {
            const {
              dayPictureUrl,
              weather
            } = data.results[0].weather_data[0]
            // 成功了, 调用reolve()指定成功的值
            resolve({
              dayPictureUrl,
              weather
            })
          } else {
            message.error('获取天气信息失败!')
          }
        })
      }, 2000)
    })
}