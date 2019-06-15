import axios from "axios";

export default function ajax(url,data={},method='GET'){
    return new Promise ((resolve,reject)=>{
        let promise
        if(method === 'GET'){
            promise = axios.get(url,{params:data})
        } else {
            promise = axios.post(url,data)
        }
        promise.then(
            (response)=>{
                console.log(response)
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