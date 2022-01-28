import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.jsx'

// Style

import './app.scss'

// Bootstrap

import 'bootstrap/dist/css/bootstrap.min.css'

// Font awesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'

library.add(faCog)

// Render

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
