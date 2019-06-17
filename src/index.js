import React from 'react'
import ReactDOM from 'react-dom'
import {getstore} from './utils/storeUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'
import './api'




const user = getstore() 

memoryUtils.user = user

ReactDOM.render(<App/>,document.getElementById('root'))
