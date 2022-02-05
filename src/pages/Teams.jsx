import ListHeader from '../components/ListHeader'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../components/Pandascore'
import React, { useState } from 'react'
import Redirect from '../components/Redirect'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/List'
import Team from '../components/Team'
import TeamInfo from '../components/TeamInfo'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function Teams({ games }) {
    const perPage = 25

    const navigate = useNavigate()

    const { game, page } = useParams()
    const [params] = useSearchParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [pagesNumber, setPagesNumber] = useState(0)
    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState([])

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/teams/' + game + '/' + newPage + (params.get('search') !== null ? '?search=' + params.get('search') : ''))
    }

    const hideTeam = () => {
        setTeam(null)
    }

    const showTeam = (id) => {
        setTeam(teams.filter((team) => team.id === id)[0])
    }

    React.useEffect(() => {
        if (isNaN(page)) {
            navigate('/teams/' + game + '/1')
        } else {
            // Get teams

            pandascore
                .get(game + '/teams' + (params.get('search') !== null ? '?search[name]=' + params.get('search') : ''), {
                    params: { per_page: perPage, page }
                })
                .then((response) => {
                    // Get pages number

                    setPagesNumber(Math.ceil(response.headers['x-total'] / perPage))

                    if (parseInt(page) < 1) {
                        navigate('/teams/' + game + '/1')
                    } else {
                        setTeams(response.data)
                    }
                })
                .finally(() => {
                    // Get matches

                    pandascore.get(game + '/matches/running', { params: { per_page: 100 } }).then(({ data }) => {
                        let newMatches = data

                        teams.forEach(({ id }) => {
                            let match = data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)

                            if (match.length !== 0) {
                                newMatches = {
                                    ...newMatches,
                                    [id]: data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)
                                }
                            }
                        })

                        setMatches(newMatches)
                    })
                    setIsLoaded(true)
                })
        }
    }, [game, navigate, page, pagesNumber, params])

    return (
        <>
            <Redirect />
            <Style>
                <ListHeader game={games[game]} games={games} title="Équipes" />
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="elements">
                                {teams.map(({ acronym, id, image_url, location, name, players }) => (
                                    <Team
                                        key={id}
                                        id={id}
                                        acronym={acronym}
                                        image_url={image_url}
                                        location={location}
                                        match={matches[id] !== undefined ? matches[id] : null}
                                        name={name}
                                        players={players}
                                        showTeam={showTeam}
                                    />
                                ))}
                            </div>
                        </main>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                    </>
                )}
            </Style>
            {team !== null && <TeamInfo hideTeam={hideTeam} team={team} />}
        </>
    )
}
