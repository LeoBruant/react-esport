import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import React, { useState } from 'react'

import Matches from './pages/Matches'
import List from './pages/List'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Redirect from './components/Redirect'
import Registration from './pages/Registration'

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

    const mobas = ['dota2', 'lol']

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
            <Redirect />
            <NavBar coins={user !== null ? user.coins : null} mobas={mobas} theme="dark" />
            <Routes>
                <Route exact path="/" element={<Redirect basePath={true} game={Object.keys(games)[0]} />} />

                <Route path="/characters/:game/:page" element={<List games={games} mobas={mobas} pageName="characters" />} />
                <Route path="/leagues/:game/:page" element={<List games={games} pageName="leagues" />} />
                <Route exact path="/login" element={<Login getUser={getUser} />} />
                <Route path="/matches/:game" element={<Matches games={games} getUser={getUser} user={user} />} />
                <Route path="/players/:game/:page" element={<List games={games} pageName="players" />} />
                <Route exact path="/registration" element={<Registration />} />
                <Route path="/teams/:game/:page" element={<List games={games} pageName="teams" />} />

                {user !== null && <Route path="*" element={<NotFound />} />}
            </Routes>
        </BrowserRouter>
    )
}
