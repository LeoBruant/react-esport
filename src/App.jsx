import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import React, { useState } from 'react'

import Home from './pages/Home'
import Leagues from './pages/Leagues'
import Login from './pages/Login'
import Players from './pages/Players'
import NotFound from './pages/NotFound'
import Redirect from './components/Redirect'
import Registration from './pages/Registration'
import Teams from './pages/Teams'

export default function App() {
    const games = {
        csgo: 'CS:GO',
        codmw: 'COD MW',
        dota2: 'Dota 2',
        fifa: 'Fifa',
        lol: 'Lol',
        ow: 'Overwatch',
        // pubg: 'PUBG',
        r6siege: 'Rainbow 6 siege',
        rl: 'Rocket league',
        valorant: 'Valorant',
        kog: 'King of glory',
        'lol-wild-rift': 'Lol wild rift'
    }

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
            <NavBar coins={user !== null ? user.coins : null} theme="dark" />
            <Routes>
                <Route exact path="/" element={<Redirect basePath={true} game={Object.keys(games)[0]} />} />
                <Route path="/matches/:game" element={<Home games={games} getUser={getUser} user={user} />} />
                <Route path="/leagues/:game/:page" element={<Leagues games={games} />} />
                <Route exact path="/login" element={<Login getUser={getUser} />} />
                <Route path="/players/:game/:page" element={<Players games={games} />} />
                <Route exact path="/registration" element={<Registration />} />
                <Route path="/teams/:game/:page" element={<Teams games={games} />} />
                {user !== null && <Route path="*" element={<NotFound />} />}
            </Routes>
        </BrowserRouter>
    )
}
