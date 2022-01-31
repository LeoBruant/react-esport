import React, { useCallback, useState } from 'react'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Teams.js'
import { Pagination, Spinner } from 'react-bootstrap'
import live from '../assets/images/live.png'
import noImage from '../assets/images/no-image.jpg'
import Redirect from '../components/Redirect'
import Team from '../components/Team'
import { useSearchParams } from 'react-router-dom'

export default function Teams() {
    const [counter, setCounter] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [page, setPage] = useState(1)
    const [params, setParams] = useSearchParams()
    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState([])

    const getMatches = useCallback(() => {
        pandascore.get('lol/matches/running?per_page=100').then(({ data }) => {
            teams.forEach(({ id }) => {
                let match = data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)

                if (match.length !== 0) {
                    setMatches((oldMatches) => {
                        return {
                            ...oldMatches,
                            [id]: data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)
                        }
                    })
                }
            })
        })
    }, [teams])

    const getTeams = useCallback(() => {
        pandascore
            .get('lol/teams', { params: { per_page: 100, page } })
            .then(({ data }) => {
                setTeams(data)
            })
            .then(() => {
                getMatches()
            })
            .then(() => {
                if (counter === 0) {
                    setIsLoaded(true)
                }

                setCounter(counter + 1)
            })
    }, [counter, getMatches, page])

    const hideTeam = () => {
        setTeam(null)
    }

    const showTeam = (location, name, players) => {
        setTeam({
            location,
            name,
            players
        })
    }

    React.useEffect(() => {
        setParams({ page: page })

        if (counter === 0) {
            getTeams()
        }

        setTimeout(() => {
            getTeams()
        }, 60000)
    }, [counter, getTeams, page, params])

    return (
        <>
            <Redirect />
            <Style>
                <header className="header">
                    <h1 className="title">Équipes LoL</h1>
                </header>
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <Pagination>
                            {[0, 0, 0].map((array, index) => (
                                <Pagination.Item active={page === index + 1} key={index + 1} onClick={() => setPage(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                        <main className="main container">
                            <div className="teams">
                                {teams.map(({ acronym, id, image_url, location, name, players }) => (
                                    <div className="team" key={id} onClick={() => showTeam(location, name, players)}>
                                        <div className="name-container">
                                            <p className="name">{acronym !== null ? acronym : name}</p>
                                            {matches[id] !== undefined && (
                                                <a href={matches[id].official_stream_url}>
                                                    <img alt="live" className="live" src={live} />
                                                </a>
                                            )}
                                        </div>

                                        <div className="image-container">
                                            <img
                                                className="image"
                                                src={image_url !== null ? image_url : noImage}
                                                alt={name + ' image'}
                                            ></img>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </>
                )}
            </Style>
            {team !== null && <Team className="modal" hideTeam={hideTeam} team={team} />}
        </>
    )
}
