/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time=Date.now()) {
   
    // let date1 = new Date()
    // console.log(date1)
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
      ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }