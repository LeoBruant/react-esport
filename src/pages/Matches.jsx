import axios from 'axios'
import Bet from '../components/Bet'
import Header from '../components/Header'
import Legend from '../components/Legend'
import Match from '../components/Match'
import pandascore from '../js/Pandascore'
import React, { useCallback, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/Home.js'
import { useParams, useSearchParams } from 'react-router-dom'

export default function Matches({ games, getUser, user }) {
    const matchTypes = {
        past: { title: 'passés' },
        running: { title: 'en cours' },
        upcoming: { title: 'à venir' }
    }

    const { game } = useParams()
    const [params] = useSearchParams()

    const [bets, setBets] = useState([])
    const [counter, setCounter] = useState(0)
    const [favouriteMatches, setFavouriteMatches] = useState({ past: [], running: [], upcoming: [] })
    const [isLoaded, setIsLoaded] = useState(false)
    const [matchBet, setMatchBet] = useState({
        id: null,
        name: null,
        opponents: {}
    })
    const [matches, setMatches] = useState({ past: [], running: [], upcoming: [] })

    const getBets = () => {
        axios.get('http://localhost:3004/bets').then(({ data }) => {
            setBets(data)
        })
    }

    const getData = useCallback(() => {
        let searchParam = params.get('search') !== null ? '?search[name]=' + params.get('search') : ''

        axios
            // Get matches

            .all([
                // Past

                pandascore
                    .get(game + '/matches/past' + searchParam, {
                        params: {
                            perPage: 100
                        }
                    })
                    .then(({ data }) => {
                        setMatches((oldMatches) => {
                            return {
                                ...oldMatches,
                                past: data
                            }
                        })
                    }),

                // Running

                pandascore
                    .get(game + '/matches/running' + searchParam, {
                        params: {
                            perPage: 100
                        }
                    })
                    .then(({ data }) => {
                        setMatches((oldMatches) => {
                            return {
                                ...oldMatches,
                                running: data
                            }
                        })
                    }),

                // Upcoming

                pandascore
                    .get(game + '/matches/upcoming' + searchParam, {
                        params: {
                            perPage: 100
                        }
                    })
                    .then(({ data }) => {
                        setMatches((oldMatches) => {
                            return {
                                ...oldMatches,
                                upcoming: data
                            }
                        })
                    }),

                // Bets

                axios.get('http://localhost:3004/bets').then(({ data }) => {
                    setBets(data)
                })
            ])

            // Get favourites leagues

            .then(() => {
                let leagues = []

                axios.get('http://localhost:3004/favourites?userId=' + localStorage.id).then(({ data }) => {
                    if (data.length !== 0) {
                        Object.values(data).forEach(({ leagueId }) => {
                            leagues.push(leagueId)
                        })

                        axios.all([
                            pandascore
                                .get(game + '/matches/past' + searchParam, {
                                    params: {
                                        'filter[league_id]': leagues.join(),
                                        perPage: 100
                                    }
                                })
                                .then(({ data }) => {
                                    setFavouriteMatches((oldFavouriteMatches) => {
                                        return {
                                            ...oldFavouriteMatches,
                                            past: data
                                        }
                                    })
                                }),
                            pandascore
                                .get(game + '/matches/running' + searchParam, {
                                    params: {
                                        'filter[league_id]': leagues.join(),
                                        perPage: 100
                                    }
                                })
                                .then(({ data }) => {
                                    setFavouriteMatches((oldFavouriteMatches) => {
                                        return {
                                            ...oldFavouriteMatches,
                                            running: data
                                        }
                                    })
                                }),
                            pandascore
                                .get(game + '/matches/upcoming' + searchParam, {
                                    params: {
                                        'filter[league_id]': leagues.join(),
                                        perPage: 100
                                    }
                                })
                                .then(({ data }) => {
                                    setFavouriteMatches((oldFavouriteMatches) => {
                                        return {
                                            ...oldFavouriteMatches,
                                            upcoming: data
                                        }
                                    })
                                })
                        ])
                    }
                })
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [game, params])

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
            setCounter(counter + 1)
        }, 60000)
    }, [counter, getData])

    React.useEffect(() => {
        // Update data when game changes

        if (counter !== 0) {
            setIsLoaded(false)
            getData()
            setCounter(counter + 1)
        }
    }, [game, getData])

    return (
        <>
            <title>Paris e-sportifs | Matchs</title>
            <Style>
                <Header game={games[game]} games={games} title="Matchs" />
                <Legend
                    legend={[
                        { color: '#0d0', label: 'Pari gagné' },
                        { color: '#d00', label: 'Pari perdu' },
                        { color: '#0b5ed7', label: "Match d'une ligue favorie" }
                    ]}
                />
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                <main className="main container">
                    {isLoaded &&
                        Object.entries(matches).map((matchType) => (
                            <section className="matches-container col-12 col-sm-10 col-md-6 col-xl-4" key={matchType[0]}>
                                <h2 className="title">{matchTypes[matchType[0]].title}</h2>
                                <div className="matches">
                                    {Object.entries(favouriteMatches[matchType[0]]).map((match) => (
                                        <Match
                                            bet={
                                                bets.filter(
                                                    ({ matchId, userId }) => matchId === match[1].id && userId === parseInt(localStorage.id)
                                                )[0] !== null
                                                    ? bets.filter(
                                                          ({ matchId, userId }) =>
                                                              matchId === match[1].id && userId === parseInt(localStorage.id)
                                                      )[0]
                                                    : null
                                            }
                                            bets={
                                                bets.filter(({ matchId }) => matchId === match[1].id).length !== 0
                                                    ? bets.filter(({ matchId }) => matchId === match[1].id)
                                                    : []
                                            }
                                            favourite={true}
                                            getBets={getBets}
                                            getUser={getUser}
                                            key={match[1].id}
                                            match={match[1]}
                                            matchType={matchType}
                                            showBet={showBet}
                                            user={user}
                                        />
                                    ))}
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
