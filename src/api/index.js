import ajax from './ajax'

//定义接口函数模块，分别暴露
const BASE = ''
/* export function reqLogin(username,password){
    return ajax(BASE+'/login',{username,password},'POST')
}
 */

export const reqLogin = (username,password)=>ajax(BASE+'/login',{username,password},'POST')


reqLogin('admin', 'admin').then(result => {
    console.log('result', result)
  })
  