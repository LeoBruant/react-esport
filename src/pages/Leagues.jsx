import PaginationCustom from '../components/Pagination'
import pandascore from '../components/Pandascore'
import React, { useState } from 'react'
import { Style } from '../style/Leagues.js'
import { Spinner } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'
import Redirect from '../components/Redirect'
import { useNavigate, useParams } from 'react-router-dom'

export default function Leagues() {
    let { page } = useParams()

    const navigate = useNavigate()

    const [leagues, setLeagues] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [pagesNumber, setPagesNumber] = useState(0)

    const changePage = (newPage) => {
        navigate('/leagues/' + newPage)
        page = newPage
        setIsLoaded(false)
    }

    React.useEffect(() => {
        let perPage = 10

        pandascore
            .get('lol/leagues', { params: { per_page: perPage, page } })
            .then((response) => {
                setPagesNumber(response.headers['x-total'] / perPage)
                setLeagues(response.data)
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
                    <h1 className="title">Ligues LoL</h1>
                </header>
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <>
                        <PaginationCustom changePage={changePage} elementsNumber={pagesNumber} page={page} />
                        <main className="main container">
                            <div className="leagues">
                                {leagues.map(({ id, image_url, name, url }) => (
                                    <div className="league" key={id}>
                                        <p className="name">{name}</p>
                                        <div className="image-container">
                                            <a href={url} rel="noreferrer" target="_blank">
                                                <img
                                                    className="image"
                                                    src={image_url !== null ? image_url : noImage}
                                                    alt={name + ' image'}
                                                ></img>
                                            </a>
                                        </div>
                                    </div>
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
