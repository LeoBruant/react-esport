import React from 'react'
import axios from 'axios'
import { Style } from '../style/Home.js'
import NavBar from '../components/NavBar'

export default function Home() {
    React.useEffect(() => {
        // axios
        //     .get('https://api.pandascore.co/lol/matches/past?token=KTWkw8TNb1BEslmnPENt5W53-M2_felAwT1SMscA78X0JTcw5fo')
        //     .then(({ data }) => {
        //         console.log(data)
        //     })
        // axios
        //     .get('https://api.pandascore.co/lol/matches/running?token=KTWkw8TNb1BEslmnPENt5W53-M2_felAwT1SMscA78X0JTcw5fo')
        //     .then(({ data }) => {
        //         console.log(data)
        //     })
        // axios
        //     .get('https://api.pandascore.co/lol/matches/upcoming?token=KTWkw8TNb1BEslmnPENt5W53-M2_felAwT1SMscA78X0JTcw5fo')
        //     .then(({ data }) => {
        //         console.log(data)
        //     })
    })

    return (
        <>
            <NavBar theme="light" />
            <Style>
                <main className="main">
                    <h1 className="title">Accueil</h1>
                </main>
            </Style>
        </>
    )
}
