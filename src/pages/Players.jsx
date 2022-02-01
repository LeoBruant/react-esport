import Player from '../components/Player'
import PlayerInfo from '../components/PlayerInfo'
import PaginationCustom from '../components/Pagination'
import pandascore from '../components/Pandascore'
import React, { useState } from 'react'
import { Style } from '../style/List'
import { Spinner } from 'react-bootstrap'
import Redirect from '../components/Redirect'
import { useNavigate, useParams } from 'react-router-dom'

export default function Players() {
    let { page } = useParams()

    const navigate = useNavigate()

    const [player, setPlayer] = useState(null)
    const [players, setPlayers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [pagesNumber, setPagesNumber] = useState(0)

    const changePage = (newPage) => {
        navigate('/players/' + newPage)
        page = newPage
        setIsLoaded(false)
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
            .get('lol/players', { params: { per_page: perPage, page } })
            .then((response) => {
                setPagesNumber(response.headers['x-total'] / perPage)
                setPlayers(response.data)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [page])

    return (
        <>
            <Redirect />
            <Style>
                <header className="header">
                    <h1 className="title">Joueurs LoL</h1>
                </header>
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
