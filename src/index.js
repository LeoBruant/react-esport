import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

// Style

import './app.scss'

// Font awesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faSearch, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

library.add(faCog, faReact, faSearch, faStarEmpty, faStarSolid)

// Render

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
