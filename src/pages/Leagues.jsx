import React, { useState } from 'react'
import pandascore from '../components/Pandascore'
import NavBar from '../components/NavBar'
import { Style } from '../style/Leagues.js'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'
import noImage from '../assets/images/no-image.jpg'

export default function Leagues() {
    const [leagues, setLeagues] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    React.useEffect(() => {
        pandascore
            .get('lol/leagues')
            .then(({ data }) => {
                setLeagues(data)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [])

    return (
        <>
            <NavBar theme="light" />
            <Style>
                <header className="header">
                    <h1 className="title">Ligues LoL</h1>
                </header>
                <ClipLoader
                    color="#000000"
                    loading={!isLoaded}
                    css={css`
                        display: block;
                        margin: 2.5rem auto;
                    `}
                />
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
