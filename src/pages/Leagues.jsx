import React, { useState } from 'react'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Leagues.js'
import { Spinner } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'

export default function Leagues() {
    const [leagues, setLeagues] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    React.useEffect(() => {
        pandascore
            .get('lol/leagues?per_page=100')
            .then(({ data }) => {
                setLeagues(data)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [])

    return (
        <Style>
            <header className="header">
                <h1 className="title">Ligues LoL</h1>
            </header>
            {!isLoaded && <Spinner animation="border" className="spinner" />}
            <main className="main container">
                <div className="leagues">
                    {leagues.map(({ id, image_url, name, url }) => (
                        <div className="league" key={id}>
                            <p className="name">{name}</p>
                            <div className="image-container">
                                <a href={url} target="_blank" rel="noreferrer">
                                    <img className="image" src={image_url !== null ? image_url : noImage} alt={name + ' image'}></img>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </Style>
    )
}
