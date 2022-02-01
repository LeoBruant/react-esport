import PaginationCustom from '../components/Pagination'
import pandascore from '../components/Pandascore'
import React, { useState } from 'react'
import Redirect from '../components/Redirect'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/List'
import Team from '../components/Team'
import TeamInfo from '../components/TeamInfo'
import { useNavigate, useParams } from 'react-router-dom'

export default function Teams() {
    let { page } = useParams()

    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [pagesNumber, setPagesNumber] = useState(0)
    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState([])

    const changePage = (newPage) => {
        navigate('/teams/' + newPage)
        page = newPage
        setIsLoaded(false)
    }

    const hideTeam = () => {
        setTeam(null)
    }

    const showTeam = (id) => {
        setTeam(teams.filter((team) => team.id === id)[0])
    }

    React.useEffect(() => {
        let perPage = 25

        // Get teams

        pandascore.get('lol/teams', { params: { per_page: perPage, page } }).then((response) => {
            setTeams(response.data)

            // Get pages number

            setPagesNumber(response.headers['x-total'] / perPage)

            // Get matches

            pandascore.get('lol/matches/running', { params: { per_page: 100 } }).then(({ data }) => {
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
    }, [page])

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
