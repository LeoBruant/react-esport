import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

// Pages

import Home from './pages/Home'
import Leagues from './pages/Leagues'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Registration from './pages/Registration'

export default function App() {
    const [user, setUser] = useState(null)

    const getUser = () => {
        axios.get('http://localhost:3004/users?id=' + localStorage.id + '&loginToken=' + localStorage.token).then(({ data }) => {
            setUser(data[0])
        })
    }

    React.useEffect(() => {
        if (localStorage.id !== undefined && localStorage.token !== undefined) {
            getUser()
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home getUser={getUser} user={user} />} />
                <Route path="/leagues" element={<Leagues />} />
                <Route path="/login" element={<Login getUser={getUser} />} />
                <Route path="/registration" element={<Registration />} />
                {user !== null && <Route path="*" element={<NotFound coins={user.coins} />} />}
            </Routes>
        </BrowserRouter>
    )
}
