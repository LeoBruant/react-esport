import axios from 'axios'
import Character from '../components/Character'
import Header from '../components/Header'
import League from '../components/League'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../js/Pandascore'
import Player from '../components/Player'
import PlayerInfo from '../components/PlayerInfo'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Style } from '../style/List'
import Team from '../components/Team'
import TeamInfo from '../components/TeamInfo'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function List({ games, mobas = null, pageName }) {
    const pageNames = {
        leagues: 'Ligues',
        players: 'Joueurs',
        teams: 'Équipes',
        champions: 'Champions',
        heroes: 'Héros'
    }
    const perPage = 25

    const navigate = useNavigate()

    const { game, page } = useParams()
    const [params] = useSearchParams()

    const [favourites, setFavourites] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [matches, setMatches] = useState({})
    const [pagesNumber, setPagesNumber] = useState(0)
    const [element, setElement] = useState(null)
    const [elements, setElements] = useState([])

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/' + pageName + '/' + game + '/' + newPage + (params.get('search') !== null ? '?search=' + params.get('search') : ''))
    }

    const getFavourites = () => {
        axios.get('http://localhost:3004/favourites?userId=' + localStorage.id).then(({ data }) => {
            setFavourites(data)
        })
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
        } else if (pageName === 'characters' && !mobas.includes(game)) {
            navigate('/matches/' + game)
        } else {
            let characters = ''

            if (pageName === 'characters') {
                if (game === 'dota2') {
                    characters = 'heroes'
                } else if (game === 'lol') {
                    characters = 'champions'
                }
            }

            // Get elements

            pandascore
                .get(game + '/' + (characters !== '' ? characters : pageName) + '/', {
                    params: {
                        per_page: perPage,
                        page,
                        'search[name]': params.get('search') !== null ? params.get('search') : '',
                        sort: 'name'
                    }
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
                    if (pageName === 'leagues') {
                        getFavourites()
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
                                {pageName === 'characters' &&
                                    elements.map(({ id, image_url, localized_name, name }) => (
                                        <Character
                                            key={id}
                                            id={id}
                                            image_url={image_url}
                                            localized_name={localized_name}
                                            name={name}
                                            showCharacter={showElement}
                                        />
                                    ))}
                                {pageName === 'leagues' &&
                                    elements.map(({ id, image_url, name, url }) => (
                                        <League
                                            getFavourites={getFavourites}
                                            key={id}
                                            id={id}
                                            image_url={image_url}
                                            name={name}
                                            url={url}
                                            favourite={
                                                favourites.filter(({ leagueId }) => leagueId === id).length !== 0
                                                    ? favourites.filter(({ leagueId }) => leagueId === id)[0]
                                                    : null
                                            }
                                        />
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
            {element !== null && (
                <>
                    {pageName === 'teams' && <TeamInfo hideTeam={hideElement} team={element} />}
                    {pageName === 'players' && <PlayerInfo hidePlayer={hideElement} player={element} />}
                </>
            )}
        </>
    )
}
