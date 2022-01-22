import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import { Style } from '../style/Leagues.js'
import noImage from '../assets/images/no-image.jpg'

export default function Leagues() {
    const [leagues, setLeagues] = useState([])

    React.useEffect(() => {
        axios.get('https://api.pandascore.co/lol/leagues?token=KTWkw8TNb1BEslmnPENt5W53-M2_felAwT1SMscA78X0JTcw5fo').then(({ data }) => {
            setLeagues(data)
        })
    }, [])

    return (
        <>
            <NavBar theme="light" />
            <Style>
                <header className="header">
                    <h1 className="title">Ligues LoL</h1>
                </header>
                <main className="main container">
                    <div className="leagues">
                        {leagues.map(({ id, image_url, name, url }) => (
                            <div className="league" key={id}>
                                <p className="name">{name}</p>
                                <div className="image-container">
                                    <a href={url} target="_blank">
                                        <img className="image" src={image_url !== null ? image_url : noImage}></img>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </Style>
        </>
    )
}
