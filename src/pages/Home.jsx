import axios from 'axios'
import Bet from '../components/Bet'
import Match from '../components/Match'
import pandascore from '../components/Pandascore'
import React, { useCallback, useState } from 'react'
import Redirect from '../components/Redirect'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/Home.js'

export default function Home({ getUser, user }) {
    const matchTypes = {
        passed: { title: 'passés' },
        running: { title: 'en cours' },
        upcoming: { title: 'à venir' }
    }

    const [bets, setBets] = useState([])
    const [counter, setCounter] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [matchBet, setMatchBet] = useState({
        id: null,
        name: null,
        opponents: {}
    })
    const [matches, setMatches] = useState({ passed: [], running: [], upcoming: [] })

    const getBets = () => {
        axios.get('http://localhost:3004/bets').then(({ data }) => {
            setBets(data)
        })
    }

    const getData = useCallback(() => {
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
                }),
                axios.get('http://localhost:3004/bets').then(({ data }) => {
                    setBets(data)
                })
            ])
            .then(() => {
                setIsLoaded(true)
            })
    }, [])

    const hideBet = () => {
        setMatchBet({
            id: null,
            name: null,
            opponents: {}
        })
    }

    const showBet = (id, name, opponents) => {
        setMatchBet({
            id,
            name,
            opponents
        })
    }

    React.useEffect(() => {
        // Get data at first load

        if (counter === 0) {
            getData()
            setCounter(counter + 1)
        }

        // Update data

        setTimeout(() => {
            getData()
        }, 60000)
    }, [counter, getData])

    return (
        <>
            <Redirect />
            <Style>
                <header className="header">
                    <h1 className="title">Matchs LoL</h1>
                </header>
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                <main className="main container">
                    {isLoaded &&
                        Object.entries(matches).map((matchType) => (
                            <section className="matches-container col-12 col-sm-10 col-md-6 col-xl-4" key={matchType[0]}>
                                <h2 className="title">{matchTypes[matchType[0]].title}</h2>
                                <div className="matches">
                                    {matchType[1].map((match) => (
                                        <Match
                                            bet={
                                                bets.filter(
                                                    ({ matchId, userId }) => matchId === match.id && userId === parseInt(localStorage.id)
                                                )[0] !== null
                                                    ? bets.filter(
                                                          ({ matchId, userId }) =>
                                                              matchId === match.id && userId === parseInt(localStorage.id)
                                                      )[0]
                                                    : null
                                            }
                                            bets={
                                                bets.filter(({ matchId }) => matchId === match.id).length !== 0
                                                    ? bets.filter(({ matchId }) => matchId === match.id)
                                                    : []
                                            }
                                            getBets={getBets}
                                            getUser={getUser}
                                            key={match.id}
                                            match={match}
                                            matchType={matchType}
                                            showBet={showBet}
                                            user={user}
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
