import PaginationCustom from '../components/Pagination'
import pandascore from '../components/Pandascore'
import React, { useCallback, useState } from 'react'
import Redirect from '../components/Redirect'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/Teams.js'
import Team from '../components/Team'
import TeamInfo from '../components/TeamInfo'
import { useNavigate, useParams } from 'react-router-dom'

export default function Teams() {
    const { page } = useParams()

    const navigate = useNavigate()

    const [counter, setCounter] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState([])
    const [pagesNumber, setPagesNumber] = useState(0)

    const changePage = (page) => {
        navigate('/teams/' + page)
        getTeams()
    }

    const getTeams = useCallback(() => {
        let perPage = 50

        pandascore.get('lol/teams', { params: { per_page: perPage, page } }).then((response) => {
            setCounter((oldCounter) => {
                return oldCounter + 1
            })

            setTeams(response.data)

            // Get pages number

            setPagesNumber(response.headers['x-total'] / perPage)

            // Get matches

            pandascore.get('lol/matches/running', { params: { per_page: 100 } }).then(({ data }) => {
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

            if (counter === 0) {
                setIsLoaded(true)
            }
        })
    }, [counter, page, teams])

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
        // Get data at first load

        if (counter === 0) {
            getTeams()
        }

        // Update data

        setTimeout(() => {
            getTeams()
        }, 60000)
    }, [counter, getTeams])

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
                        <PaginationCustom elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="teams">
                                {teams.map(({ acronym, id, image_url, location, name, players }) => (
                                    <Team
                                        key={id}
                                        acronym={acronym}
                                        image_url={image_url}
                                        match={matches[id] !== undefined ? matches[id] : null}
                                        name={name}
                                        onClick={() => showTeam(location, name, players)}
                                    />
                                ))}
                            </div>
                        </main>
                        <PaginationCustom elementsNumber={pagesNumber} page={page} />
                    </>
                )}
            </Style>
            {team !== null && <TeamInfo changePage={changePage} className="modal" hideTeam={hideTeam} team={team} />}
        </>
    )
}
