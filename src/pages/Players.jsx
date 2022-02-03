import ListHeader from '../components/ListHeader'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../components/Pandascore'
import Player from '../components/Player'
import PlayerInfo from '../components/PlayerInfo'
import React, { useState } from 'react'
import { Style } from '../style/List'
import { Spinner } from 'react-bootstrap'
import Redirect from '../components/Redirect'
import { useNavigate, useParams } from 'react-router-dom'

export default function Players({ games }) {
    const { game, page } = useParams()

    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [pagesNumber, setPagesNumber] = useState(0)
    const [player, setPlayer] = useState(null)
    const [players, setPlayers] = useState([])

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/players/' + game + '/' + newPage)
    }

    const hidePlayer = () => {
        setPlayer(null)
    }

    const showPlayer = (id) => {
        setPlayer(players.filter((player) => player.id === id)[0])
    }

    React.useEffect(() => {
        let perPage = 25

        pandascore
            .get(game + '/players', { params: { per_page: perPage, page } })
            .then((response) => {
                setPagesNumber(response.headers['x-total'] / perPage)
                setPlayers(response.data)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [game, page])

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
