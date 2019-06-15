import ajax from './ajax'
const BASE = ''
export const reqLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST')

reqLogin('admin','admin').then(
    result=>{
        console.log(result)
    }
)