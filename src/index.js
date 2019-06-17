import React from 'react'
import ReactDOM from 'react-dom'
import memoryUtils from './utils/memoryUtils'
import App from './App'
import './api'




const user = JSON.parse(localStorage.getItem('USER-KEY') || "{}")

memoryUtils.user = user

ReactDOM.render(<App/>,document.getElementById('root'))
