import axios from "axios";

export default function ajax(url,data={},method='GET'){
    return new Promise ((resolve,reject)=>{
        let Promise
        if(method === 'GET'){
            Promise = axios.get(url,{params:data})
        } else {
            Promise = axios.post(url,data)
        }
        Promise.then(
            (response)=>{
                resolve(response.data)
            },
            (err)=>{
                alert('请求出错'+err.message)
            }
            )
    })
}

// async function login(){
//     let result = await ajax('http://localhost:5000/login',{username:'admin',parsword:'admin'},'POST') 
//    if(result.status === 0){

//    } else {

//    }
// }

// login()