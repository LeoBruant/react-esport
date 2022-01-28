import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages

import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Leagues from './pages/Leagues'

export default function App() {
    const [user, setUser] = useState(null)

    const getUser = () => {
        axios.get('http://localhost:3004/users?id=' + localStorage.id + '&loginToken=' + localStorage.token).then(({ data }) => {
            setUser(data[0])
        })
    }

    React.useEffect(() => {
        getUser()
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Home getUser={getUser} user={user} />} />
                <Route path="/leagues" element={<Leagues />} />
                {user !== null && <Route path="*" element={<NotFound coins={user.coins} />} />}
            </Routes>
        </BrowserRouter>
    )
}
