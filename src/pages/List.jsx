import axios from 'axios'
import Header from '../components/Header'
import League from '../components/League'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../components/Pandascore'
import Player from '../components/Player'
import PlayerInfo from '../components/PlayerInfo'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/List'
import Team from '../components/Team'
import TeamInfo from '../components/TeamInfo'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function List({ games, pageName }) {
    const pageNames = {
        leagues: 'Ligues',
        players: 'Joueurs',
        teams: 'Équipes'
    }
    const perPage = 25

    const navigate = useNavigate()

    const { game, page } = useParams()
    const [params] = useSearchParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [pagesNumber, setPagesNumber] = useState(0)
    const [element, setElement] = useState(null)
    const [elements, setElements] = useState([])

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/' + pageName + '/' + game + '/' + newPage + (params.get('search') !== null ? '?search=' + params.get('search') : ''))
    }

    const hideElement = () => {
        setElement(null)
    }

    const showElement = (id) => {
        setElement(elements.filter((element) => element.id === id)[0])
    }

    React.useEffect(() => {
        if (isNaN(page)) {
            navigate('/' + pageName + '/' + game + '/1')
        } else {
            // Get elements

            pandascore
                .get(game + '/' + pageName + '/' + (params.get('search') !== null ? '?search[name]=' + params.get('search') : ''), {
                    params: { per_page: perPage, page }
                })
                .then((response) => {
                    // Get pages number

                    setPagesNumber(Math.ceil(response.headers['x-total'] / perPage))

                    if (parseInt(page) < 1) {
                        navigate('/' + pageName + '/' + game + '/1')
                    } else {
                        setElements(response.data)
                    }
                })
                .then(() => {
                    // Get matches

                    if (pageName === 'teams') {
                        pandascore.get(game + '/matches/running', { params: { per_page: 100 } }).then(({ data }) => {
                            let newMatches = data

                            elements.forEach(({ id }) => {
                                let match = data.filter(
                                    ({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id
                                )

                                if (match.length !== 0) {
                                    newMatches = {
                                        ...newMatches,
                                        [id]: data.filter(
                                            ({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id
                                        )
                                    }
                                }
                            })

                            setMatches(newMatches)
                        })
                        setIsLoaded(true)
                    } else {
                        setIsLoaded(true)
                    }
                })
        }
    }, [game, navigate, page, pageName, pagesNumber, params])

    return (
        <>
            <title>Paris e-sportifs | {pageNames[pageName]}</title>
            <Style>
                <Header game={games[game]} games={games} title={pageNames[pageName]} />
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="elements">
                                {pageName === 'leagues' &&
                                    elements.map(({ id, image_url, name, url }) => (
                                        <League key={id} image_url={image_url} name={name} url={url} />
                                    ))}
                                {pageName === 'players' &&
                                    elements.map(({ id, image_url, name }) => (
                                        <Player key={id} id={id} image_url={image_url} name={name} showPlayer={showElement} />
                                    ))}
                                {pageName === 'teams' &&
                                    elements.map(({ acronym, id, image_url, location, name, players }) => (
                                        <Team
                                            key={id}
                                            id={id}
                                            acronym={acronym}
                                            image_url={image_url}
                                            location={location}
                                            match={matches[id] !== undefined ? matches[id] : null}
                                            name={name}
                                            players={players}
                                            showTeam={showElement}
                                        />
                                    ))}
                            </div>
                        </main>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                    </>
                )}
            </Style>
            {element !== null && pageName === 'teams' && <TeamInfo hideTeam={hideElement} team={element} />}
            {element !== null && pageName === 'players' && <PlayerInfo hidePlayer={hideElement} player={element} />}
        </>
    )
}
