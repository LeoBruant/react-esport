import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages

import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

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
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)
