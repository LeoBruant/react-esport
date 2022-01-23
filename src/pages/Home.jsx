import React, { useState } from 'react'
import axios from 'axios'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Home.js'
import NavBar from '../components/NavBar'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'
import moment from 'moment'

export default function Home() {
    const [counter, setCounter] = useState(0)
    const [matches, setMatches] = useState({ passed: [], running: [], upcoming: [] })
    const [isLoaded, setIsLoaded] = useState(false)
    const [matchTypes, setMatchTypes] = useState({
        passed: { title: 'passés' },
        running: { title: 'en cours' },
        upcoming: { title: 'à venir' }
    })

    React.useEffect(() => {
        if (counter === 0) {
            getMatches()
        }

        setTimeout(() => {
            getMatches()
        }, 10000)
    }, [counter])

    const getMatches = () => {
        axios
            .all([
                pandascore.get('lol/matches/past?per_page=10').then(({ data }) => {
                    setMatches((oldMatches) => {
                        return {
                            ...oldMatches,
                            passed: data
                        }
                    })
                }),
                pandascore.get('lol/matches/running?per_page=10').then(({ data }) => {
                    setMatches((oldMatches) => {
                        return {
                            ...oldMatches,
                            running: data
                        }
                    })
                }),
                pandascore.get('lol/matches/upcoming?per_page=10').then(({ data }) => {
                    setMatches((oldMatches) => {
                        return {
                            ...oldMatches,
                            upcoming: data
                        }
                    })
                })
            ])
            .then(() => {
                if (counter === 0) {
                    setIsLoaded(true)
                }

                setCounter((oldCounter) => {
                    return oldCounter + 1
                })
            })
    }

    return (
        <>
            <NavBar theme="light" />
            <Style>
                <header className="header">
                    <h1 className="title">Matchs LoL</h1>
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
                    {isLoaded &&
                        Object.entries(matches).map((matchType) => (
                            <section key={matchType[0]} className="matches-container col-12 col-sm-10 col-md-6 col-xl-4">
                                <h2 className="title">{matchTypes[matchType[0]].title}</h2>
                                <div className="matches">
                                    {matchType[1].map(({ begin_at, end_at, id, name, opponents }) => (
                                        <div className="match" key={id}>
                                            <div className="times">
                                                <p className="text">début : {moment(begin_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                                                <p className="text">
                                                    fin : {end_at !== null ? moment(end_at).format('DD/MM/YYYY HH:mm:ss') : '-'}
                                                </p>
                                            </div>
                                            <div className="opponents">
                                                <div className="opponent">
                                                    <h4 className="name">{opponents[0].opponent.acronym}</h4>
                                                    <img className="image" src={opponents[0].opponent.image_url}></img>
                                                </div>
                                                <p className="versus">vs</p>
                                                <div className="opponent">
                                                    <h4 className="name">{opponents[1].opponent.acronym}</h4>
                                                    <img className="image" src={opponents[1].opponent.image_url}></img>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                </main>
            </Style>
        </>
    )
}
