import React, { useCallback, useState } from 'react'
import axios from 'axios'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Home.js'
import NavBar from '../components/NavBar'
import Match from '../components/Match'
import { Spinner } from 'react-bootstrap'
import Bet from '../components/Bet'

export default function Home({ getUser, user }) {
    const matchTypes = {
        passed: { title: 'passés' },
        running: { title: 'en cours' },
        upcoming: { title: 'à venir' }
    }

    const [counter, setCounter] = useState(0)
    const [matches, setMatches] = useState({ passed: [], running: [], upcoming: [] })
    const [isLoaded, setIsLoaded] = useState(false)
    const [matchBet, setMatchBet] = useState({
        id: null,
        name: null,
        opponents: {}
    })
    const [bets, setBets] = useState([])

    const getMatches = useCallback(() => {
        axios
            .all([
                pandascore.get('lol/matches/past?per_page=100').then(({ data }) => {
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
                pandascore.get('lol/matches/upcoming?per_page=100').then(({ data }) => {
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
    }, [counter])

    React.useEffect(() => {
        // Get data at first load

        if (counter === 0) {
            getMatches()
            getBets()
        }

        setTimeout(() => {
            getMatches()
            getBets()
        }, 60000)
    }, [counter, getMatches])

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

    const getBets = () => {
        axios
            .get(
                'http://localhost:3004/bets?userId=' +
                    window.localStorage.getItem('id') +
                    '&loginToken=' +
                    window.localStorage.getItem('token')
            )
            .then(({ data }) => {
                setBets(data)
            })
    }

    return (
        <>
            {user !== null && <NavBar coins={user.coins} theme="light" />}
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
                                    {matchType[1].map(({ begin_at, end_at, id, name, official_stream_url, opponents, results, winner }) => (
                                        <Match
                                            begin_at={begin_at}
                                            bet={
                                                bets.filter(({ matchId }) => matchId === id)[0] !== null
                                                    ? bets.filter(({ matchId }) => matchId === id)[0]
                                                    : null
                                            }
                                            end_at={end_at}
                                            getBets={getBets}
                                            getUser={getUser}
                                            id={id}
                                            key={id}
                                            matchType={matchType}
                                            name={name}
                                            opponents={opponents}
                                            results={results}
                                            showBet={showBet}
                                            stream={official_stream_url}
                                            user={user}
                                            winner={winner}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                </main>
            </Style>
            {matchBet.id !== null && <Bet getBets={getBets} getUser={getUser} hideBet={hideBet} matchBet={matchBet} user={user} />}
        </>
    )
}
