import League from '../components/League'
import ListHeader from '../components/ListHeader'
import PaginationCustom from '../components/PaginationCustom'
import pandascore from '../components/Pandascore'
import React, { useState } from 'react'
import { Style } from '../style/List'
import { Spinner } from 'react-bootstrap'
import Redirect from '../components/Redirect'
import { useNavigate, useParams } from 'react-router-dom'

export default function Leagues({ games }) {
    const perPage = 25

    const { game, page } = useParams()

    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)
    const [leagues, setLeagues] = useState([])
    const [pagesNumber, setPagesNumber] = useState(0)

    const changePage = (newPage) => {
        setIsLoaded(false)
        navigate('/leagues/' + game + '/' + newPage)
    }

    React.useEffect(() => {
        if (isNaN(page)) {
            navigate('/leagues/' + game + '/1')
        } else {
            pandascore
                .get(game + '/leagues', { params: { per_page: perPage, page } })
                .then((response) => {
                    if (response.data.length === 0) {
                        navigate('/leagues/' + game + '/1')
                    } else {
                        setPagesNumber(response.headers['x-total'] / perPage)
                        setLeagues(response.data)
                    }
                })
                .then(() => {
                    setIsLoaded(true)
                })
        }
    }, [game, page])

    return (
        <>
            <Redirect />
            <Style>
                <ListHeader game={games[game]} games={games} title="Ligues" />
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="elements">
                                {leagues.map(({ id, image_url, name, url }) => (
                                    <League key={id} image_url={image_url} name={name} url={url} />
                                ))}
                            </div>
                        </main>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                    </>
                )}
            </Style>
        </>
    )
}
