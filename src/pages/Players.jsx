import ListHeader from '../components/ListHeader'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../components/Pandascore'
import Player from '../components/Player'
import PlayerInfo from '../components/PlayerInfo'
import React, { useState } from 'react'
import { Style } from '../style/List'
import { Spinner } from 'react-bootstrap'
import Redirect from '../components/Redirect'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function Players({ games }) {
    const perPage = 25

    const navigate = useNavigate()

    const { game, page } = useParams()
    const [params] = useSearchParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [pagesNumber, setPagesNumber] = useState(0)
    const [player, setPlayer] = useState(null)
    const [players, setPlayers] = useState([])

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/players/' + game + '/' + newPage + (params.get('search') !== null ? '?search=' + params.get('search') : ''))
    }

    const hidePlayer = () => {
        setPlayer(null)
    }

    const showPlayer = (id) => {
        setPlayer(players.filter((player) => player.id === id)[0])
    }

    React.useEffect(() => {
        if (isNaN(page)) {
            navigate('/players/' + game + '/1')
        } else {
            pandascore
                .get(game + '/players' + (params.get('search') !== null ? '?search[name]=' + params.get('search') : ''), {
                    params: { per_page: perPage, page }
                })
                .then((response) => {
                    setPagesNumber(Math.ceil(response.headers['x-total'] / perPage))

                    if (parseInt(page) < 1) {
                        navigate('/players/' + game + '/1')
                    } else {
                        setPlayers(response.data)
                    }
                })
                .then(() => {
                    setIsLoaded(true)
                })
        }
    }, [game, navigate, page, pagesNumber, params])

    return (
        <>
            <Redirect />
            <Style>
                <ListHeader game={games[game]} games={games} title="Joueurs" />
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="elements">
                                {players.map(({ id, image_url, name }) => (
                                    <Player key={id} id={id} image_url={image_url} name={name} showPlayer={showPlayer} />
                                ))}
                            </div>
                        </main>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                    </>
                )}
            </Style>
            {player !== null && <PlayerInfo hidePlayer={hidePlayer} player={player} />}
        </>
    )
}
