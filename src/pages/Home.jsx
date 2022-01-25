import React, { useState } from 'react'
import axios from 'axios'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Home.js'
import NavBar from '../components/NavBar'
import Match from '../components/Match'
import { Spinner } from 'react-bootstrap'
import Bet from '../components/Bet'

export default function Home() {
    const [counter, setCounter] = useState(0)
    const [matches, setMatches] = useState({ passed: [], running: [], upcoming: [] })
    const [isLoaded, setIsLoaded] = useState(false)
    const [matchTypes, setMatchTypes] = useState({
        passed: { title: 'passés' },
        running: { title: 'en cours' },
        upcoming: { title: 'à venir' }
    })
    const [matchBet, setMatchBet] = useState({
        id: null,
        name: null,
        opponents: {}
    })

    React.useEffect(() => {
        // Declare function getMatches

        const getMatches = () => {
            axios
                .all([
                    pandascore.get('lol/matches/past?per_page=3').then(({ data }) => {
                        setMatches((oldMatches) => {
                            return {
                                ...oldMatches,
                                passed: data
                            }
                        })
                    }),
                    pandascore.get('lol/matches/running?per_page=100').then(({ data }) => {
                        setMatches((oldMatches) => {
                            return {
                                ...oldMatches,
                                running: data
                            }
                        })
                    }),
                    pandascore.get('lol/matches/upcoming?per_page=3').then(({ data }) => {
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

                    setCounter(counter + 1)
                })
        }

        // Get matches at first load

        if (counter === 0) {
            getMatches()
        }

        // Get matches after delay

        setTimeout(() => {
            getMatches()
        }, 10000)
    }, [counter])

    const showBet = (id, name, opponents) => {
        setMatchBet({
            id,
            name,
            opponents
        })
    }

    const hideBet = () => {
        setMatchBet({
            id: null,
            name: null,
            opponents: {}
        })
    }

    return (
        <>
            <NavBar theme="light" />
            <Style>
                <header className="header">
                    <h1 className="title">Matchs LoL</h1>
                </header>
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                <main className="main container">
                    {isLoaded &&
                        Object.entries(matches).map((matchType) => (
                            <section key={matchType[0]} className="matches-container col-12 col-sm-10 col-md-6 col-xl-4">
                                <h2 className="title">{matchTypes[matchType[0]].title}</h2>
                                <div className="matches">
                                    {matchType[1].map(({ begin_at, end_at, id, name, official_stream_url, opponents, results }) => (
                                        <Match
                                            key={id}
                                            begin_at={begin_at}
                                            end_at={end_at}
                                            id={id}
                                            matchType={matchType}
                                            name={name}
                                            opponents={opponents}
                                            results={results}
                                            showBet={showBet}
                                            stream={official_stream_url}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                </main>
                {matchBet.id !== null && <Bet hideBet={hideBet} matchBet={matchBet} />}
            </Style>
        </>
    )
}
