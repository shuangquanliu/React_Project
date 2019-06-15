import ajax from './ajax'

//定义接口函数模块，分别暴露
const BASE = ''
/* export function reqLogin(username,password){
    return ajax(BASE+'/login',{username,password},'POST')
}
 */

export const reqLogin = (username,Password)=>ajax(BASE+'/login',{username:'admin',Password:'admin'},'POST')

// 简单测试一下
reqLogin('admin', 'admin').then(result => {
    console.log('result', result)
  })
  